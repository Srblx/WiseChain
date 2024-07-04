interface ButtonInconProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ButtonIcon: React.FC<ButtonInconProps> = ({
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
};
