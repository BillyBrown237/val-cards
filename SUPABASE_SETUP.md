# 🗄️ Supabase Setup Guide - Step by Step

This guide will walk you through setting up Supabase for your Valentine Card app in **under 10 minutes**.

---

## 📋 What You'll Set Up

1. ✅ Create a Supabase project
2. ✅ Get your API keys
3. ✅ Create the database table
4. ✅ Create the storage bucket for images
5. ✅ Set up access policies

---

## Step 1: Create Your Supabase Project (3 minutes)

### 1.1 Go to Supabase
- Visit: [https://supabase.com](https://supabase.com)
- Click **"Start your project"**
- Sign in with **GitHub** (easiest)

### 1.2 Create New Project
- Click **"New project"** (green button)
- You'll see a form with these fields:

**Fill in:**
```
Organization: Choose or create one (e.g., "My Projects")
Name: valentine-app
Database Password: Click "Generate a password" ← SAVE THIS! // JKNsLDA8AkBg7V2e
Region: Choose closest to your location
Pricing Plan: Free (perfect for getting started)
```

### 1.3 Wait for Setup
- Click **"Create new project"**
- You'll see a progress screen
- Takes about **2-3 minutes** to set up
- ☕ Grab a coffee!

---

## Step 2: Get Your API Keys (2 minutes)

### 2.1 Navigate to Settings
Once your project is ready:
1. Look at the left sidebar
2. Click the **⚙️ Settings** icon at the bottom
3. Click **"API"** in the settings menu

### 2.2 Copy Your Keys
You'll see three important values on this page:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
Example: `https://abcdefghijklmnop.supabase.co`

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... (very long)
```

**service_role key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... (very long)
```
⚠️ **Keep this one secret!** Never commit to Git.

### 2.3 Add to Your Project
Open your project's `.env.local` file and paste:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhY...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhY...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 3: Create the Database Table (2 minutes)

### 3.1 Open SQL Editor
1. In the left sidebar, click **"SQL Editor"** (looks like `</>`)
2. Click **"+ New query"** button at the top

### 3.2 Run the Setup Script
1. Open the file `supabase-setup.sql` in your project
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press `Cmd/Ctrl + Enter`)

### 3.3 Verify Success
You should see:
```
Success. No rows returned
```

### 3.4 Check Your Table
1. Click **"Table Editor"** in the left sidebar
2. You should see a table called **`valentines`**
3. Click it to see the columns

**Your table should have these columns:**
- `id` (text)
- `recipient_name` (text)
- `sender_name` (text)
- `proposal_text` (text)
- `love_letter` (text)
- `photo1_url` (text)
- `photo1_caption` (text)
- `photo2_url` (text)
- `photo2_caption` (text)
- `flower_msg_1` (text)
- `flower_msg_2` (text)
- `flower_msg_3` (text)
- `flower_msg_4` (text)
- `stamp_type` (text)
- `created_at` (timestamp)
- `view_count` (int4)

---

## Step 4: Create Storage Bucket (2 minutes)

### 4.1 Open Storage
1. In the left sidebar, click **"Storage"** (looks like a folder icon)
2. Click **"Create a new bucket"** or **"New bucket"**

### 4.2 Configure Bucket
Fill in these settings:

```
Name: valentine-images
Public bucket: ✅ YES (toggle this ON!)
File size limit: 5 MB
Allowed MIME types: (leave empty - allows all image types)
```

**Important:** Make sure "Public bucket" is **turned ON** (green toggle)!

### 4.3 Create It
- Click **"Create bucket"**
- You should now see `valentine-images` in the list

---

## Step 5: Set Up Storage Policies (2 minutes)

### 5.1 Open Bucket Policies
1. Click on the **`valentine-images`** bucket you just created
2. Click the **"Policies"** tab at the top
3. You'll see "No policies created yet"

### 5.2 Create Upload Policy
1. Click **"New policy"**
2. Click **"For full customization"** (second option)
3. Fill in:

