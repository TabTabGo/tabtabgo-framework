import { createMuiTheme } from '@material-ui/core';
import theme from './theme';

export default createMuiTheme({
  ...theme,
  palette: {
    type: 'dark',
  },
});
