import { CircularProgress } from '@mui/material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';

export type LoadingLayoutProps = {
  fit?: 'stretch' | 'stretch-to-view';
};
const LoadingLayout = ({ fit = 'stretch-to-view' }: LoadingLayoutProps) => {
  return (
    <BoxContainer fit={fit} bgcolor="background.default" className="flex-center">
      <CircularProgress />
    </BoxContainer>
  );
};

export default LoadingLayout;