```
Policy name: Allow public uploads
Target roles: ✅ public (check this)

Operations:
✅ SELECT
✅ INSERT

Policy definition - WITH CHECK:
true

Policy definition - USING:
true
```

4. Click **"Review"**
5. Click **"Save policy"**

### 5.3 Verify
- You should now see 1 policy in the list
- Status should be **Enabled**

---

## ✅ Verification Checklist

Before moving on, verify everything:

### Database ✅
- [ ] Table `valentines` exists
- [ ] Table has 16 columns
- [ ] You can see it in Table Editor

### Storage ✅
- [ ] Bucket `valentine-images` exists
- [ ] Bucket is **public** (important!)
- [ ] Policy is created and enabled

### API Keys ✅
- [ ] `.env.local` file has all 4 variables
- [ ] NEXT_PUBLIC_SUPABASE_URL matches your project
- [ ] Keys are copied correctly (no extra spaces)

---

## 🧪 Test Your Setup

### Test 1: Database Connection
```bash
# In your terminal
npm run dev
```

Open `http://localhost:3000` in your browser. If you see the form, database connection works! ✅

### Test 2: Create a Valentine
1. Fill out the form
2. Upload a photo (optional)
3. Click "Generate Website"
4. You should get a link!

### Test 3: Check Supabase
Go to **Table Editor** > `valentines`
- You should see your test entry
- All fields should have data

Go to **Storage** > `valentine-images`
- If you uploaded photos, you should see a folder with your valentine ID
- Inside that folder, your images

---

## 🐛 Common Issues & Fixes

### Issue 1: "Failed to create valentine"
**Cause:** API keys not set correctly

**Fix:**
1. Check `.env.local` has all keys
2. Restart your dev server (`Ctrl+C`, then `npm run dev`)
3. Make sure there are no extra spaces in the keys

### Issue 2: "Photo upload failed"
**Cause:** Storage bucket not public

**Fix:**
1. Go to Storage > `valentine-images`
2. Click the **⚙️** settings icon
3. Make sure **"Public bucket"** is toggled ON
4. Click "Save"

### Issue 3: "Valentine not found" when viewing
**Cause:** RLS policies not set up

**Fix:**
1. Run the SQL script again
2. Check Table Editor > `valentines` > Policies
3. Should see 3 policies (read, insert, update)

### Issue 4: "Cannot connect to Supabase"
**Cause:** Project is paused or keys are wrong

**Fix:**
1. Check your Supabase dashboard - project should be **Active** (green)
2. If paused, click "Restore" or "Unpause"
3. Verify URL in `.env.local` matches the one in Supabase Settings > API

---

## 🚀 Next Steps

Now that Supabase is set up:

1. ✅ Create your first valentine
2. ✅ Test that images upload
3. ✅ Verify you can view the valentine
4. 🎨 Build the interactive screens (we'll do this next!)

---

## 📊 Monitoring Your Usage (Free Tier)

### Check Your Limits
1. Go to Supabase Dashboard
2. Click **"Settings"** > **"Billing"**
3. You'll see:
    - Database size: 500 MB
    - Storage: 1 GB
    - Bandwidth: 2 GB/month

### What This Means
With the free tier, you can store:
- **~500,000 text valentines** (database)
- **~1,000 full valentines with photos** (storage)
- **~1,000 page views/month** (bandwidth)

More than enough to get started! 🎉

---

## 🎯 Quick Reference

### Supabase URLs
- Dashboard: `https://supabase.com/dashboard`
- Your project: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`

### Important Locations
- API Keys: Settings > API
- SQL Editor: SQL Editor (sidebar)
- Table Editor: Table Editor (sidebar)
- Storage: Storage (sidebar)

### Common Commands
```bash
# Start dev server
npm run dev

# View at
http://localhost:3000

# Check .env.local
cat .env.local
```

---

**Setup complete! 🎉 Ready to build the interactive screens? Let me know!**