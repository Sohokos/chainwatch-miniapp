import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with your ChainWatch backend later)
const userWallets: Record<string, Array<{
  address: string;
  label?: string;
  addedAt: string;
}>> = {};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userAddress = searchParams.get('userAddress');

  if (!userAddress) {
    return NextResponse.json({ error: 'User address required' }, { status: 400 });
  }

  const wallets = userWallets[userAddress] || [];
  return NextResponse.json({ wallets });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userAddress, walletAddress, label } = body;

    if (!userAddress || !walletAddress) {
      return NextResponse.json(
        { error: 'User address and wallet address required' },
        { status: 400 }
      );
    }

    if (!userWallets[userAddress]) {
      userWallets[userAddress] = [];
    }

    // Check if wallet already exists
    const exists = userWallets[userAddress].some(
      (w) => w.address.toLowerCase() === walletAddress.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { error: 'Wallet already tracked' },
        { status: 400 }
      );
    }

    userWallets[userAddress].push({
      address: walletAddress,
      label: label || undefined,
      addedAt: new Date().toISOString(),
    });

    // TODO: Call your ChainWatch backend to start tracking
    // await fetch('YOUR_CHAINWATCH_BACKEND/api/add_wallet', {
    //   method: 'POST',
    //   body: JSON.stringify({ user_id: userAddress, address: walletAddress, label })
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/wallets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const userAddress = searchParams.get('userAddress');

  if (!address || !userAddress) {
    return NextResponse.json(
      { error: 'Address and user address required' },
      { status: 400 }
    );
  }

  if (userWallets[userAddress]) {
    userWallets[userAddress] = userWallets[userAddress].filter(
      (w) => w.address.toLowerCase() !== address.toLowerCase()
    );
  }

  // TODO: Call your ChainWatch backend to stop tracking
  // await fetch('YOUR_CHAINWATCH_BACKEND/api/remove_wallet', {
  //   method: 'DELETE',
  //   body: JSON.stringify({ user_id: userAddress, address })
  // });

  return NextResponse.json({ success: true });
}
