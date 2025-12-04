'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'wallets'>('feed');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [walletInput, setWalletInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [modalData, setModalData] = useState({ address: '', tag: '' });
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);

  const [trackedWallets, setTrackedWallets] = useState([
    { address: '0xe3f0a609c8545f47a3ce95704c31dcf7327011f6', tag: '👁' },
    { address: '0x896e441362d55b3d4f20fe193c668ba91ea3e12d', tag: 'Lapulga' },
    { address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', tag: 'Whale1' },
  ]);

  const [transactions] = useState([
    {
      type: 'BUY',
      network: 'BASE Network',
      txHash: '0x123abc',
      wallet: '0xe3f0a609c8545f47a3ce95704c31dcf7327011f6',
      tag: '👁',
      hasTag: true,
      token: 'oracle',
      tokenCA: '0x0D186f8C94293dD8ea65d3ae3EBA3a8cAD91b769',
      get: '7,270,519.73',
      getToken: 'oracle',
      spent: '0.051258',
      spentToken: 'WETH',
      stats1h: '-0.95%',
      tx1h: '7',
      stats24h: '+7.46%',
      tx24h: '65',
      router: 'Uniswap V4',
      volume24h: '12.3K USD',
      mcap: '1.3M USD',
      liquidity: '1.1M USD',
      time: '2s ago'
    },
    {
      type: 'SELL',
      network: 'BASE Network',
      txHash: '0x456def',
      wallet: '0x896e441362d55b3d4f20fe193c668ba91ea3e12d',
      tag: 'Lapulga',
      hasTag: true,
      token: 'jesse',
      tokenCA: '0x50F88fe97f72CD3E75b9Eb4f747F59BcEBA80d59',
      get: '6,097.65',
      getToken: 'RM',
      spent: '79.41',
      spentToken: 'jesse',
      stats1h: '-0.20%',
      tx1h: '85',
      stats24h: '+3.56%',
      tx24h: '3073',
      router: 'Unknown Router',
      volume24h: '575.1K USD',
      mcap: '4.9M USD',
      liquidity: '3.5M USD',
      time: '15s ago'
    },
    {
      type: 'BUY',
      network: 'BASE Network',
      txHash: '0x789ghi',
      wallet: '0xc51b211fe1f47982b27a35ad56de634d7391c206',
      tag: null,
      hasTag: false,
      token: 'PISS',
      tokenCA: '0x98e8E3aE8B83D269c0B1856Ff023F7d0360F2b07',
      get: '351,162,001.87',
      getToken: 'PISS',
      spent: '0.0750',
      spentToken: 'ETH',
      stats1h: 'N/A',
      tx1h: 'N/A',
      stats24h: 'N/A',
      tx24h: 'N/A',
      router: 'Unknown Router',
      volume24h: 'N/A',
      mcap: 'N/A',
      liquidity: 'N/A',
      time: '30s ago'
    },
  ]);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToastMessage(`${label} copied!`);
  };

  const addWallet = () => {
    const address = walletInput.trim();
    const tag = tagInput.trim() || 'Unnamed';

    if (!address) {
      showToastMessage('Please enter wallet address');
      return;
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      showToastMessage('Invalid wallet format');
      return;
    }

    if (trackedWallets.some(w => w.address.toLowerCase() === address.toLowerCase())) {
      showToastMessage('Wallet already tracked');
      return;
    }

    setTrackedWallets([...trackedWallets, { address: address.toLowerCase(), tag }]);
    setModalData({ address, tag });
    setShowAddModal(true);
    setWalletInput('');
    setTagInput('');
  };

  const confirmRemove = () => {
    if (removeIndex !== null) {
      setTrackedWallets(trackedWallets.filter((_, i) => i !== removeIndex));
      showToastMessage('Wallet removed');
    }
    setShowRemoveModal(false);
    setRemoveIndex(null);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">👁</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">ChainWatch</h1>
              <p className="text-xs text-purple-200">Base Network Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 live-pulse"></div>
            <span className="text-xs font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-900 border-b border-gray-800 sticky top-16 z-10">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-3.5 text-sm font-medium ${
            activeTab === 'feed'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-500'
          }`}
        >
          📡 Feed
        </button>
        <button
          onClick={() => setActiveTab('wallets')}
          className={`flex-1 py-3.5 text-sm font-medium ${
            activeTab === 'wallets'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-500'
          }`}
        >
          👛 Wallets
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium z-50">
          {toastMessage}
        </div>
      )}

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="pb-6">
          <div className="space-y-3 p-3">
            {transactions.map((tx, i) => (
              <FeedCard key={i} tx={tx} copyToClipboard={copyToClipboard} />
            ))}
          </div>
        </div>
      )}

      {/* Wallets Tab */}
      {activeTab === 'wallets' && (
        <div className="p-4 pb-24">
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3">Add New Wallet</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
                placeholder="Paste wallet address (0x...)"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
              />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Tag name (e.g. Whale1, SmartMoney)"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button
                onClick={addWallet}
                className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 py-3.5 rounded-xl font-medium text-sm transition-colors"
              >
                + Add Wallet
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-3">
              Tracked Wallets ({trackedWallets.length})
            </h3>
            <div className="space-y-3">
              {trackedWallets.map((wallet, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-purple-400 font-medium">🔖 {wallet.tag}</span>
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      </div>
                      <p
                        className="font-mono text-xs text-gray-400 cursor-pointer hover:text-white truncate"
                        onClick={() => copyToClipboard(wallet.address, 'Wallet')}
                      >
                        {wallet.address}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setRemoveIndex(i);
                        setShowRemoveModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 text-sm ml-3 px-3 py-1 bg-red-900/20 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-5 w-full max-w-sm border border-gray-700">
            <h3 className="text-lg font-bold mb-4">✅ Wallet Added!</h3>
            <div className="bg-gray-800 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-400 mb-1">Address</p>
              <p className="font-mono text-sm break-all">{modalData.address}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-400 mb-1">Tag</p>
              <p className="text-sm">🏷 {modalData.tag}</p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-purple-600 py-3 rounded-xl font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Remove Modal */}
      {showRemoveModal && removeIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-5 w-full max-w-sm border border-gray-700">
            <h3 className="text-lg font-bold mb-2">Remove Wallet?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Are you sure you want to remove this wallet from tracking?
            </p>
            <div className="bg-gray-800 rounded-xl p-3 mb-4">
              <p className="font-mono text-sm break-all">{trackedWallets[removeIndex].address}</p>
              <p className="text-purple-400 text-sm mt-1">🔖 {trackedWallets[removeIndex].tag}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 bg-gray-700 py-3 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 bg-red-600 py-3 rounded-xl font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeedCard({ tx, copyToClipboard }: any) {
  const isBuy = tx.type === 'BUY';
  const bgColor = isBuy ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10';
  const typeEmoji = isBuy ? '🟢' : '🔴';
  const typeColor = isBuy ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`rounded-xl border p-4 ${bgColor} hover:border-opacity-50 transition-all duration-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeEmoji}</span>
          <div>
            <div className={`font-bold ${typeColor} text-lg`}>{tx.type} DETECTED</div>
            <div className="text-gray-400 text-xs">({tx.network})</div>
          </div>
        </div>
        <span className="text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded-md">{tx.time}</span>
      </div>

      {/* Tx Hash */}
      <div className="mb-3 text-sm bg-gray-900/50 p-3 rounded-lg">
        <span className="text-gray-400">🆔 Tx{tx.type === 'SELL' ? ' Hash' : ''}:</span>{' '}
        <a href={`https://basescan.org/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 font-medium">
          View on BaseScan
        </a>
      </div>

      {/* Wallet */}
      <div className="mb-2 text-sm">
        <span className="text-gray-400">{isBuy ? '📥 Buyer:' : '📤 Seller:'}</span>{' '}
        <span className="font-mono text-xs cursor-pointer hover:text-purple-400 transition-colors bg-gray-900/50 px-2 py-1 rounded" onClick={() => copyToClipboard(tx.wallet, 'Wallet')}>
          {tx.wallet}
        </span>
      </div>

      {/* Tag (if exists) */}
      {tx.hasTag && (
        <div className="mb-3 text-sm">
          <span className="text-gray-400">🔖 tag name:</span>{' '}
          <span className="text-purple-400 font-bold text-base">{tx.tag}</span>
        </div>
      )}

      {/* Token Info Box */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 mb-3 border border-gray-700">
        <div className="mb-2 text-sm">
          <span className="text-gray-400">🏷 Token:</span>{' '}
          <span className="font-bold text-white text-base">{tx.token}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">🔗 Token CA:</span>{' '}
          <span className="font-mono text-xs text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors" onClick={() => copyToClipboard(tx.tokenCA, 'Token CA')}>
            {tx.tokenCA}
          </span>
        </div>
      </div>

      {/* GET/SPENT Box */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
          <div className="text-green-400 font-bold text-xs mb-1">🟢 GET</div>
          <div className="text-white font-bold text-sm">{tx.get}</div>
          <div className="text-gray-400 text-xs">{tx.getToken}</div>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
          <div className="text-red-400 font-bold text-xs mb-1">🔴 SPENT</div>
          <div className="text-white font-bold text-sm">{tx.spent}</div>
          <div className="text-gray-400 text-xs">{tx.spentToken}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-2 text-xs">
          <span className="text-gray-400">📘 1H Stats</span>
          <div className="mt-1">
            <span className={tx.stats1h === 'N/A' ? 'text-gray-500' : tx.stats1h.startsWith('+') ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
              {tx.stats1h}
            </span>
            <span className="text-gray-400"> | Tx </span>
            <span className="text-white font-medium">{tx.tx1h}</span>
          </div>
        </div>
        <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-2 text-xs">
          <span className="text-gray-400">📙 24H Stats</span>
          <div className="mt-1">
            <span className={tx.stats24h === 'N/A' ? 'text-gray-500' : tx.stats24h.startsWith('+') ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
              {tx.stats24h}
            </span>
            <span className="text-gray-400"> | Tx </span>
            <span className="text-white font-medium">{tx.tx24h}</span>
          </div>
        </div>
      </div>

      {/* Market Data */}
      <div className="bg-gray-900/50 rounded-lg p-3 mb-3 space-y-1.5 text-xs border border-gray-700">
        <div className="flex justify-between">
          <span className="text-gray-400">⚙️ Router:</span>
          <span className="text-white font-medium">{tx.router}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">💰 Volume (24h):</span>
          <span className="text-white font-medium">{tx.volume24h}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">📊 Market Cap:</span>
          <span className="text-white font-medium">{tx.mcap}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">💧 Liquidity:</span>
          <span className="text-white font-medium">{tx.liquidity}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <a href={`https://basescan.org/token/${tx.tokenCA}#balances`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-3 py-2.5 rounded-lg font-medium text-center transition-all duration-200 shadow-lg hover:shadow-blue-500/50">
          👥 Holders
        </a>
        <a href={`https://dexscreener.com/base/${tx.tokenCA}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-3 py-2.5 rounded-lg font-medium text-center transition-all duration-200 shadow-lg hover:shadow-purple-500/50">
          📈 Chart
        </a>
        <a href={`https://twitter.com/search?q=${tx.tokenCA}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 px-3 py-2.5 rounded-lg font-medium text-center transition-all duration-200 shadow-lg hover:shadow-cyan-500/50">
          🐦 X
        </a>
      </div>
    </div>
  );
}