'use client';

// Images
import logo from '@/public/img/logo-d.png';
import axios from 'axios';

// Lib Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const VerifyMail = () => {
    const router = useRouter();

    const handleVerifyMail = async () => {
      try {
        const response = await axios.patch('/api/sendVerifyEmail/verifyEmail');
  
        if (response.status === 200) {
          router.push('/');
        } else {
          console.error('Erreur lors de la vérification de l\'email');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'email', error);
      }
    };


  return (
    <div className="space-y-5">
      <h2 className="text-center text-2xl uppercase text-tertiary font-black">
        Vérification de l'adresse e-mail
      </h2>
      <div className="flex justify-center items-center bg-secondary rounded-3xl mx-64 border-8 border-grayDark shadow-lg shadow-white">
        <button onClick={handleVerifyMail}>
          <Image
            src={logo}
            alt="Logo du site clickable pour verifier sont adresse mail"
            className="w-[300px] cursor-pointer mx-auto"
          />
        </button>
      </div>
      <p className="text-center">
        Cliquez sur le bouton ci-dessus pour vérifier votre adresse e-mail.
      </p>
      <p className="text-center">
        La vérification de votre adresse e-mail est une étape essentielle pour
        profiter pleinement de toutes les fonctionnalités de notre site. En
        confirmant votre adresse, vous pourrez :
      </p>
      <ul className="text-center list-none list-inside">
        <li>
          Accéder à l'intégralité du contenu sur l'investissement, la blockchain
          et les crypto-monnaies
        </li>
        <li>Participer à nos questionnaires de connaissances</li>
        <li>Réclamer des récompenses sous forme de Nfts</li>
        <li>
          Bénéficier de nombreuses autres surprises en cours développement
        </li>
      </ul>
      <p className="text-center">
        Ne manquez pas cette opportunité ! <br /> Vérifiez votre adresse dès
        maintenant et ouvrez les portes d'une expérience enrichissante sur notre
        plateforme.
      </p>
    </div>
  );
};

export default VerifyMail;
