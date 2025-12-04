'use client';

import { WalletConnect } from '@/components/WalletConnect';
import { WalletList } from '@/components/WalletList';
import { AlertFeed } from '@/components/AlertFeed';
import { AddWalletForm } from '@/components/AddWalletForm';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'wallets' | 'alerts'>('wallets');

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-blue/5 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-base-black">ChainWatch</h1>
            <p className="text-sm text-gray-600">Real-time wallet tracking</p>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('wallets')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'wallets'
                ? 'border-b-2 border-base-blue text-base-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Wallets
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'border-b-2 border-base-blue text-base-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'wallets' ? (
          <div className="space-y-6">
            <AddWalletForm />
            <WalletList />
          </div>
        ) : (
          <AlertFeed />
        )}
      </div>
    </main>
  );
}
