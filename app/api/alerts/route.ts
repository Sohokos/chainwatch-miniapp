import { NextRequest, NextResponse } from 'next/server';

// Mock alerts for demo (replace with your ChainWatch backend)
const mockAlerts = [
  {
    id: '1',
    type: 'BUY',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    tokenSymbol: 'USDC',
    amount: '1000',
    usdValue: '1000',
    txHash: '0x1234567890abcdef',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
  },
  {
    id: '2',
    type: 'SELL',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    tokenSymbol: 'WETH',
    amount: '0.5',
    usdValue: '1250',
    txHash: '0xabcdef1234567890',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
  },
] as const;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userAddress = searchParams.get('userAddress');

  if (!userAddress) {
    return NextResponse.json({ error: 'User address required' }, { status: 400 });
  }

  // TODO: Fetch real alerts from your ChainWatch backend
  // const response = await fetch(`YOUR_CHAINWATCH_BACKEND/api/alerts?user_id=${userAddress}`);
  // const alerts = await response.json();

  // For now, return mock data
  return NextResponse.json({ alerts: mockAlerts });
}
