'use client';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { memo, useCallback } from 'react';

// Interfaces
import { MenuItemType } from '@/interfaces/navItems.interface';

const Menu = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  const router = useRouter();

  const handleNavigation = useCallback(
    (label: string, href: string) => {
      if (label === 'Actualité' || label === 'Glossaire' || label === 'Marché') {
        router.push(href);
      } else {
        router.push(`/courses/${label}`);
      }
    },
    [router]
  );

  return (
    <>
      <div className="dropdown md:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-black rounded-lg border-2 border-black px-8 bg-white hover:bg-button"
        >
          Menu
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-background rounded-box w-52"
        >
          {menuItems.map(({ label, href }) => (
            <li key={label}>
              <a onClick={() => handleNavigation(label, href)}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="hidden md:flex space-x-4 text-text justify-center items-center">
        {menuItems.map(({ label, href }) => (
          <li key={label}>
            <a onClick={() => handleNavigation(label, href)}>
              <h4>{label}</h4>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default memo(Menu);
