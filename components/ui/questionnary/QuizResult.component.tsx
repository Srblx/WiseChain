// Components

// Libs React
import React from 'react';
import NavigationAfterResultButtons from './ResultButton.component';

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
  const isPassed = score >= 7;

  return (
    <div
      id="congratulations"
      className="bg-blueDark p-5 md:p-10 rounded-md shadow-sm-light"
    >
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
            : 'Vous pouvez réclamer votre récompense lorsque vous atteignez 7/10. Retentez votre chance !'}
        </p>
        <p className="text-md md:text-lg mb-4">
          Bonne chance pour votre voyage d'apprentissage ! 👏📚
        </p>
        <NavigationAfterResultButtons
          onReturnToCourses={onReturnToCourses}
          onClaim={onClaim}
          claimDisabled={!isPassed}
        />
      </div>
    </div>
  );
};

export default QuizResults;
