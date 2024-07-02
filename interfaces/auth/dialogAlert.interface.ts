export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  infoMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
