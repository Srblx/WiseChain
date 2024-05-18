// Utils
import countries from '@/app/_utils/data/country';
import Button from '@/components/shared/auth/btn-submit.component';
import Input from '@/components/shared/auth/input.component';

// Libs React
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// Icons
import { FaBirthdayCake, FaUser, FaUserSecret } from 'react-icons/fa';
import { FaFlag, FaKey } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

export const inputClassName = 'input input-bordered flex items-center gap-2';

const FormSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [countriesOptions, setCountriesOptions] = useState<JSX.Element[]>([]);

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handlePseudoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const handleSubmitSingup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('firstname : ', firstname);
    console.log('Lastname : ', lastname);
    console.log('Pseudo : ', pseudo);
    console.log('Email :', email);
    console.log('Mot de passe :', password);
    console.log('Confime mot de passe : ', confirmPassword);
    console.log('Birthday : ', birthday);
    console.log('countries : ', countriesOptions);
  };

  useEffect(() => {
    if (countries) {
      const options = countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ));
      setCountriesOptions(options);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmitSingup}
      className="w-[90%] flex flex-col justify-center items-center"
    >
      <p className="text-tertiary text-xl mb-4">Inscription</p>
      <div className="grid grid-cols-2 w-full gap-4">
        <label className={inputClassName}>
          <FaUser />*
          <Input
            type="text"
            placeholder="Nom"
            value={firstname}
            onChange={handleFirstnameChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaUser />*
          <Input
            type="text"
            placeholder="Prénom"
            value={lastname}
            onChange={handleLastnameChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaUserSecret />*
          <Input
            type="text"
            placeholder="Pseudo"
            value={pseudo}
            onChange={handlePseudoChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <IoMdMail />*
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaKey />*
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaKey />*
          <Input
            type="password"
            placeholder="Confirmation mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaBirthdayCake />*
          <Input
            type="date"
            placeholder="DD/MM/YYYY"
            value={birthday}
            onChange={handleBirthdayChange}
            required
          />
        </label>
        <label className={inputClassName}>
          <FaFlag />
          <select
            name="country"
            id="country"
            className="w-full bg-background"
            value={countries}
            onChange={handleCountryChange}
          >
            <option value="">Sélectionnez un pays</option>
            {countriesOptions}
          </select>
        </label>
      </div>
      <p className="text-xs text-start w-full mt-2 mb-4 text-red-500">
        * Champ requis
      </p>
      <Button>S'inscrire</Button>
    </form>
  );
};

export default FormSignup;
