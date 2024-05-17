import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/img/logo.jpg';

export default function Footer() {
  const navClass = 'sm:ml-10 max-md:block max-md:space-x-4 ';

  return (
    <>
      <div className='bg-backgroundTransparent flex justify-center items-center p-6 border-y-2 border-white mt-20'>
        <div className='text-center text-sm space-y-6'>
          <p>
            Investir dans les marchés financiers, y compris dans les
            crypto-actifs, comporte des risques significatifs. Il est crucial de
            comprendre que vous pouvez perdre une partie, voire la totalité, de
            votre capital investi. La nature extrêmement volatile des
            crypto-monnaies les rend particulièrement sensibles aux fluctuations
            du marché et aux événements géopolitiques, économiques et
            réglementaires.
          </p>
          <p>
            Les produits à effet de levier, tels que les CFD (contrats sur la
            différence), amplifient considérablement les risques financiers. Les
            statistiques montrent qu&#39;une grande majorité des investisseurs
            particuliers subissent des pertes en négociant des CFD. Avant de
            vous engager, assurez-vous de maîtriser le fonctionnement de ces
            instruments complexes et d&#39;en accepter les risques inhérents.
          </p>
          <p>
            Avant de décider de négocier des instruments financiers ou des
            crypto-monnaies, vous devez être pleinement informé des risques et
            des frais associés aux transactions sur les marchés financiers,
            examiner attentivement vos objectifs de placement, votre niveau
            d’expérience et votre tolérance pour le risque et faire appel à des
            professionnels si nécessaire.
          </p>
          <p>
            WiseChain peut être amené à produire des commentaires d’ordre
            général qui ne constituent pas des conseils en investissement et ne
            doivent pas être interprétés comme tels. WIseChain décline toute
            responsabilité pour les erreurs, investissements inopportuns,
            inexactitudes ou omissions et ne garantit pas l’exactitude ou la
            complétude des informations, textes, graphiques, liens ou autres
            éléments contenus dans l&#39;application.
          </p>
        </div>
      </div>
      <footer className='footer p-10 mt-6 text-white max-md:flex max-md:flex-col max-md:items-center max-md:text-center'>
        <aside className='sm:ml-10 md:ml-14 lg:ml-28'>
          <Link href='/'>
            <Image
              className='w-[200px]'
              src={logo}
              alt='Logo du site Wisechain'
            />
          </Link>
          <p className='text-base mx-auto'>WISECHAIN</p>
        </aside>
        <nav className={navClass}>
          <h6 className='footer-title'>Cours Crypto-monnaie</h6>
          <a className='link link-hover'>Crypto</a>
          <a className='link link-hover'>Crypto</a>
          <a className='link link-hover'>Crypto</a>
          <a className='link link-hover'>Crypto</a>
        </nav>
        <nav className={navClass}>
          <h6 className='footer-title'>Cours Blockchain</h6>
          <a className='link link-hover'>Blockchain</a>
          <a className='link link-hover'>Blockchain</a>
          <a className='link link-hover'>Blockchain</a>
          <a className='link link-hover'>Blockchain</a>
        </nav>
        <nav className={navClass}>
          <h6 className='footer-title'>Legal</h6>
          <a className='link link-hover'>À Propos</a>
          <a className='link link-hover'>Condition d&#39;utlisation</a>
          <a className='link link-hover'>English | Francais</a>
        </nav>
      </footer>
    </>
  );
}
