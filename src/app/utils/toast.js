import { toast } from 'react-toastify';

export function showToast(message, type) {
  return toast[type](message, {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  });
}