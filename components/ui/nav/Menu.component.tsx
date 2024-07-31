'use client';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { memo, useCallback } from 'react';

// Interfaces
import { MenuItemType } from '@/interfaces/navItems.interface';

const Menu = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  const router = useRouter();
  // const [category, setCategory] = useState('');

  const handleNavigation = useCallback(
    (label: string, href: string) => {
      if (label === 'Actualité' || label === 'Lexique') {
        router.push(href);
      } else {
        router.push(`/courses/${label}`);
      }
    },
    [router]
  );

  return (
    <>
      <div className="dropdown sm:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-black rounded-lg border-2 border-black px-8 bg-white"
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
      <ul className="hidden sm:flex space-x-4 text-text justify-center items-center">
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
