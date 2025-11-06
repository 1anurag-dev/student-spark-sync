import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CommunityInviteRequest {
  communityName: string;
  creatorName: string;
  creatorEmail: string;
  joinLink: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { communityName, creatorName, creatorEmail, joinLink }: CommunityInviteRequest = await req.json();

    console.log('Sending community invite email to:', creatorEmail);

    // Create SMTP client with Hostinger
    const client = new SMTPClient({
      connection: {
        hostname: Deno.env.get('HOSTINGER_SMTP_HOST') || '',
        port: parseInt(Deno.env.get('HOSTINGER_SMTP_PORT') || '465'),
        tls: true,
        auth: {
          username: Deno.env.get('HOSTINGER_SMTP_USER') || '',
          password: Deno.env.get('HOSTINGER_SMTP_PASSWORD') || '',
        },
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Welcome to Your Community!</h1>
          </div>
          <div class="content">
            <p>Hi ${creatorName},</p>
            <p>Congratulations! Your community "<strong>${communityName}</strong>" has been successfully created on the Nano Community platform, powered by boringscool and lovable.</p>
            <p>You can now join your community and start sharing your thoughts and content:</p>
            <div style="text-align: center;">
              <a href="${joinLink}" class="button">Join Your Community</a>
            </div>
            <p>Share this link with others to grow your community:</p>
            <div style="background: #e5e7eb; padding: 15px; border-radius: 5px; word-break: break-all;">
              ${joinLink}
            </div>
            <p>Get ready to connect with like-minded creators and share amazing content!</p>
          </div>
          <div class="footer">
            <p>Powered by boringscool & lovable</p>
            <p>Nano Community - Where Creators Connect</p>
          </div>
        </body>
      </html>
    `;

    await client.send({
      from: `"Nano Community" <${Deno.env.get('HOSTINGER_SMTP_USER')}>`,
      to: creatorEmail,
      subject: `Welcome to ${communityName} - Nano Community`,
      content: emailHtml,
      html: emailHtml,
    });

    await client.close();

    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Invite email sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
