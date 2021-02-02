//TTG THEMEING WORKAROUND
import theme from './theme';

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
};

const getContainer = (theme) => ({
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '95%',
  },
  [theme.breakpoints.up('md')]: {
    width: '940px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '1250px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '1450px',
  },
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
});

const getContentContainer = (theme) => ({
  paddingRight: '30px',
  paddingLeft: '30px',
  marginRight: 'auto',
  marginLeft: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '1250px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '1450px',
  },
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
});

const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: '6px',
  color: 'rgba(0, 0, 0, 0.87)',
  background: '#fff',
};

const defaultFont = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: '300',
  lineHeight: '1.5em',
};

const description = {
  color: '#999',
};

const getPrimaryBoxShadow = (theme) =>
  theme.custom.shadows.getBoxShadow(theme.palette.primary.main);
//const getSecondaryBoxShadow = theme => theme.custom.shadows.getBoxShadow(theme.palette.secondary.main);
const getInfoBoxShadow = (theme) => theme.custom.shadows.getBoxShadow(theme.palette.info.main);
const getSuccessBoxShadow = (theme) =>
  theme.custom.shadows.getBoxShadow(theme.palette.success.main);
const getWarningBoxShadow = (theme) =>
  theme.custom.shadows.getBoxShadow(theme.palette.warning.main);
const getErrorBoxShadow = (theme) => theme.custom.shadows.getBoxShadow(theme.palette.error.main);

// new card headers
const getWarningCardHeader = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
  ...getWarningBoxShadow(theme),
});
const getSuccessCardHeader = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
  ...getSuccessBoxShadow(theme),
});
const getErrorCardHeader = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
  ...getErrorBoxShadow(theme),
});
const getInfoCardHeader = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
  ...getInfoBoxShadow(theme),
});
const getPrimaryCardHeader = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
  ...getPrimaryBoxShadow(theme),
});

const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont,
};

const cardHeader = {
  margin: '-20px 15px 0',
  borderRadius: '3px',
  padding: '15px',
};

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
};

const tooltip = {
  padding: '10px 15px',
  minWidth: '130px',
  color: theme.palette.common.white,
  lineHeight: '1.7em',
  background: 'rgba(85,85,85,0.9)',
  border: 'none',
  borderRadius: '3px',
  opacity: '1!important',
  boxShadow:
    '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
  maxWidth: '200px',
  textAlign: 'center',
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  textShadow: 'none',
  textTransform: 'none',
  letterSpacing: 'normal',
  wordBreak: 'normal',
  wordSpacing: 'normal',
  wordWrap: 'normal',
  whiteSpace: 'normal',
  lineBreak: 'auto',
};

const title = {
  color: '#3C4858',
  textDecoration: 'none',
  fontWeight: '300',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  '& small': {
    color: '#777',
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1',
  },
};

const cardTitle = {
  ...title,
  marginTop: '0',
  marginBottom: '3px',
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto',
  },
};

const cardSubtitle = {
  marginTop: '-.375rem',
};

const cardLink = {
  '& + $cardLink': {
    marginLeft: '1.25rem',
  },
};

export {
  //variables
  transition,
  getContainer,
  getContentContainer,
  containerFluid,
  boxShadow,
  card,
  defaultFont,
  description,
  getPrimaryBoxShadow,
  getInfoBoxShadow,
  getSuccessBoxShadow,
  getWarningBoxShadow,
  getErrorBoxShadow,
  // new card header colors
  getWarningCardHeader,
  getSuccessCardHeader,
  getErrorCardHeader,
  getInfoCardHeader,
  getPrimaryCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  tooltip,
  title,
  cardTitle,
  cardSubtitle,
  cardLink,
};
