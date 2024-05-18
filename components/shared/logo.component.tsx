// Libs Next
import Image from 'next/image';

// CSS Module
import logo from '../../public/img/logo-d.png';

const LogoDetoured = () => {
  return (
    <Image
      src={logo}
      alt='Logo du site WiseChain'
      className='w-[60px] h-[60px] ml-8'
    />
  );
};

export default LogoDetoured;
