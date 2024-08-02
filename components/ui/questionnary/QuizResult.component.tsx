// Components
import { Button } from '@/components/shared/Button.components';

// Libs React
import React from 'react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onClaim: () => void;
  onReturnToCourses: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onClaim,
  onReturnToCourses,
}) => {
  const isPassed = score >= 8;

  return (
    <div className="bg-blueDark p-5 md:p-10 rounded-md shadow-sm-light">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl mb-4">
          {isPassed ? 'Félicitation! 🎉' : 'Bravo 👌'}
        </h2>
        <p className="text-xl md:text-3xl mb-4">
          {isPassed
            ? 'Vous avez rempli le questionnaire avec succès !'
            : 'Vous avez complété le questionnaire.'}
        </p>
        <p className="text-md md:text-lg mb-4">
          Votre score est de {score} sur {totalQuestions}.
        </p>
        <p className="text-md md:text-lg mb-4">
          Continuez à apprendre et à élargir vos connaissances.
        </p>
        <p className="text-md md:text-lg mb-4">
          Nous sommes là pour vous aider à chaque étape.
        </p>
        <p className="text-md md:text-lg mb-4">
          {isPassed
            ? 'Vous pouvez réclamer votre récompense maintenant.'
            : 'Vous pouvez réclamer votre récompense lorsque vous atteignez 8/10. Retentez votre chance !'}
        </p>
        <p className="text-md md:text-lg mb-4">
          Bonne chance pour votre voyage d'apprentissage ! 👏📚
        </p>
        <div className="flex justify-around mt-10">
          <Button
            onClick={onReturnToCourses}
            className="rounded-full bg-button text-white py-4 px-10"
          >
            Retourner aux cours
          </Button>
          <Button
            onClick={onClaim}
            disabled={!isPassed}
            className={`rounded-full bg-button text-white py-4 px-10 ${!isPassed ? 'opacity-25' : ''}`}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
