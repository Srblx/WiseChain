'use client';

// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import QuestionCard from '@/components/ui/questionnary/QuestionCard.component';
import QuizResults from '@/components/ui/questionnary/QuizResult.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers
import axios from 'axios';

// Libs Next
import { useRouter, useSearchParams } from 'next/navigation';

// React Libs
import { useEffect, useState } from 'react';

export interface Answer {
  id: number;
  answer: string;
  correct_answer: boolean;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Questionnary {
  id?: number;
  subject?: string;
  questions?: Question[];
}

// const Questionary = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const courseId = searchParams.get('courseId');
//   const [questionnary, setQuestionnary] = useState<Questionnary>({});
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [score, setScore] = useState<number>(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [answeredQuestions, setAnsweredQuestions] = useState<{
//     [key: number]: boolean;
//   }>({});
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const { user, token } = useAuth();

//   useEffect(() => {
//     if (courseId) {
//       const fetchQuestions = async () => {
//         try {
//           const response = await axios.get(Routes.QUESTIONNARY, {
//             params: { courseId: courseId },
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setQuestionnary(response.data);
//           setQuestions(response.data.questions);
//         } catch (error) {
//           console.error(ERROR_MESSAGES.ERROR_FETCHING_QUESTIONNARY, error);
//         }
//       };

//       fetchQuestions();
//     }
//   }, [courseId, token]);

//   useEffect(() => {
//     const savedState = localStorage.getItem('questionaryState');
//     if (savedState) {
//       const { savedQuestions, savedIndex, savedScore, savedAnsweredQuestions } =
//         JSON.parse(savedState);
//       setQuestions(savedQuestions);
//       setCurrentQuestionIndex(savedIndex);
//       setScore(savedScore);
//       setAnsweredQuestions(savedAnsweredQuestions || {});
//     }
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       const stateToSave = {
//         savedQuestions: questions,
//         savedIndex: currentQuestionIndex,
//         savedScore: score,
//         savedAnsweredQuestions: answeredQuestions,
//       };
//       localStorage.setItem('questionaryState', JSON.stringify(stateToSave));
//     }
//   }, [questions, currentQuestionIndex, score, answeredQuestions]);

//   const handleAnswerClick = (answerId: number) => {
//     if (selectedAnswer === null) {
//       setSelectedAnswer(answerId);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer !== null) {
//       const question = questions[currentQuestionIndex];
//       const selected = question.answers.find(
//         (answer) => answer.id === selectedAnswer
//       );
//       if (
//         selected &&
//         selected.correct_answer &&
//         !answeredQuestions[currentQuestionIndex]
//       ) {
//         setScore(score + 1);
//       }
//       setAnsweredQuestions((prevState) => ({
//         ...prevState,
//         [currentQuestionIndex]: true,
//       }));
//     }
//     setSelectedAnswer(null);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   const handleFinishQuiz = async () => {
//     try {
//       const response = await axios.post(
//         Routes.QUESTIONNARY,
//         {
//           score,
//           date_of_realize_questionary: Date.now(),
//           user_id: user?.id,
//           questionary_id: questionnary.id,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         setQuizCompleted(true);
//       }
//     } catch (error) {
//       console.error(ERROR_MESSAGES.NOT_SAVING, error);
//     }
//   };

//   if (questions.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-ring loading-lg"></span>
//       </div>
//     );

//   const question = questions[currentQuestionIndex];
//   if (!question) return <div>Chargement des questions...</div>;

//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   const handleNavigation = () => {
//     router.push(Routes.ALL_COURSES('crypto-monnaie'));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {quizCompleted ? (
//         <div className="bg-blueDark p-5 md:p-10 rounded-md shadow-sm-light">
//           <div className="text-center">
//             {score >= 8 ? (
//               <>
//                 <h2 className="text-2xl md:text-4xl mb-4">Félicitation! 🎉</h2>
//                 <p className="text-xl md:text-3xl mb-4">
//                   Vous avez rempli le questionnaire avec succès !
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Votre score est de {score} sur {questions.length}.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Continuez à apprendre et à élargir vos connaissances.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Nous sommes là pour vous aider à chaque étape.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Vous pouvez reclamer votre récompense maintenant.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Bonne chance pour votre voyage d'apprentissage ! 👏📚
//                 </p>
//                 <div className='flex justify-around mt-10'>
//                 <Button
//                   onClick={handleNavigation}
//                   className="rounded-full bg-button text-white text-md md:text-base p-2 md:py-4 md:px-16"
//                 >
//                   Retourner aux cours
//                 </Button>
//                 <Button
//                   onClick={() => console.log('Claim')}
//                   className="rounded-full bg-button text-white p-2 text-md md:text-base md:py-4 md:px-16"
//                 >
//                   Claim
//                 </Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-2xl md:text-4xl mb-4">Bravo 👌</h2>
//                 <p className="text-xl md:text-3xl mb-4">
//                   Vous avez complété le questionnaire.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Votre score est de {score} sur {questions.length}.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Continuez à apprendre et à élargir vos connaissances.{' '}
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Nous sommes là pour vous aider à chaque étape.
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Vous pouvez reclamer votre récompense lorsque vous atteignez
//                   8/10.{' '}Retentez votre chance !
//                 </p>
//                 <p className="text-md md:text-lg mb-4">
//                   Bonne chance pour votre voyage d'apprentissage ! 👏📚
//                 </p>
//                 <div className='flex justify-around mt-10'>
//                 <Button
//                   onClick={handleNavigation}
//                   className="rounded-full bg-button text-white py-4 px-10"
//                 >
//                   Retourner aux cours
//                 </Button>
//                 <Button
//                   onClick={() => console.log('Claim')}
//                   disabled
//                   className="rounded-full bg-button opacity-25 text-white py-4 px-10"
//                 >
//                   Claim
//                 </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           <h1 className="text-center text-2xl md:text-4xl mb-8">
//             {questionnary.subject}
//           </h1>
//           <div>
//             <div className="bg-blueDark p-5 md:p-10 grid grid-cols-2 gap-4 rounded-md shadow-sm-light">
//               <h2 className="text-center text-xl md:text-2xl mb-8 col-span-2">
//                 {question.question}
//               </h2>
//               {question.answers.map((answer: Answer) => (
//                 <Button
//                   key={answer.id}
//                   onClick={() => handleAnswerClick(answer.id)}
//                   style={{
//                     display: 'block',
//                     margin: '10px 0',
//                     backgroundColor:
//                       answer.id === selectedAnswer
//                         ? answer.correct_answer
//                           ? '#6BF95E' // ? 'lightgreen' ''
//                           : '#FF3939' //'lightcoral'
//                         : '',
//                   }}
//                   className={`bg-secondary text-blueDark p-3 md:p-5 rounded-3xl md:rounded-full text-xs md:text-base ${answer.id === selectedAnswer ? '' : ''}`}
//                 >
//                   {answer.answer}
//                 </Button>
//               ))}
//               <div className="col-span-2 flex justify-center mt-2 md:mt-8">
//                 <Button
//                   onClick={
//                     isLastQuestion ? handleFinishQuiz : handleNextQuestion
//                   }
//                   disabled={selectedAnswer === null}
//                   className="rounded-full bg-button text-white py-4 px-16"
//                 >
//                   {isLastQuestion ? 'Terminer' : 'Question suivante'}
//                 </Button>
//               </div>
//               <div className="text-center col-span-2">
//                 Votre score: {score}/{questions.length}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Questionary;

const Questionary: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [questionnary, setQuestionnary] = useState<Questionnary>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: boolean }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (courseId) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(Routes.QUESTIONNARY, {
            params: { courseId },
            headers: { Authorization: `Bearer ${token}` },
          });
          setQuestionnary(response.data);
          setQuestions(response.data.questions);
        } catch (error) {
          console.error(ERROR_MESSAGES.ERROR_FETCHING_QUESTIONNARY, error);
        }
      };

