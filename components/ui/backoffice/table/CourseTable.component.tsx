import { FC } from 'react';

interface CourseTableProps {
  token: string;
}

const CourseTable: FC<CourseTableProps> = ({ token }) => {
  // Vous pouvez ajouter votre logique ici, par exemple, récupérer des données de cours

  return (
    <div>
      {/* Remplacez ceci par votre tableau de cours */}
      <h2>Tableau des Cours</h2>
      <p>Token: {token}</p>
    </div>
  );
};

export default CourseTable;