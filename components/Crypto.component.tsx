'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-xl">Erreur : {error}</div>;
  }
console.log(cryptos[0])
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
              <th className="px-6 md:px-2">{crypto.cmc_rank}</th>
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
      <div className="flex justify-center items-center mt-4 space-x-4">
        <span>Plus d'information sur :</span>
        <div className="flex flex-col lg:flex-row">
          <div className="card rounded-box grid flex-grow place-items-center">
            {' '}
            <a
              className="p-2 bg-button rounded-md"
              href="https://coinmarketcap.com/"
            >
              CoinMarketCap
            </a>
          </div>
          <div className="divider lg:divider-horizontal">ou</div>
          <div className="card rounded-box grid flex-grow place-items-center">
            <a
              href="https://www.coingecko.com/fr"
              className="p-2 bg-button rounded-md"
            >
              CoinGeko
            </a>
          </div>
        </div>
      </div>
      <ScrollToTopButton
        showScrollToTop={showScrollToTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
}
