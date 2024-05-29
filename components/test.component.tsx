"use client";

import useAuth from "@/hooks/useAuth.hooks";
// import jwtDecode from 'jwt-decode';


export default function TestUser() {

    const { token } = useAuth();
    const isLogged = token !== null;

    return (
        <div>
        <p>Est connecté : {isLogged ? 'Oui' : 'Non'}</p>
        <p>Token : {token}</p>
        </div>
    )
}
