'use client';

// Interfaces
import { Glossary } from './GlossaryList.component';

interface GlossaryTermProps {
  term: Glossary;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term }) => {
  return (
    <div
      id={term.id}
      className="card bg-secondary !shadow-sm-light text-primary-content w-full my-5"
    >
      <div className="card-body">
        <h2 className="card-title underline underline-offset-4">
          {term.title}
        </h2>
        <p>{term.definition}</p>
      </div>
    </div>
  );
};

export default GlossaryTerm;
