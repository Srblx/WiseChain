import { toast } from 'sonner';

export const notifySucces = (message: string) => {
  return toast.success(message);
};

export const notifyError = (message: string) => {
    return toast.error(message);
  };