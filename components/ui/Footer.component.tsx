// Libs Next
import Image from 'next/image';
import Link from 'next/link';

// CSS Module
import logo from '@/public/img/logo.jpg';

// Components
import InvestmentSensitivity from './investmentSensitivity.component';

// Utils
import { footerItems } from '@/utils/data/footerItems';

const navClass = 'sm:ml-10 max-md:block max-md:space-x-4 ';

export default function Footer() {

  return (
    <>
      <InvestmentSensitivity />
      <footer className="footer p-10 mt-6 text-white max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
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
                  className="link link-hover"
                  href="mailto:wisechainnet@gmail.com?subject=Demande d'information&body=Bonjour,%0D%0AJe souhaite obtenir des informations sur..."
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.path}
                  className="link link-hover"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        ))}
      </footer>
    </>
  );
}
