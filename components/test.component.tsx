"use client";

import useLocalStorage from "@/hooks/useLocalStorage.hooks";
// import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";


export default function TestUser() {

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     const decodedToken = jwtDecode(storedToken);
  //     const currentTime = Date.now() / 1000;
  //     if (decodedToken.exp < currentTime) {
  //       localStorage.removeItem('token');
  //     } 
  //   }
  // }, []);
    const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setIsLogged(true);
        }
      }, []);

      console.log('localStorage : ', localStorage);

    return (
        <div>
        <p>Est connecté : {isLogged ? 'Oui' : 'Non'}</p>
        <p>Token : {token}</p>
        </div>
    )
}
