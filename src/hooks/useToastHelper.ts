import {useToast} from 'react-native-toast-notifications';

export function useToastHelper() {
  const toast = useToast();
  const showSuccessToast = (message: string) => {
    toast.show(message, {
      type: 'success',
      placement: 'bottom',
      duration: 2000,
      offset: 30,
      animationType: 'zoom-in',
    });
  };

  const showErrorToast = (message: string) => {
    toast.show(message, {
      type: 'danger',
      placement: 'bottom',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in',
    });
  };

  const showNormalToast = (message: string) => {
    toast.show(message, {
      type: 'normal',
      placement: 'bottom',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in',
    });
  };

  return {showSuccessToast, showErrorToast, showNormalToast};
}
