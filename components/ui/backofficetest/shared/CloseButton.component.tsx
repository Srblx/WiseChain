import { Button } from "@/components/shared/Button.components";
import { MdClose } from "react-icons/md";

interface CloseButtonProps {
    onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
    return (
        <Button
        className="bg-button rounded-lg py-2 px-3 inline-flex items-center"
        onClick={onClick}
      >
        <MdClose className="mr-2"/> Fermer
      </Button>
    );
}