      fetchQuestions();
    }
  }, [courseId, token]);

  useEffect(() => {
    const savedState = localStorage.getItem('questionaryState');
    if (savedState) {
      const { savedQuestions, savedIndex, savedScore, savedAnsweredQuestions } = JSON.parse(savedState);
      setQuestions(savedQuestions);
      setCurrentQuestionIndex(savedIndex);
      setScore(savedScore);
      setAnsweredQuestions(savedAnsweredQuestions || {});
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const stateToSave = {
        savedQuestions: questions,
        savedIndex: currentQuestionIndex,
        savedScore: score,
        savedAnsweredQuestions: answeredQuestions,
      };
      localStorage.setItem('questionaryState', JSON.stringify(stateToSave));
    }
  }, [questions, currentQuestionIndex, score, answeredQuestions]);

  const handleAnswerClick = (answerId: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerId);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const question = questions[currentQuestionIndex];
      const selected = question.answers.find((answer) => answer.id === selectedAnswer);
      if (selected && selected.correct_answer && !answeredQuestions[currentQuestionIndex]) {
        setScore(score + 1);
      }
      setAnsweredQuestions((prevState) => ({
        ...prevState,
        [currentQuestionIndex]: true,
      }));
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = async () => {
    try {
      const response = await axios.post(
        Routes.QUESTIONNARY,
        {
          score,
          date_of_realize_questionary: Date.now(),
          user_id: user?.id,
          questionary_id: questionnary.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setQuizCompleted(true);
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.NOT_SAVING, error);
    }
  };

  if (questions.length === 0) return <LoadingSpinner />;

  const question = questions[currentQuestionIndex];
  if (!question) return <div>Chargement des questions...</div>;

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNavigation = () => {
    router.push(Routes.ALL_COURSES('crypto-monnaie'));
  };

  return (
    <div className="container mx-auto p-4">
      {quizCompleted ? (
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          onClaim={() => console.log('Claim')}
          onReturnToCourses={handleNavigation}
        />
      ) : (
        <>
          <h1 className="text-center text-2xl md:text-4xl mb-8">{questionnary.subject}</h1>
          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerClick={handleAnswerClick}
            onNextClick={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
            isLastQuestion={isLastQuestion}
            score={score}
            totalQuestions={questions.length}
          />
        </>
      )}
    </div>
  );
};

export default Questionary;