'use client';

export interface Glossary {
  id: string;
  title: string;
  definition: string;
  createdAt: string;
}

const classNameLetterList = 'inline-block cursor-pointer text-sm md:text-lg';
const classNameLetterListIsSelect =
  'bg-secondary text-black p-1 rounded-md px-3';

interface GlossaryListProps {
  glossary: Glossary[];
  selectedSection: string;
  handleSectionClick: (section: string) => void;
  handleTermClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => void;
}

const GlossaryList: React.FC<GlossaryListProps> = ({
  glossary,
  selectedSection,
  handleSectionClick,
  handleTermClick,
}) => {
  const filteredGlossary = glossary.filter((term) => {
    const firstLetter = term.title[0].toUpperCase();
    if (selectedSection === 'A-B')
      return firstLetter >= 'A' && firstLetter <= 'B';
    if (selectedSection === 'C-D')
      return firstLetter >= 'C' && firstLetter <= 'D';
    if (selectedSection === 'E-I')
      return firstLetter >= 'E' && firstLetter <= 'I';
    if (selectedSection === 'J-M')
      return firstLetter >= 'J' && firstLetter <= 'M';
    if (selectedSection === 'N-Q')
      return firstLetter >= 'N' && firstLetter <= 'Q';
    if (selectedSection === 'R-S')
      return firstLetter >= 'R' && firstLetter <= 'S';
    if (selectedSection === 'T-Z')
      return firstLetter >= 'T' && firstLetter <= 'Z';
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="bg-blueDark rounded-md p-4 shadow-xs-light">
        <div className="text-md">
          <ul className="flex space-x-6 md:space-x-8 px-4 py-2">
            <li
              className={`${selectedSection === 'A-B' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('A-B')}>A - B</a>
            </li>
            <li
              className={`${selectedSection === 'C-D' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('C-D')}>C - D</a>
            </li>
            <li
              className={`${selectedSection === 'E-I' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('E-I')}>E - H</a>
            </li>
            <li
              className={`${selectedSection === 'J-M' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('J-M')}>I - M</a>
            </li>
            <li
              className={`${selectedSection === 'N-Q' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('N-Q')}>N - Q</a>
            </li>
            <li
              className={`${selectedSection === 'R-S' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('R-S')}>R - S</a>
            </li>
            <li
              className={`${selectedSection === 'T-Z' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
            >
              <a onClick={() => handleSectionClick('T-Z')}>T - Z</a>
            </li>
          </ul>
        </div>
        <div className="divider bg-tertiary h-0.5 my-2 rounded-md"></div>
        <div className="px-4 text-lg pb-4">
          {filteredGlossary.map((term) => (
            <h4 key={term.id}>
              <a
                href={`#${term.id}`}
                onClick={(e) => handleTermClick(e, term.id)}
              >
                {term.title}
              </a>
            </h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlossaryList;
