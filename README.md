# 📸 Photo Vault - Cloud Edition

> A cloud-based photo storage website for managing expenses, income, and letters with **1GB shared storage** accessible to everyone!

## 🌟 Features

✅ **Cloud Storage**
- 1GB shared storage for all users
- Anyone can view all photos
- No local browser limitations
- Global access from anywhere

✅ **Three Categories**
- 💰 Expenses - Track receipts & invoices
- 📈 Income - Store income documents
- ✉️ Letters - Archive correspondence

✅ **Smart Features**
- 🔐 Password-protected uploads (password: `6905`)
- 🔍 Search by headline
- 🗑️ Delete functionality
- 📊 Real-time storage tracking
- 🎨 Beautiful gallery view
- 📱 Mobile responsive

## 🚀 Quick Deploy

### Requirements
- MongoDB Atlas account (free)
- Vercel account (free)
- GitHub account (free)

### Deploy in 5 Steps

1. **Create MongoDB Database**
   - Visit mongodb.com/cloud/atlas
   - Create free cluster
   - Copy connection string

2. **Deploy Backend to Vercel**
   - Go to vercel.com
   - Import this GitHub repo
   - Add `MONGODB_URI` environment variable
   - Deploy!

3. **Update Frontend API URL**
   - Edit `index.html`
   - Change `API_URL` to your Vercel URL
   - Commit & push

4. **Enable GitHub Pages**
   - Repo Settings → Pages
   - Select main branch
   - Deploy!

5. **Done!** 🎉
   - Your site is live
   - Everyone can access it
   - Share the link!

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

## 📁 Project Structure

```
Ari/
├── index.html          # Frontend (client-side app)
├── server.js           # Backend API (Node.js)
├── package.json        # Dependencies
├── vercel.json         # Vercel config
├── .env.example        # Environment variables
├── .gitignore          # Git ignore
├── README.md           # This file
└── DEPLOYMENT.md       # Deployment guide
```

## 🌐 Architecture

```
Frontend (GitHub Pages)
    ↓ HTTP
Backend API (Vercel)
    ↓ Queries
MongoDB Atlas (Cloud DB)
    ↓ Storage
1GB Cloud Storage
```

## 💻 API Endpoints

```bash
# Get all photos
GET /api/photos?category=expenses

# Search photos
GET /api/photos/search?category=expenses&headline=office

# Upload photo
POST /api/photos
{
  "category": "expenses",
  "headline": "Office Supplies",
  "imageData": "data:image/png;base64,..."
}

# Delete photo
DELETE /api/photos/photo-id

# Get storage usage
GET /api/storage

# Health check
GET /health
```

## 📊 Storage

- **Total**: 1GB
- **Shared**: All users share same 1GB
- **Limit**: Enforced per upload
- **Database**: MongoDB Atlas

## 🔒 Security

- ✅ Password-protected uploads
- ✅ Session-based authentication
- ✅ CORS enabled for browser access
- ✅ Input validation
- ✅ File size checks

## 🖥️ Tech Stack

**Frontend**
- HTML5
- CSS3 (gradient backgrounds, animations)
- Vanilla JavaScript (no frameworks)
- Responsive mobile design

**Backend**
- Node.js
- Express.js
- MongoDB
- CORS

**Deployment**
- GitHub Pages (frontend)
- Vercel (backend)
- MongoDB Atlas (database)

## 📱 Browser Support

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Tablets

## 🎯 Usage

1. Open your Photo Vault URL
2. Enter password: `6905`
3. Navigate to desired category
4. Upload photos with headlines
5. Search for photos
6. Share with others!

## 🔧 Customization

**Change Password**
- Edit `index.html`
- Find `const CORRECT_PASSWORD = "6905"`
- Change to your desired password

**Change Storage Limit**
- Edit `server.js`
- Find `const STORAGE_LIMIT = 1024 * 1024 * 1024`
- Adjust size in bytes

**Customize Styling**
- Edit CSS in `index.html`
- Modify colors, fonts, layout

## 📈 Pricing

| Service | Free Tier | Cost |
|---------|-----------|------|
| MongoDB Atlas | 500MB | $0/month |
| Vercel | Hobby | $0/month |
| GitHub Pages | Unlimited | $0/month |
| **Total** | | **$0/month** |

## 🐛 Known Limitations

- Image upload size: Recommended max 5MB
- Storage limit: 1GB shared
- No user accounts (session-based)
- No image editing
- Simple search (headline only)

## 🚀 Future Enhancements

- [ ] User authentication & profiles
- [ ] Image compression
- [ ] Advanced search (dates, tags)
- [ ] Bulk upload
- [ ] Admin dashboard
- [ ] Backup/export
- [ ] Multiple storage tiers
- [ ] API rate limiting

## 📞 Support

**Deployment Issues?**
- Check [DEPLOYMENT.md](DEPLOYMENT.md)
- Review Vercel logs
- Check MongoDB Atlas connection

**API Issues?**
- Check browser console
- Verify CORS settings
- Test health endpoint

## 📄 License

Free to use and modify!

---

**Made with ❤️ for cloud photo storage**

[View on GitHub](https://github.com/aritrasahabengaltv/Ari) | [Deploy Now](https://vercel.com/new)
