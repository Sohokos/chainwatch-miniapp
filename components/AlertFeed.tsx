'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  type: 'BUY' | 'SELL';
  walletAddress: string;
  tokenSymbol: string;
  amount: string;
  usdValue?: string;
  txHash: string;
  timestamp: string;
}

export function AlertFeed() {
  const { address, isConnected } = useAccount();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      fetchAlerts();
      
      // Poll for new alerts every 10 seconds
      const interval = setInterval(fetchAlerts, 10000);
      return () => clearInterval(interval);
    }
  }, [isConnected, address]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`/api/alerts?userAddress=${address}`);
      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-600">Connect your wallet to view alerts</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-600 text-center">Loading alerts...</p>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-600">No alerts yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Add wallets to start tracking their activity
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-white rounded-lg border-2 p-4 hover:shadow-md transition-shadow ${
            alert.type === 'BUY'
              ? 'border-green-200 bg-green-50/50'
              : 'border-red-200 bg-red-50/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    alert.type === 'BUY'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {alert.type}
                </span>
                <span className="font-semibold text-gray-900">
                  {alert.tokenSymbol}
                </span>
                {alert.usdValue && (
                  <span className="text-sm text-gray-600">
                    ${parseFloat(alert.usdValue).toLocaleString()}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 font-mono mb-1">
                Wallet: {alert.walletAddress.slice(0, 6)}...{alert.walletAddress.slice(-4)}
              </p>
              
              <p className="text-xs text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
            
            <a
              href={`https://basescan.org/tx/${alert.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-blue hover:underline text-sm font-medium"
            >
              View Tx →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
