import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { Question } from '@/interfaces/questionnary.interface';
import { FC, useEffect, useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
import Select from '../shared/CategoryDifficultySelect.component';
import { CloseButton } from '../shared/CloseButton.component';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

const QuestionModal: FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  questions,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestions, setEditedQuestions] = useState<Question[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestions, setNewQuestions] = useState<Question[]>([
    {
      id: '',
      question: '',
      answers: [
        {
          answer: '',
          correct_answer: false,
          id: '',
          questionId: '',
          questionnaryId: '',
        },
      ],
      index: 0,
      questionnaryId: '',
    },
  ]);

  useEffect(() => {
    setEditedQuestions(questions);
  }, [questions]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...editedQuestions];
    newQuestions[index] = { ...newQuestions[index], question: value };
    setEditedQuestions(newQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...editedQuestions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      answer: value,
    };
    updatedQuestions[questionIndex].answers = updatedAnswers;
    setEditedQuestions(updatedQuestions);
  };

  const handleNewQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const updatedNewQuestions = [...newQuestions];
    updatedNewQuestions[index] = {
      ...updatedNewQuestions[index],
      [field]: value,
    };
    setNewQuestions(updatedNewQuestions);
  };

  const handleNewAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    field: keyof (typeof newQuestions)[0]['answers'][0],
    value: string
  ) => {
    const updatedNewQuestions = [...newQuestions];
    const updatedAnswers = [...updatedNewQuestions[questionIndex].answers];

    // Convertir la valeur en boolean
    const convertedValue = field === 'correct_answer' ? value === '1' : value;

    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      [field]: convertedValue,
    };

    updatedNewQuestions[questionIndex].answers = updatedAnswers;
    setNewQuestions(updatedNewQuestions);
  };

  const handleAddNewQuestionField = () => {
    setNewQuestions([
      ...newQuestions,
      {
        id: '',
        question: '',
        answers: [
          {
            answer: '',
            correct_answer: false,
            id: '',
            questionId: '',
            questionnaryId: '',
          },
        ],
        index: 0 as number, //TODO logique a mettre en place pour l'index,
        questionnaryId: '',
      },
    ]);
  };

  const options = [
    { id: '0', name: 'Non' },
    { id: '1', name: 'Oui' },
  ];

  const handleRemoveNewQuestionField = (index: number) => {
    const updatedNewQuestions = newQuestions.filter((_, i) => i !== index);
    setNewQuestions(updatedNewQuestions);
  };

  const handleCancel = () => {
    setEditedQuestions(questions);
    setIsEditing(false);
    setIsAdding(false);
    setNewQuestions([
      {
        id: '',
        question: '',
        answers: [
          {
            answer: '',
            correct_answer: false,
            id: '',
            questionId: '',
            questionnaryId: '',
          },
        ],
        index: 0, //TODO logique a mettre en place pour l'index
        questionnaryId: '',
      },
    ]);
  };

  const handleValidate = () => {
    console.log('Questions modifiées:', editedQuestions);
    setIsEditing(false);
  };

  const handleAddQuestions = () => {
    setEditedQuestions([...editedQuestions, ...newQuestions]);
    setNewQuestions([
      {
        id: '',
        question: '',
        answers: [
          {
            answer: '',
            correct_answer: false,
            id: '',
            questionId: '',
            questionnaryId: '',
          },
        ],
        index: 0, //TODO logique a mettre en place pour l'index
        questionnaryId: '',
      },
    ]);
    setIsAdding(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-blueDark p-6 rounded-lg shadow-lg w-9/12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Questions du questionnaire</h2>
        <div className="space-y-4 mb-6">
          {editedQuestions.length > 0 ? (
            editedQuestions.map((question, questionIndex) => (
              <div key={question.id} className="flex flex-col mb-6">
                <Label htmlFor="Questions">Question {questionIndex + 1}</Label>
                <InputShared
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                  disabled={!isEditing}
                  className={`input w-full rounded-lg mb-2 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                />
                <div className="grid grid-cols-2 gap-4">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex flex-col">
                      <Label htmlFor="Response">
                        Réponse {answerIndex + 1}
                      </Label>
                      <InputShared
                        value={answer.answer}
                        onChange={(e) =>
                          handleAnswerChange(
                            questionIndex,
                            answerIndex,
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className={`text-white ${!isEditing ? 'cursor-not-allowed' : ''}`}
                      />
                      <span
                        className={
                          answer.correct_answer
                            ? 'text-green-500'
                            : 'text-red-500'
                        }
                      >
                        {answer.correct_answer ? '(Correcte)' : '(Incorrecte)'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">
              Aucune question disponible pour ce questionnaire.
            </p>
          )}

          {isAdding &&
            newQuestions.map((question, index) => (
              <div key={index} className="flex flex-col mb-6">
                <Label htmlFor="Questions">Question</Label>
                <InputShared
                  value={question.question}
                  onChange={(e) =>
                    handleNewQuestionChange(index, 'question', e.target.value)
                  }
                />
                <Label htmlFor="Response">Réponses</Label>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex flex-col mb-2">
                    <Label htmlFor="Response index">
                      Réponse {answerIndex + 1}
                    </Label>
                    <InputShared
                      value={answer.answer}
                      onChange={(e) =>
                        handleNewAnswerChange(
                          index,
                          answerIndex,
                          'answer',
                          e.target.value
                        )
                      }
                    />
                    <Label htmlFor="Response correct or not">Correcte</Label>
                    <Select
                      name={`correct_answer_${index}_${answerIndex}`}
                      value={answer.correct_answer ? '1' : '0'}
                      onChange={(e: any) =>
                        handleNewAnswerChange(
                          index,
                          answerIndex,
                          'correct_answer',
                          e.target.value
                        )
                      }
                      options={options}
                      label="Réponse correcte"
                      placeholder="Sélectionnez Oui ou Non"
                    />
                  </div>
                ))}
                {newQuestions.length > 1 && (
                  <Button
                    onClick={() => handleRemoveNewQuestionField(index)}
                    className="bg-red-500 rounded-lg py-1 px-3 mt-2 flex items-center space-x-2"
                  >
                    <MdRemove /> <span>Supprimer</span>
                  </Button>
                )}
              </div>
            ))}
        </div>

        {isAdding && (
          <Button
            onClick={handleAddNewQuestionField}
            className="bg-blue-500 rounded-lg py-2 px-3 flex items-center space-x-2 mt-3"
          >
            <MdAdd />
            <span>Ajouter une autre question</span>
          </Button>
        )}

        <div className="flex justify-between mt-4">
          <CloseButton onClick={onClose} />

          {!isAdding && !isEditing && (
            <div className="flex flex-grow justify-center space-x-4">
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-green-500 rounded-lg py-2 px-4 flex items-center space-x-2"
              >
                <MdAdd />
                <span>Ajouter des questions</span>
              </Button>
            </div>
          )}

          {!isAdding && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 rounded-lg py-2 px-4"
            >
              Modifier
            </Button>
          )}

          {isEditing && (
            <Button
              onClick={handleValidate}
              className="bg-green-500 rounded-lg py-2 px-4"
            >
              Valider
            </Button>
          )}

          {isAdding && (
            <Button
              onClick={handleAddQuestions}
              className="bg-green-500 rounded-lg py-2 px-4"
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
