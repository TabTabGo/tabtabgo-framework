import {
  getWarningCardHeader,
  getSuccessCardHeader,
  getErrorCardHeader,
  getInfoCardHeader,
  getPrimaryCardHeader,
} from 'assets/jss/themeHelpers.jsx';
const cardIconStyle = (theme) => ({
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      borderRadius: '3px',
      backgroundColor: '#999',
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader: getWarningCardHeader(theme),
  successCardHeader: getSuccessCardHeader(theme),
  errorCardHeader: getErrorCardHeader(theme),
  infoCardHeader: getInfoCardHeader(theme),
  primaryCardHeader: getPrimaryCardHeader(theme),
});

export default cardIconStyle;
