import CryptoTable from '@/components/Crypto.component';

export default function Market() {
  return (
    <div>
      <h1 className="text-lg md:text-2xl mb-4">Prix des crypto-monnaies aujourd'hui par capitalisation boursière :</h1>
        <CryptoTable />
    </div>
  );
}
