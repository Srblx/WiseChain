import Link from 'next/link';
import { memo, useMemo } from 'react';
import ButtonUserUnlogged from './shared/btn-user-unlogged.component';
import LogoDetoured from './shared/logo.component';

const navClasses =
  'bg-backgroundTransparent bg-opacity-40 backdrop-filter backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 sm:h-16 fixed top-0 left-0 right-0 z-50';

interface MenuProps {
  menuItems: { label: string; href: string }[];
}

const Menu = ({ menuItems }: MenuProps) => {
  return (
    <>
      <select className="select select-bordered w-full max-w-xs sm:hidden text-black rounded-md border-2 border-black p-1">
        <option disabled selected>
          Menu
        </option>
        {menuItems.map(({ label, href }) => (
          <option key={href} value={href}>
            <Link href={href}>
              <h4>{label}</h4>
            </Link>
          </option>
        ))}
      </select>
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
  const menuItems: { label: string; href: string }[] = useMemo(
    () => [
      { label: 'Actualité', href: '/articles' },
      { label: 'Investissement', href: '/courses/investment' },
      { label: 'Crypto-Monnaie', href: '/courses/crypto' },
      { label: 'Blockchain', href: '/courses/blockchain' },
      { label: 'NFTs', href: '/courses/nft' },
    ],
    []
  );

  return (
    <nav className={navClasses}>
      <div className="flex justify-between items-center w-full">
        <Link href="/"><LogoDetoured /></Link>
        <div className="flex items-center space-x-4">
          <Menu menuItems={menuItems} />
        </div>
          <ButtonUserUnlogged />
      </div>
    </nav>
  );
});

export default Navbar;
