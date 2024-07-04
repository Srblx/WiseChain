'use client';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import React from 'react';

// Components
import { Button } from './shared/Button.components';

interface ButtonProps {
  content: string;
  // color: string;
  onClick?: () => void;
}

const ButtonGroup: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (category: string) => {
    console.log('category:', category);
    router.push(`/courses/${category}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mb-4 mt-10">
        <Button onClick={() => handleNavigation('Investissement')}>
          Guide Investissement
        </Button>

        <Button onClick={() => handleNavigation('Crypto-monnaie')}>
          Guide Crypto-monnaies
        </Button>
        <Button onClick={() => handleNavigation('Blockchain')}>
          Guide Blockchain
        </Button>

        <Button onClick={() => handleNavigation('NFT')}>Guide NFTs</Button>
      </div>
      <div className='divider bg-tertiary h-2 mb-10 mt-10'></div>
    </>
  );
};

export default ButtonGroup;
