// Libs Next
import Image from 'next/image';
import Link from 'next/link';

// CSS Module
import logo from '@/public/img/noDB/logo.jpg';

// Components
import InvestmentSensitivity from './investmentSensitivity.component';

// Utils
import { footerItems } from '@/utils/data/footerItems';

const navClass = 'sm:ml-10 max-md:block max-md:space-x-4 ';

export default function Footer() {
  return (
    <>
      <InvestmentSensitivity />
      <footer>
        <div className="footer p-10 text-white max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
          <aside className="sm:ml-10 md:ml-14 lg:ml-28">
            <Link href="/">
              <Image
                className="w-[200px]"
                src={logo}
                alt="Logo du site Wisechain"
              />
            </Link>
            <p className="text-base mx-auto">WISECHAIN</p>
          </aside>
          {footerItems.map(({ title, links }) => (
            <nav key={title} className={`${navClass}`}>
              <h6 className="uppercase text-gray-500 mb-1">{title}</h6>
              {links.map((link) =>
                link.label === 'Nous contacter' ? (
                  <a
                    key={link.label}
                    className="link link-hover block"
                    href="mailto:wisechainnet@gmail.com?subject=Demande d'information&body=Bonjour,%0D%0AJe souhaite obtenir des informations sur..."
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.path}
                    className="link link-hover block"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          ))}
        </div>
        <div className="bg-backgroundTransparent py-2 text-center text-white">
          <p className="mb-2 text-sm md:text-base">
            Wisechain votre partenaire pour investir sur votre avenir !
          </p>
          <p className="text-sm md:text-base">
            <span className="text-red-500 font-extrabold">
              <sup>&copy;</sup>
            </span>
            2024 Wisechain. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
}
