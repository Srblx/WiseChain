// Lib React

// Interfaces
import { StepTextProps } from "@/interfaces/formStep.interface";

const StepText = ({ children, onClick }: StepTextProps) => (
  <p className={'text-button max-lg:text-xs mt-3'} onClick={onClick}>
    {children}
  </p>
);

export default StepText;
