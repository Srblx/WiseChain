import Image from 'next/image';
import iconUserRed from '../../public/svg/icon-user.svg';

const ButtonUserUnlogged = () => {
  return (
    <button className='rounded-full p-1 mr-4 border-2 border-white bg-black'>
      <Image src={iconUserRed} alt="Icon utilisateur non connecté"/>
    </button>
  );
};

export default ButtonUserUnlogged;
