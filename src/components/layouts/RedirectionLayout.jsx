import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIdentity } from '@astarx-studio/react-core/auth';

import LoadingLayout from './LoadingLayout';

const RedirectionLayout = () => {
  const navigate = useNavigate();
  const { identity } = useIdentity();

  useEffect(() => {
    if (identity.isLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  }, [identity, navigate]);

  return <LoadingLayout />;
};

export default RedirectionLayout;
