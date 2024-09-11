// React Libs
import { FC, ReactNode } from 'react';

interface CourseTableHeaderFooterProps {
  children: ReactNode;
}

const CourseTableHeaderFooter: FC<CourseTableHeaderFooterProps> = ({ children }) => (
  <>
    <thead>
      <tr className="text-lg text-center z-0">
        <th></th>
        <th>Titre du cours</th>
        <th>Description du cours</th>
        <th>Contenu du cours</th>
        <th>Séquences</th>
        <th>Catégorie</th>
        <th>Image</th>
        <th>Difficulté</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
    <tfoot>
      <tr className="text-lg text-center">
        <th></th>
        <th>Titre du cours</th>
        <th>Description du cours</th>
        <th>Contenu du cours</th>
        <th>Séquences</th>
        <th>Catégorie</th>
        <th>Image</th>
        <th>Difficulté</th>
        <th>Actions</th>
      </tr>
    </tfoot>
  </>
);

export default CourseTableHeaderFooter;
