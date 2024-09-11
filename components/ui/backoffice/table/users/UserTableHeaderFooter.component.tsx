// React Libs
import { FC, ReactNode } from 'react';

interface UserTableHeaderFooterProps {
  children: ReactNode;
}

const UserTableHeaderFooter: FC<UserTableHeaderFooterProps> = ({ children }) => (
  <>
    <thead>
      <tr className="text-lg text-center z-0">
        <th></th>
        <th>Nom et Prénom</th>
        <th>Pseudo</th>
        <th>Email</th>
        <th>Pdp</th>
        <th>Pays</th>
        <th>Date d'anniversaire</th>
        <th>Photo de profil</th>
        <th>Compte vérifié</th>
        <th>Compte restreint</th>
        <th>Rôle</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
    <tfoot>
      <tr className="text-lg text-center z-0">
        <th></th>
        <th>Nom et Prénom</th>
        <th>Pseudo</th>
        <th>Email</th>
        <th>Pdp</th>
        <th>Pays</th>
        <th>Date d'anniversaire</th>
        <th>Photo de profil</th>
        <th>Compte vérifié</th>
        <th>Compte restreint</th>
        <th>Rôle</th>
        <th>Actions</th>
      </tr>
    </tfoot>
  </>
);

export default UserTableHeaderFooter;