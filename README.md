# ChainWatch Mini-App

Real-time wallet tracking mini-app for Base ecosystem. Built with Next.js, OnchainKit, and MiniKit.

## 🚀 Features

- ✅ **Wallet Connection**: Coinbase Smart Wallet integration
- ✅ **Track Wallets**: Add Base/Ethereum addresses to monitor
- ✅ **Real-time Alerts**: Live BUY/SELL notifications
- ✅ **Clean UI**: Minimal, fast, no bloat
- ✅ **Base Native**: Optimized for Base App

## 📋 Prerequisites

- Node.js 18+ and npm
- Coinbase Developer Platform API key
- Your ChainWatch backend running

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_here
CHAINWATCH_BACKEND_URL=http://localhost:8000
```

**Get API Key**: https://portal.cdp.coinbase.com/

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 🔗 Connect to Your ChainWatch Backend

The mini-app currently uses mock data. To connect your real ChainWatch backend:

### Update API Routes

**File: `app/api/wallets/route.ts`**

Replace the TODO comments:

```typescript
// Add wallet
const response = await fetch(`${process.env.CHAINWATCH_BACKEND_URL}/api/add_wallet`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: userAddress,
    address: walletAddress,
    label: label
  })
});
```

**File: `app/api/alerts/route.ts`**

```typescript
// Fetch alerts
const response = await fetch(
  `${process.env.CHAINWATCH_BACKEND_URL}/api/alerts?user_id=${userAddress}`
);
const data = await response.json();
return NextResponse.json({ alerts: data.alerts });
```

### Create ChainWatch Backend Endpoints

Add these to your Python backend:

```python
# ~/ChainWatch/miniapp/backend/api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

@app.post("/api/add_wallet")
async def add_wallet(data: dict):
    user_id = data['user_id']
    address = data['address']
    label = data.get('label', '')
    # Add to your wallet_db
    return {"success": True}

@app.get("/api/alerts")
async def get_alerts(user_id: str):
    # Fetch from your DB/logs
    alerts = []  # Your alert data
    return {"alerts": alerts}
```

## 📦 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
   - `CHAINWATCH_BACKEND_URL`
4. Deploy!

### 3. Generate Farcaster Manifest

After deployment:

```bash
npx create-onchain --manifest
```

This will:
- Connect your Farcaster account
- Generate `accountAssociation` fields
- Update `public/.well-known/farcaster.json`

### 4. Update Manifest

Edit `public/.well-known/farcaster.json`:
- Replace `YOUR_DOMAIN` with your Vercel URL
- Add proper icon/screenshot URLs
- Verify all fields

### 5. Post to Base App

Create a post in Base App with your mini-app URL. That's it - you're live!

## 🎨 Customization

### Add Real-time WebSocket

For live alerts without polling:

```typescript
// In AlertFeed component
useEffect(() => {
  const ws = new WebSocket('wss://YOUR_BACKEND/ws');
  
  ws.onmessage = (event) => {
    const alert = JSON.parse(event.data);
    setAlerts(prev => [alert, ...prev]);
  };
  
  return () => ws.close();
}, []);
```

### Add Token Metadata

Install and use:
```bash
npm install @coinbase/onchainkit
```

```typescript
import { Token } from '@coinbase/onchainkit/token';

<Token address="0x..." chainId={8453} />
```

## 📁 Project Structure

```
chainwatch-miniapp/
├── app/
│   ├── api/
│   │   ├── wallets/route.ts   # Wallet CRUD
│   │   └── alerts/route.ts    # Alert feed
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   ├── providers.tsx          # OnchainKit setup
│   └── globals.css            # Styles
├── components/
│   ├── WalletConnect.tsx      # Wallet button
│   ├── AddWalletForm.tsx      # Add wallet UI
│   ├── WalletList.tsx         # Tracked wallets
│   └── AlertFeed.tsx          # Alert stream
├── public/
│   └── .well-known/
│       └── farcaster.json     # Mini-app manifest
└── package.json
```

## 🔥 Next Steps

1. **Deploy Backend**: Host your ChainWatch Python backend (Railway, Replit)
2. **Connect APIs**: Wire up the real endpoints
3. **Test Live**: Try adding wallets and viewing alerts
4. **Generate Manifest**: Use `npx create-onchain --manifest`
5. **Post to Base**: Share in Base App for discovery
6. **Apply for Grants**: If traction is good, reach out to Base team

## 🐛 Troubleshooting

**Wallet won't connect?**
- Check your `NEXT_PUBLIC_ONCHAINKIT_API_KEY` is set
- Verify you're on Base network

**Alerts not showing?**
- Ensure ChainWatch backend is running
- Check browser console for API errors

**Manifest not working?**
- Verify `.well-known/farcaster.json` is accessible
- Run `npx create-onchain --manifest` to regenerate

## 📚 Resources

- [OnchainKit Docs](https://docs.base.org/builderkits/onchainkit)
- [Base Mini-Apps Guide](https://docs.base.org/mini-apps)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

## 💬 Questions?

Built by following Jessi's feedback: "keep it minimal, no bloat, validate fast"

---

**Remember**: Ship first, iterate later. This is v0.1 - focus on getting real users! 🚀
