import CLIENT from '../_instance';

export const login = ({ principal, credential }, signal) => {
  return CLIENT.post('/auth/login', null, {
    signal,
    auth: {
      username: principal,
      password: credential,
    },
  });
};
