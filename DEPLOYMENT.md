# 🚀 ChainWatch Mini-App - Deployment Checklist

## ✅ Phase 1: Local Setup (5 minutes)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get Coinbase API Key**
   - Visit: https://portal.cdp.coinbase.com/
   - Create project → Get API key
   
3. **Create `.env.local`**
   ```bash
   cp .env.local.example .env.local
   # Add your API key
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## ✅ Phase 2: Deploy Frontend (10 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "ChainWatch mini-app v0.1"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Add environment variables:
     * `NEXT_PUBLIC_ONCHAINKIT_API_KEY` = your_key
   - Click "Deploy"
   - Wait 2-3 minutes ⏳
   
3. **Note your URL**
   ```
   https://chainwatch-miniapp.vercel.app
   ```

## ✅ Phase 3: Generate Manifest (5 minutes)

1. **Run manifest generator**
   ```bash
   npx create-onchain --manifest
   ```
   
2. **Connect Farcaster wallet**
   - Import your Farcaster recovery phrase
   - Or create new Farcaster account
   
3. **Sign manifest**
   - Enter your Vercel URL
   - Sign with your wallet
   - Copy generated fields

4. **Update manifest file**
   Edit `public/.well-known/farcaster.json`:
   - Paste `accountAssociation` data
   - Replace all `YOUR_DOMAIN` with Vercel URL
   - Update `iconUrl`, `heroImageUrl`, etc.

5. **Redeploy**
   ```bash
   git add public/.well-known/farcaster.json
   git commit -m "Add Farcaster manifest"
   git push
   ```

## ✅ Phase 4: Backend Integration (Later)

**Option A: Deploy Python Backend on Railway**
1. Create Railway account
2. Deploy your ChainWatch backend
3. Get Railway URL
4. Update `CHAINWATCH_BACKEND_URL` in Vercel

**Option B: Use Replit (Quick)**
1. Upload ChainWatch backend to Replit
2. Run FastAPI server
3. Get Replit URL
4. Update mini-app APIs

## ✅ Phase 5: Go Live (2 minutes)

1. **Verify mini-app works**
   - Visit your Vercel URL
   - Connect wallet
   - Try adding a wallet (will use mock data for now)

2. **Post to Base App**
   - Open Base App
   - Create new post
   - Paste your mini-app URL
   - Add description
   - Post! 🎉

3. **Share on Farcaster**
   - Post on Warpcast
   - Tag @base
   - Use hashtags: #BaseBuilders #MiniApps

## 📊 Success Metrics

Track these:
- Wallet connections
- Wallets added
- Daily active users
- Alert views

## 🔥 Quick Wins

**Week 1 Goals:**
- [ ] 10 wallet connections
- [ ] 25 tracked wallets
- [ ] Deploy backend integration
- [ ] Add real-time WebSocket

**Week 2 Goals:**
- [ ] 50+ users
- [ ] Real ChainWatch data flowing
- [ ] Screenshot for manifest
- [ ] Post in Base Discord

## 🎯 Builder Grant Application

**After you hit traction:**
1. Document usage stats
2. Show unique value prop
3. Tweet about your mini-app
4. Base team will scout you

**No formal application needed** - they find you if you build cool stuff!

## 🐛 Common Issues

**Issue**: Wallet won't connect
**Fix**: Check API key in Vercel env vars

**Issue**: 404 on manifest
**Fix**: Ensure `public/.well-known/farcaster.json` is deployed

**Issue**: APIs return errors
**Fix**: Check CORS in your backend

## 📞 Next Steps After Deployment

1. Join Base Discord: https://discord.gg/buildonbase
2. Follow @base on Farcaster
3. DM Jessi for feedback (if needed)
4. Keep shipping! 🚀

---

**Remember Jessi's advice**: "validate with real users fast"

Ship → Test → Iterate → Win
