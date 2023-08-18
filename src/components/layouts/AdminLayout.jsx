import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import { useAuthManager, useIdentity } from '@astarx-studio/react-core/auth';

const AdminLayout = () => {
  const navigate = useNavigate();

  const { identity } = useIdentity();
  const { unregister } = useAuthManager();

  useEffect(() => {
    if (!identity.isLoggedIn) {
      navigate('/');
    }
  }, [identity, navigate]);

  return (
    <BoxContainer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack width="auto">
        <Typography variant="body1">Logged in as {identity.username}</Typography>
        <Button variant="contained" onClick={() => unregister(identity)}>
          Logout
        </Button>
      </Stack>
    </BoxContainer>
  );
};

export default AdminLayout;
