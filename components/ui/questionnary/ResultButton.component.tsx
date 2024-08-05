// Components
import { Button } from '@/components/shared/Button.components';

// Libs React
import React from 'react';

interface NavigationButtonsProps {
  onReturnToCourses: () => void;
  onClaim: () => void;
  claimDisabled?: boolean;
}

const NavigationAfterResultButtons: React.FC<NavigationButtonsProps> = ({
  onReturnToCourses,
  onClaim,
  claimDisabled = false,
}) => (
  <div className="flex justify-around mt-10">
    <Button
      id="back-to-courses-after-questionnary"
      onClick={onReturnToCourses}
      className="rounded-full bg-button text-white py-2 px-5 md:py-4 md:px-10"
    >
      Retourner aux cours
    </Button>
    <Button
      onClick={onClaim}
      disabled={claimDisabled}
      className={`rounded-full bg-button text-white py-4 px-10 ${claimDisabled ? 'opacity-25' : ''}`}
    >
      Claim
    </Button>
  </div>
);

export default NavigationAfterResultButtons;
