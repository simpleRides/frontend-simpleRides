import Toast from 'react-native-toast-message';

export const showToast = (errorMessage) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: errorMessage,
  });
};

export const showSuccessToast = (successMessage) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: successMessage,
  });
};
