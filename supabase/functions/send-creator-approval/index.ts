import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ApprovalRequest {
  applicationId: string;
  email: string;
  name: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId, email, name }: ApprovalRequest = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update application status
    const { error: updateError } = await supabase
      .from('student_submissions')
      .update({ 
        status: 'approved',
        approved_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    if (updateError) throw updateError;

    // Send email using Hostinger SMTP
    const smtpHost = Deno.env.get('HOSTINGER_SMTP_HOST');
    const smtpPort = Deno.env.get('HOSTINGER_SMTP_PORT');
    const smtpUser = Deno.env.get('HOSTINGER_SMTP_USER');
    const smtpPassword = Deno.env.get('HOSTINGER_SMTP_PASSWORD');

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      throw new Error('SMTP configuration missing');
    }

    const signupUrl = `${req.headers.get('origin') || 'https://yourdomain.com'}/auth?email=${encodeURIComponent(email)}`;

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to Our Creator Network!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Great news! Your application has been <strong>approved</strong>! We've reviewed your Instagram profile and we're excited to have you join our network of nano-influencers.</p>
      <p>You can now create your account and start earning money from your following:</p>
      <p style="text-align: center;">
        <a href="${signupUrl}" class="button">Create Your Account</a>
      </p>
      <p>Once you sign up, you'll be able to:</p>
      <ul>
        <li>Browse and join squads in your niche</li>
        <li>Apply to brand campaigns</li>
        <li>Track your earnings</li>
        <li>Connect with other creators</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Welcome aboard!</p>
      <p><strong>The Team</strong></p>
    </div>
    <div class="footer">
      <p>This email was sent because you applied to join our creator network.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email via SMTP
    const { SMTPClient } = await import("https://deno.land/x/denomailer@1.6.0/mod.ts");
    
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: parseInt(smtpPort),
        tls: parseInt(smtpPort) === 465,
        auth: {
          username: smtpUser,
          password: smtpPassword,
        },
      },
    });

    await client.send({
      from: smtpUser,
      to: email,
      subject: "🎉 Your Creator Application is Approved!",
      content: emailContent,
      html: emailContent,
    });

    await client.close();

    console.log(`Approval email sent to ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Approval email sent' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-creator-approval:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
