// Libs Next
import Image from 'next/image';

// Image
import logo from '@/public/img/noDB/logo-d.png';

const LogoDetoured = () => {
  return (
    <Image
      src={logo}
      alt='Logo du site WiseChain'
      className='w-[65px] h-[65px] ml-8 bg-white rounded-full p-1'
    />
  );
};

export default LogoDetoured;
