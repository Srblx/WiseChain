'use client';

// Next Libs
import Image from 'next/image';

// React Libs
import { useEffect, useState } from 'react';

// Components
import LoadingSpinner from './shared/LoadingSpinner.component';
import ScrollToTopButton from './shared/ScrollToTop.component';

async function fetchCryptos() {
  const res = await fetch('/api/market', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function CryptoTable() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-xl">Erreur : {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg bg-backgroundTransparent w-full">
        <thead>
          <tr className="text-sm md:text-lg text-blueDark">
            <th className="px-1 md:px-2">Rang</th>
            <th className="px-1">Logo</th>
            <th className="px-1 md:px-2 w-[3px] md:w-5">Nom/Symbole</th>
            <th className="px-1 md:px-2">Prix (USD)</th>
            <th className="px-1 md:px-2">Var. 24h</th>
            <th className="px-1 md:px-2">Cap.</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto: any) => (
            <tr key={crypto.id} className="text-xs md:text-base">
              <th className="inline-flex items-center justify-center h-6 bg-white text-blueDark rounded-full px-6 md:px-2 ml-4 mt-5">{crypto.cmc_rank}</th>
              <td className="p-0">
                {crypto.logo && (
                  <Image
                    src={crypto.logo}
                    alt={`${crypto.name} logo`}
                    width={24}
                    height={24}
                    className="md:w-8 md:h-8"
                  />
                )}
              </td>
              <td className="px-1 md:px-2">
                <div>{crypto.name}</div>
                <div className="text-xs text-blueDark">{crypto.symbol}</div>
              </td>
              <td className="px-1 md:px-2">
                ${parseFloat(crypto.quote.USD.price).toFixed(2)}
              </td>
              <td
                className={`px-1 md:px-2 ${crypto.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
              </td>
              <td className="px-1 md:px-2">
                ${(crypto.quote.USD.market_cap / 1e9).toFixed(2)}B
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ScrollToTopButton
        showScrollToTop={showScrollToTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
}

