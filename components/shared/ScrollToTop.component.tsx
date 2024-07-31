'use client';

import { FaCircleArrowUp } from 'react-icons/fa6';

interface ScrollToTopButtonProps {
  showScrollToTop: boolean;
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showScrollToTop,
  scrollToTop,
}) => {
  if (!showScrollToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-button text-white p-2 rounded-full shadow-lg"
    >
      <FaCircleArrowUp size={30} />
    </button>
  );
};

export default ScrollToTopButton;
