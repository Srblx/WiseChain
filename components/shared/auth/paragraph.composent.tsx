// Interfaces
import { StepTextProps } from '@/interfaces/auth/formStep.interface';

const StepText = ({ children, onClick }: StepTextProps) => (
  <p
    className={'text-button max-lg:text-xs mt-3 cursor-pointer'}
    onClick={onClick}
  >
    {children}
  </p>
);

export default StepText;
