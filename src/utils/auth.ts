export const checkToken = (): boolean => {
    return localStorage.getItem('authResponse') ? true : false;
  };