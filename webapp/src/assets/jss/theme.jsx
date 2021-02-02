import { createMuiTheme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { hexToRgb } from 'ttg-identity/views/Users/node_modules/ttg-identity/pages/ResetPassword/node_modules/@tabtabgo/core/utilities';

import logo from 'assets/img/logo.png';
import logoWhite from 'assets/img/logo-white.png';

import mainPageImage from "assets/img/backgrounds/bg1.jpg";
//import sidebarImage from "assets/img/backgrounds/side_bg1.jpg";

import { grey } from '@material-ui/core/colors';

const primary = '#ea26c2';
let primaryRgb = hexToRgb(primary);

const getBoxShadow = (hexColor) => {
  let rgbColor = hexToRgb(hexColor);
  return {
    boxShadow: `0 12px 20px -10px rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`,
  };
};

const helperStyles = {
  flex: {
    display: 'flex',
  },
};

const baseStyles = {
  verticalContainer: {
    ...helperStyles.flex,
    flexDirection: 'column',
  },
  horizontalContainer: {
    ...helperStyles.flex,
  },
  boxedContainer: {
    ...helperStyles.flex,
    flexDirection: 'column',
    background: grey[100],
    padding: 12,
    margin: 8,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 4,
    border: 'none',
    '& table tr:nth-of-type(even)': {
      backgroundColor: '#e7e7e7'
    }
  },
};

export default createMuiTheme({
  typography: {},
  palette: {
    hexToRgb,
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primary,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: '#6a27d6',
      // dark: will be calculated from palette.secondary.main,
      //contrastText: "#ffcc00"
    },
    // error: will use the default color
    error: {
      light: '#ef5350',
      main: '#f44336',
      dark: '#e53935',
      //contrastText: "#ffcc00"
    },
    warning: {
      light: '#ffa726',
      main: '#ff9800',
      dark: '#fb8c00',
      //contrastText: "#ffcc00"
    },
    success: {
      light: '#66bb6a',
      main: '#4caf50',
      dark: '#43a047',
      //contrastText: "#ffcc00"
    },
    info: {
      light: '#26c6da',
      main: '#00acc1',
      dark: '#00acc1',
      //contrastText: "#ffcc00"
    },
    action: {
      active: 'rgba(0, 0, 0, 0.64)',
      hover: '#f6f0ff',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.14)',
      disabled: 'rgba(0, 0, 0, 0.20)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    sidebar: {
      background: '#373737',
      color: 'white',
      activeItem: { color: '#3C4858', background: 'white' },
    },
    pages: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      headerLinkTextColor: 'black',
      headerLinkActiveBackground: '#b5b5b569',
      headerLinkHoverBackground: '#96959569',
      footerLinkTextColor: 'black',
      footerWhite: false,
      light: {
        headerLinkTextColor: 'white',
        headerLinkActiveBackground: 'transparent',
        headerLinkHoverBackground: '#e2e2e269',
      },
    },
    background: {
      card: deepPurple[50],
      selectedCard: deepPurple[100],
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        '& button': {
          color: 'white',
        },
      },
    },
    MuiButton: {
      textPrimary: {
        color: primary,
      },
      outlinedPrimary: {
        color: primary,
      },
    },
    MuiFormLabel: {
      root: {
        color: primary,
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: `2px solid ${primary}`,
        },
        // '&$focused:after': {
        //   borderBottomColor: `#10678c`,
        // },
        // '&:hover:not($disabled):not($focused):not($error):after': {
        //   borderBottom: `2px solid #eee`,
        // },
        // '&$disabled:before': {
        //   borderBottom: `1px dotted #aaa`,
        // },
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: deepPurple[50],
        '&:hover': {
          backgroundColor: deepPurple[100],
        },
        '&.Mui-focused': {
          backgroundColor: deepPurple[100],
        },
      },
    },
    MuiOutlinedInput: {
      adornedEnd: {
        paddingRight: 4,
      },
    },
    MuiTableRow: {
      hover: {
        '&$hover:hover': {
          backgroundColor: deepPurple[50],
        },
      },
      root: {
        '&.Mui-selected': {
          backgroundColor: deepPurple[100],
        },
        '&:nth-of-type(even).Mui-selected': {
          backgroundColor: deepPurple[100],
        },
        '&:nth-of-type(even)': {
          backgroundColor: grey[50],
        },
      },
    },
    // MuiFormHelperText: {
    //   root: {
    //     marginBottom: -20
    //   }
    // }
    MUIRichTextEditor: {
      root: {},
      container: {
        margin: 0,
        background: grey[200],
        paddingBottom: 8,
        borderRadius: 4,
      },
      editor: {
        padding: 8,
        margin: 16,
        marginTop: 0,
        marginBottom: 8,
        background: 'white',
        borderRadius: 4,
        minHeight: 36,
      },
      placeHolder: {
        marginLeft: 20,
      },
    },
  },
  custom: {
    shadows: {
      getBoxShadow: getBoxShadow,
      appBarBoxShadow:
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      primary: `0 4px 10px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.8)`,
    },
    layout: {
      flex: {
        display: 'flex',
      },
      drawer: {
        width: 260,
        miniWidth: 80,
      },
    },
    media: {
      backgrounds: {
        loginPage: mainPageImage,
        mainPage: mainPageImage,
        sidebar: undefined,
      },
      logo: {
        login: undefined,
        mainPage: logoWhite,
        pages: logo,
      },
    },
    styles: {
      //Add Customer Dashboard Theme
      flex: {
        ...helperStyles.flex,
      },
      flexCol: {
        ...helperStyles.flex,
        flexDirection: 'column',
      },
      vMiddle: {
        alignItems: 'center',
      },
      hMiddle: {
        justifyContent: 'center',
      },
      hBetween: {
        justifyContent: 'space-between',
      },
      heading3: {
        fontSize: 16,
        marginRight: 12,
        marginBottom: 0,
        marginTop: 0,
        textAlign: 'left',
        fontWeight: 500,
      },
      rootContainer: {
        ...helperStyles.flex,
        width: '100%',
        //maxWidth: 1024,
        margin: 'auto',
      },
      boxedContainer: {
        ...baseStyles.boxedContainer,
      },
      inverseBoxedContainer: {
        ...baseStyles.boxedContainer,
        background: '#fff',
      },
      cardHeader: {
        ...baseStyles.horizontalContainer,
      },
      fullWidth: {
        width: '100%',
      },
      halfWidth: {
        width: '50%',
      },
      thirdWidth: {
        width: '33.333333333333%',
      },
    },
  },
});
