import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Grid, debounce, Box, LinearProgress, TextField } from '@mui/material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import { useAuthManager, useIdentity } from '@astarx-studio/react-core/auth';

import { ignoreCallback } from 'utilities/Placeholder';

import { login } from 'apis/auth';

const INPUT_NAME = {
  principal: 'NIK',
  credential: 'Password',
};

const LoginLayout = () => {
  const [formState, setFormState] = useState({
    principal: {
      value: '',
      error: null,
    },
    credential: {
      value: '',
      error: null,
    },
    submit: false,
  });

  const validate = useCallback((target, value) => {
    if (['principal', 'credential'].includes(target)) {
      if (value?.length === 0 || value === '') {
        return `${INPUT_NAME[target]} tidak boleh kosong!`;
      }
    }

    return null;
  }, []);

  const handleChange = useCallback(
    (target) =>
      debounce((evt) => {
        setFormState((p) => {
          return {
            ...p,
            [target]: {
              ...p[target],
              value: evt.target.value,
            },
          };
        });
      }, 300),
    []
  );

  const handleBlur = useCallback(
    (target) => (evt) => {
      setFormState((p) => {
        return {
          ...p,
          [target]: {
            ...p[target],
            error: validate(target, evt.target.value),
          },
        };
      });
    },
    [validate]
  );

  const { register } = useAuthManager();

  const handleSubmit = useCallback(() => {
    setFormState((p) => ({
      ...p,
      submit: true,
    }));
    login({
      principal: formState.principal.value,
      credential: formState.credential.value,
    })
      .then(({ data }) => {
        register({
          username: data.subject,
          metadata: {
            accessToken: data.accessToken,
          },
        });
      })
      .catch(ignoreCallback)
      .finally(() => {
        setFormState((p) => ({
          ...p,
          submit: false,
        }));
      });
  }, [formState, register]);

  const navigate = useNavigate();
  const { isLoggedIn } = useIdentity();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <BoxContainer fit="stretch-to-view" bgcolor="background.default" className="flex-center">
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ height: '100%', width: 'auto' }}>
        <Grid item>
          <Card sx={{ position: 'relative', width: 350, p: 3, pt: 5, pb: 5 }}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ minHeight: 'calc(100% + 8px)' }}>
              <Grid item alignSelf="stretch">
                <TextField
                  fullWidth
                  placeholder={INPUT_NAME.principal}
                  error={!!formState.principal.error}
                  onChange={handleChange('principal')}
                  onBlur={handleBlur('principal')}
                />
              </Grid>
              <Grid item alignSelf="stretch">
                <TextField
                  fullWidth
                  placeholder={INPUT_NAME.credential}
                  error={!!formState.credential.error}
                  onChange={handleChange('credential')}
                  onBlur={handleBlur('credential')}
                  type="password"
                />
              </Grid>
              <Grid item alignSelf="stretch" mt={1} mb={1}>
                <Button variant="contained" fullWidth size="large" color="primary" disabled={formState.submit} onClick={handleSubmit}>
                  Login
                </Button>
              </Grid>
            </Grid>
            {formState.submit && (
              <Box position="absolute" bottom={0} left={0} right={0}>
                <LinearProgress />
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

export default LoginLayout;
