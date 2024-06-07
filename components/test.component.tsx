"use client";
import useAuth from '@/hooks/useAuth.hook';

export default function TestUser() {
  const { token, user } = useAuth();
  const isLogged = token !== null;

  return (
    <div>
      <p>Est connecté : {isLogged ? 'Oui' : 'Non'}</p>
      <p>Token : {token}</p>
      {user && (
        <>
          <p>ID : {user.id}</p>
          <p>Nom : {user.lastname}</p>
          <p>Prénom : {user.firstname}</p>
          <p>Pseudo : {user.pseudo}</p>
          <p>Email : {user.mail}</p>
          <p>Rôle : {user.roles}</p>
          <p>Pays : {user.country}</p>
          <p>Date de naissance : {user.birthday}</p>
          <p>Vérifié : {user.is_verified ? 'Oui' : 'Non'}</p>
        </>
      )}
    </div>
  );
}