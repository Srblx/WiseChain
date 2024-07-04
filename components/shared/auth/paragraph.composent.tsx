interface StepTextProps {
  children: React.ReactNode;
  onClick: () => void;
}

const StepText = ({ children, onClick }: StepTextProps) => (
  <p
    className={'text-button max-lg:text-xs mt-3 cursor-pointer'}
    onClick={onClick}
  >
    {children}
  </p>
);

export default StepText;
