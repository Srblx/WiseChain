// Libs Next
import Link from 'next/link';

// Libs React
import ButtonUserUnlogged from '@/components/shared/auth/BtnUser.component';
import { memo, useMemo } from 'react';

// Components
import Routes from '@/enums/routes.enum';
import { MenuItemType, MenuProps } from '@/interfaces/navItems.interface';
import LogoDetoured from '../shared/Logo.component';

const navClasses =
  'bg-backgroundTransparent bg-opacity-40 backdrop-filter backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 sm:h-16 fixed top-0 left-0 right-0';


const Menu = ({ menuItems }: MenuProps) => {
  return (
    <>
      <div className="dropdown sm:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-black rounded-md border-2 border-black px-8 bg-white"
        >
          Menu
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-background rounded-box w-52"
        >
          {menuItems.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="hidden sm:flex space-x-4  text-text justify-center items-center">
        {menuItems.map(({ label, href }) => (
          <li key={href}>
            <Link href={href}>
              <h4>{label}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// eslint-disable-next-line react/display-name
const Navbar = memo(() => {
  const menuItems: MenuItemType[] = useMemo(
    () => [
      { label: 'Actualité', href: Routes.ACTUALITY },
      { label: 'Investissement', href: Routes.COURS_INVESTMENT },
      { label: 'Crypto-Monnaie', href: Routes.COURS_CRYPTO },
      { label: 'Blockchain', href: Routes.COURS_BLOCKCHAIN },
      { label: 'NFTs', href: Routes.COURS_NFTS },
    ],
    []
  );

  return (
    <nav className={navClasses}>
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <LogoDetoured />
        </Link>
        <div className="flex items-center space-x-4">
          <Menu menuItems={menuItems} />
        </div>
        <ButtonUserUnlogged />
      </div>
    </nav>
  );
});

export default Navbar;
