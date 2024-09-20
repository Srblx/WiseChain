// Icons
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import { PiBooks } from 'react-icons/pi';
import { RiBookMarkedLine, RiQuestionnaireLine } from 'react-icons/ri';

interface NavBackofficeProps {
  setCurrentPage: (page: string) => void;
}

const NavBackoffice: React.FC<NavBackofficeProps> = ({ setCurrentPage }) => {
  return (
    <div className="drawer-side h-screen">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-white text-black text-lg w-64 h-[92dvh] p-4 pt-20 rounded-tr-lg rounded-br-lg flex flex-col justify-center space-y-4">
        <li>
          <a onClick={() => setCurrentPage('users')}>
            <FaRegUser />
            Utilisateurs
          </a>
        </li>
        <li>
          <a>
            <MdOutlineArticle />
            Articles
          </a>
        </li>
        <li>
          <a>
            <RiBookMarkedLine />
            Cours
          </a>
        </li>
        <li>
          <a>
            <RiQuestionnaireLine />
            Questionnaires
          </a>
        </li>
        <li>
          <a onClick={() => setCurrentPage('glossary')}>
            <PiBooks />
            Glossaire
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBackoffice;
