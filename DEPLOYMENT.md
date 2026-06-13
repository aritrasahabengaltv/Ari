# 📸 Photo Vault - Complete Deployment Instructions

## Quick Start (10 minutes)

### Step 1: Set up MongoDB (Free)
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (M0 free tier)
4. Get connection string: Database → Connect → Drivers
5. Copy the connection string (we'll need it)

### Step 2: Deploy Backend to Vercel

**Using Vercel Dashboard:**
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Select this forked repo
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
5. Add Environment Variables:
   - **Name**: `MONGODB_URI`
   - **Value**: Paste your MongoDB connection string
6. Click "Deploy"
7. **Copy your Vercel URL** (e.g., https://photo-vault-api.vercel.app)

**Using Vercel CLI:**
```bash
npm i -g vercel
vercel
# Follow prompts, add environment variable when asked
```

### Step 3: Update Frontend API URL

1. Edit `index.html` in your repo
2. Find line with `const API_URL = ...`
3. Replace with your Vercel URL:
```javascript
const API_URL = "https://your-vercel-url.vercel.app";
```
4. Git commit and push

### Step 4: Enable GitHub Pages

1. Go to repo Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Wait 2 minutes
5. Your site: https://aritrasahabengaltv.github.io/Ari/

## ✅ Testing

1. Open your GitHub Pages URL
2. Enter password: `6905`
3. Try uploading a photo
4. Search for it
5. Check if it appears in gallery

## 📊 Architecture

```
┌─────────────────────────────────────────────────────┐
│         Frontend (GitHub Pages)                     │
│  index.html + CSS + JavaScript (Client-side)        │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTP Requests
                  ↓
┌─────────────────────────────────────────────────────┐
│         Backend (Vercel)                            │
│  Node.js + Express + CORS                           │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ MongoDB Queries
                  ↓
┌─────────────────────────────────────────────────────┐
│         Database (MongoDB Atlas)                    │
│  1GB Cloud Storage + Photos Collection              │
└─────────────────────────────────────────────────────┘
```

## 💾 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/photos?category=X` | Get all photos in category |
| GET | `/api/photos/search?category=X&headline=Y` | Search by headline |
| POST | `/api/photos` | Upload photo |
| DELETE | `/api/photos/:id` | Delete photo |
| GET | `/api/storage` | Get storage stats |
| GET | `/health` | Health check |

## 🔑 Environment Variables

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/photovault
PORT=3000
NODE_ENV=production
```

## 💰 Free Tier Costs

- **MongoDB Atlas**: Free (500MB, upgradeable)
- **Vercel**: Free (Hobby plan)
- **GitHub Pages**: Free
- **Total**: $0/month 🎉

## 🐛 Troubleshooting

**"Cannot reach API"**
- Verify API_URL in index.html
- Check Vercel deployment status
- Confirm MONGODB_URI is set

**"MongoDB connection failed"**
- Check connection string
- Verify IP whitelist in MongoDB Atlas (set to 0.0.0.0/0 for any)
- Ensure cluster is running

**"Storage limit exceeded"**
- Delete old photos
- Storage is shared across all users

**Upload fails**
- Check image size (recommend <5MB)
- Verify backend is running
- Check browser console for errors

## 📚 Local Development

```bash
# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb+srv://..." > .env

# Start server
npm start
# Or with auto-reload:
npm run dev
```

Server runs on http://localhost:3000

## 🚀 Next Steps

1. Customize password (change in index.html)
2. Add user authentication
3. Implement image compression
4. Add multiple storage tiers
5. Create admin dashboard

---

**Status**: ✅ Ready to deploy!
