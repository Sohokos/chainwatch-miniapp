'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

interface TrackedWallet {
  address: string;
  label?: string;
  addedAt: string;
}

export function WalletList() {
  const { address, isConnected } = useAccount();
  const [wallets, setWallets] = useState<TrackedWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      fetchWallets();
    }
  }, [isConnected, address]);

  const fetchWallets = async () => {
    try {
      const response = await fetch(`/api/wallets?userAddress=${address}`);
      if (response.ok) {
        const data = await response.json();
        setWallets(data.wallets || []);
      }
    } catch (error) {
      console.error('Error fetching wallets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (walletAddress: string) => {
    if (!confirm('Remove this wallet from tracking?')) return;

    try {
      const response = await fetch(`/api/wallets?address=${walletAddress}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWallets(wallets.filter((w) => w.address !== walletAddress));
      }
    } catch (error) {
      console.error('Error removing wallet:', error);
    }
  };

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-600 text-center">Loading...</p>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-600 text-center">No wallets tracked yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
      {wallets.map((wallet) => (
        <div key={wallet.address} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {wallet.label && (
                  <span className="font-medium text-gray-900">{wallet.label}</span>
                )}
                <span className="px-2 py-1 bg-base-blue/10 text-base-blue text-xs font-medium rounded">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 font-mono truncate">
                {wallet.address}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Added {new Date(wallet.addedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleRemove(wallet.address)}
              className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
