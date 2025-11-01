# Admin Dashboard Setup Instructions

## Admin Credentials
- **Email**: devanurag96@gmail.com
- **Password**: @admin1414

## Setup Steps

### 1. Create Admin Account
First, you need to sign up with the admin credentials:

1. Go to `/admin/login` in your browser
2. Since there's no account yet, you'll need to create one first
3. For now, manually sign up using authentication by visiting the site and using the developer tools console:

```javascript
// Run this in browser console to create the admin account
const { supabase } = await import('./src/integrations/supabase/client.ts');

const { data, error } = await supabase.auth.signUp({
  email: 'devanurag96@gmail.com',
  password: '@admin1414',
});

console.log('User created:', data);
```

### 2. Assign Admin Role

After the user is created, you need to assign the admin role in the database.

**Option 1: Using Cloud Backend UI**
1. Open your Lovable Cloud backend
2. Go to the `user_roles` table
3. Add a new row with:
   - `user_id`: [The UUID of the user you just created - you can find this in the browser console from step 1, or in the auth.users table]
   - `role`: admin

**Option 2: Using SQL Query**

If you have access to run SQL queries, you can use this query (replace YOUR_USER_ID with the actual user ID):

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');
```

To find your user ID, run:
```sql
SELECT id, email FROM auth.users WHERE email = 'devanurag96@gmail.com';
```

### 3. Login to Dashboard

Once the admin role is assigned:
1. Go to `/admin/login`
2. Login with:
   - Email: devanurag96@gmail.com
   - Password: @admin1414
3. You'll be redirected to `/admin/dashboard`

## Dashboard Features

The admin dashboard allows you to:
- View all student submissions
- View all brand submissions
- See submission statistics
- Access submission details including contact information

## Security Notes

- The admin credentials are currently static but secured with proper Row Level Security (RLS) policies
- Only users with the 'admin' role in the user_roles table can access submissions
- Authentication is required and verified on every request
- Sessions are managed securely by Supabase Auth
