// COmponents
import CryptoTable from '@/components/Crypto.component';

export default function Market() {
  return (
    <div>
      <h1 className="text-lg lg:text-3xl mb-4 pt-8">
        Cours des crypto-monnaies par capitalisation boursière :
      </h1>
      <div className="flex flex-col items-start mt-2 mb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <span>Plus d'information sur le marché des crypto-monnaies :</span>
          <a
            className="underline text-tertiary"
            href="https://coinmarketcap.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CoinMarketCap
          </a>
          <span className="text-sm">ou</span>
          <a
            href="https://www.coingecko.com/fr"
            className="underline text-tertiary"
            target="_blank"
            rel="noopener noreferrer"
          >
            CoinGeko
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span>Consultez le marché boursier sur :</span>
          <a
            href="https://www.saxotrader.com/sim/instant-demo/InstantDemo-FR-FR5/trading/open-positions?activetab=overview"
            className="underline text-tertiary"
            target="_blank"
            rel="noopener noreferrer"
          >
            SaxoTrade
          </a>
        </div>
      </div>
      <CryptoTable />
    </div>
  );
}
