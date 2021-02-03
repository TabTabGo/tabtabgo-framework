import {
  getWarningCardHeader,
  getSuccessCardHeader,
  getErrorCardHeader,
  getInfoCardHeader,
  getPrimaryCardHeader,
} from 'assets/jss/themeHelpers.jsx';

const cardTextStyle = (theme) => ({
  cardText: {
    float: 'none',
    display: 'inline-block',
    marginRight: '0',
    borderRadius: '3px',
    backgroundColor: '#999999',
    padding: '15px',
    marginTop: '-20px',
  },
  warningCardHeader: getWarningCardHeader(theme),
  sccessCardHeader: getSuccessCardHeader(theme),
  errorCardHeader: getErrorCardHeader(theme),
  infoCardHeader: getInfoCardHeader(theme),
  primaryCardHeader: getPrimaryCardHeader(theme),
});

export default cardTextStyle;
