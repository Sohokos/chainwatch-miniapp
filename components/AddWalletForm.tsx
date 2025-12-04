'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export function AddWalletForm() {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState('');
  const [label, setLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/wallets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress: address,
          walletAddress,
          label,
        }),
      });

      if (response.ok) {
        setWalletAddress('');
        setLabel('');
        alert('Wallet added successfully!');
      } else {
        alert('Failed to add wallet');
      }
    } catch (error) {
      console.error('Error adding wallet:', error);
      alert('Error adding wallet');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-600">Connect your wallet to add tracked wallets</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Add Wallet to Track</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wallet Address
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-base-blue focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label (optional)
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="My trader wallet"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-base-blue focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-base-blue text-white py-2 rounded-lg hover:bg-base-blue/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? 'Adding...' : 'Add Wallet'}
        </button>
      </form>
    </div>
  );
}
