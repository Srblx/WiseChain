import FormResetPassword from '@/components/ui/auth/FormResetPassword.component';

const ResetPassword = () => {
  return (
    <div>
      <h2 className="text-center text-2xl uppercase">
        Réinitialiser le mot de passe
      </h2>
      <FormResetPassword />
    </div>
  );
};

export default ResetPassword;
