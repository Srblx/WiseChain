// Libs Next
import Link from 'next/link';

// Libs React
import { memo, useMemo } from 'react';

// Components
import LogoDetoured from '@/components/shared/logo.component';
import ButtonUserUnlogged from '@/components/ui/nav/BtnUser.component';
import ClientMenu from './Menu.component';

// Interfaces
import { MenuItemType } from '@/interfaces/navItems.interface';

// Enums
import Routes from '@/enums/routes.enum';

const navClasses =
  'bg-backgroundTransparent bg-opacity-40 backdrop-filter backdrop-blur-md flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 sm:h-20 fixed top-0 left-0 right-0 z-[1]';

const Navbar = memo(() => {
  const menuItems: MenuItemType[] = useMemo(
    () => [
      { label: 'Actualité', href: Routes.ALL_ARTICLES },
      { label: 'Investissement', href: Routes.ALL_COURSES_INVESTMENT },
      { label: 'Crypto-Monnaie', href: Routes.ALL_COURSES_CRYPTO },
      { label: 'Blockchain', href: Routes.ALL_COURSES_BLOCKCHAIN },
      { label: 'NFT', href: Routes.ALL_COURSES_NFTS },
      { label: 'Glossaire', href: Routes.GLOSSARY },
      { label: 'Marché', href: Routes.MARKET },
    ],
    []
  );

  return (
    <nav className={navClasses}>
      <div className="flex justify-between items-center w-full">
        <Link href="/" id="logo">
          <LogoDetoured />
        </Link>
        <div className="flex items-center space-x-4 cursor-pointer">
          <ClientMenu menuItems={menuItems} />
        </div>
        <div>
          <ButtonUserUnlogged />
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
