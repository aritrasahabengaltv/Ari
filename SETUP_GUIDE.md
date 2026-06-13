# Photo Vault - Complete Setup Guide

## ⚡ Automated Setup Instructions

### Step 1: Create MongoDB Atlas Account & Cluster

**Important:** You need to do this ONE TIME setup manually (takes 5 minutes):

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (use your email)
3. **Create Organization** (any name, e.g., "Photo Vault")
4. **Create Project** (any name)
5. **Build a Database**:
   - Select "Shared" (Free M0)
   - Cloud Provider: AWS
   - Region: Any (close to you)
   - Cluster Name: "photo-vault"
   - Click "Create"

6. **Set Up Security**:
   - Click "Create a Database User"
   - Username: `photovault`
   - Password: `bittu000@#`
   - Click "Create User"

7. **Add IP to Whitelist**:
   - Click "Add My Current IP Address" OR
   - Click "Allow access from anywhere" (0.0.0.0/0)
   - Click "Add Entry"

8. **Get Connection String**:
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` with `photovault`
   - Replace `<password>` with `bittu000@#`
   - Replace `<database>` with `photovault`
   
   Should look like:
   ```
   mongodb+srv://photovault:bittu000@#@cluster0.xxxxx.mongodb.net/photovault?retryWrites=true&w=majority
   ```

9. **Copy this string** - you'll need it in next step

### Step 2: Deploy Backend to Vercel

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in with GitHub**
3. **Select Repository**: Choose `aritrasahabengaltv/Ari`
4. **Configure Project**:
   - Framework Preset: `Other`
   - Root Directory: `./`
5. **Add Environment Variables**:
   - Click "Add Environment Variable"
   - **Name**: `MONGODB_URI`
   - **Value**: Paste your MongoDB connection string from Step 1
   - Click "Save"
6. **Click "Deploy"**
7. **Wait for deployment** (2-3 minutes)
8. **Copy your Vercel URL** from the deployment screen
   - Should look like: `https://ari-xxxxx.vercel.app`

### Step 3: Update Frontend API URL

1. **Go to your GitHub repo**: https://github.com/aritrasahabengaltv/Ari
2. **Edit `index.html`**:
   - Click the pencil icon (Edit)
   - Find line: `const API_URL = "https://photo-vault-api.vercel.app";`
   - Replace with your Vercel URL from Step 2
   - Example: `const API_URL = "https://ari-xxxxx.vercel.app";`
3. **Click "Commit changes"**

### Step 4: Enable GitHub Pages

1. **Go to repo Settings** → **Pages**
2. **Source**: Select `Deploy from a branch`
3. **Branch**: Select `main`
4. **Click Save**
5. **Wait 2-3 minutes** for deployment
6. **Your site URL**: `https://aritrasahabengaltv.github.io/Ari/`

### Step 5: Test Everything

1. **Open**: https://aritrasahabengaltv.github.io/Ari/
2. **Enter password**: `6905`
3. **Try uploading a photo**:
   - Enter headline: "Test Photo"
   - Select any image
   - Click "Upload"
4. **Search for it** - should appear!
5. **Check storage** - should show usage

---

## ✅ You're Done!

Your Photo Vault is now LIVE! 🎉

- **Website**: https://aritrasahabengaltv.github.io/Ari/
- **Backend API**: Your Vercel URL
- **Database**: MongoDB Atlas (1GB)
- **Cost**: $0/month

---

## 🔐 Important Credentials

Keep these safe!

```
MongoDB:
  Username: photovault
  Password: bittu000@#
  Database: photovault
  
Website Password: 6905

Vercel: Connected to GitHub (auto-deploys on push)
```

---

## 🆘 Troubleshooting

### "Cannot connect to API"
- ✅ Verify MONGODB_URI in Vercel settings
- ✅ Check MongoDB cluster is running (green status)
- ✅ Confirm API_URL in index.html matches your Vercel URL

### "MongoDB connection failed"
- ✅ Check username/password (photovault / bittu000@#)
- ✅ Verify IP whitelist (set to 0.0.0.0/0)
- ✅ Check cluster is running

### "Upload fails"
- ✅ Check browser console (F12)
- ✅ Verify image size (max 5MB recommended)
- ✅ Ensure backend is deployed on Vercel

### "Storage limit exceeded"
- ✅ Delete old photos
- ✅ Storage is shared (1GB total)

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com/
- **GitHub Pages**: https://docs.github.com/en/pages

---

**That's it! Your Photo Vault is ready to use!** 🚀
