// ##############################
// // // Button styles
// #############################

import { hexToRgb } from '@tabtabgo/core/utilities';

const getButtonBoxShadow = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  return `0 2px 2px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14), 0 3px 1px -2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2), 0 1px 5px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
};

const getButtonFocusBoxShadow = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  return `0 14px 26px -12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
};

const buttonStyle = (theme) => {
  return {
    button: {
      minHeight: 'auto',
      minWidth: 'auto',
      backgroundColor: theme.palette.grey['400'],
      color: '#FFFFFF',
      boxShadow: getButtonBoxShadow(theme.palette.grey['400']),
      border: 'none',
      borderRadius: '3px',
      position: 'relative',
      padding: '12px 30px',
      margin: '.3125rem 1px',
      fontSize: '12px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '0',
      willChange: 'box-shadow, transform',
      transition:
        'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      lineHeight: '1.42857143',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      touchAction: 'manipulation',
      cursor: 'pointer',
      '&:hover,&:focus': {
        color: '#FFFFFF',
        backgroundColor: theme.palette.grey['400'],
        boxShadow: getButtonFocusBoxShadow(theme.palette.grey['400']),
      },
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        position: 'relative',
        display: 'inline-block',
        top: '0',
        marginTop: '-1em',
        marginBottom: '-1em',
        fontSize: '1.1rem',
        marginRight: '4px',
        verticalAlign: 'middle',
      },
      '& svg': {
        position: 'relative',
        display: 'inline-block',
        top: '0',
        width: '18px',
        height: '18px',
        marginRight: '4px',
        verticalAlign: 'middle',
      },
      '&$justIcon': {
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
          marginTop: '0px',
          position: 'absolute',
          width: '100%',
          transform: 'none',
          left: '0px',
          top: '0px',
          height: '100%',
          lineHeight: '41px',
          fontSize: '20px',
        },
      },
    },
    fullWidth: {
      width: '100%',
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: getButtonBoxShadow(theme.palette.primary.main),
      '&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: getButtonFocusBoxShadow(theme.palette.primary.main),
      },
    },
    info: {
      backgroundColor: theme.palette.info.main,
      boxShadow: getButtonBoxShadow(theme.palette.info.main),
      '&:hover,&:focus': {
        backgroundColor: theme.palette.info.main,
        boxShadow: getButtonFocusBoxShadow(theme.palette.info.main),
      },
    },
    success: {
      backgroundColor: theme.palette.success.main,
      boxShadow: getButtonBoxShadow(theme.palette.success.main),
      '&:hover,&:focus': {
        backgroundColor: theme.palette.success.main,
        boxShadow: getButtonFocusBoxShadow(theme.palette.success.main),
      },
    },
    warning: {
      backgroundColor: theme.palette.warning.main,
      boxShadow: getButtonBoxShadow(theme.palette.warning.main),
      '&:hover,&:focus': {
        backgroundColor: theme.palette.warning.main,
        boxShadow: getButtonFocusBoxShadow(theme.palette.warning.main),
      },
    },
    danger: {
      backgroundColor: theme.palette.error.main,
      boxShadow: getButtonBoxShadow(theme.palette.error.main),
      '&:hover,&:focus': {
        backgroundColor: theme.palette.error.main,
        boxShadow: getButtonFocusBoxShadow(theme.palette.error.main),
      },
    },
    white: {
      '&,&:focus,&:hover': {
        backgroundColor: '#FFFFFF',
        color: theme.palette.grey['400'],
      },
    },
    twitter: {
      backgroundColor: '#55acee',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#55acee'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#55acee',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#55acee'),
      },
    },
    facebook: {
      backgroundColor: '#3b5998',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#3b5998'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#3b5998',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#3b5998'),
      },
    },
    google: {
      backgroundColor: '#dd4b39',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#dd4b39'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#dd4b39',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#dd4b39'),
      },
    },
    linkedin: {
      backgroundColor: '#0976b4',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#0976b4'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#0976b4',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#0976b4'),
      },
    },
    pinterest: {
      backgroundColor: '#cc2127',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#cc2127'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#cc2127',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#cc2127'),
      },
    },
    youtube: {
      backgroundColor: '#e52d27',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#e52d27'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#e52d27',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#e52d27'),
      },
    },
    tumblr: {
      backgroundColor: '#35465c',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#35465c'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#35465c',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#35465c'),
      },
    },
    github: {
      backgroundColor: '#333333',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#333333'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#333333',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#333333'),
      },
    },
    behance: {
      backgroundColor: '#1769ff',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#1769ff'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#1769ff',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#1769ff'),
      },
    },
    dribbble: {
      backgroundColor: '#ea4c89',
      color: '#fff',
      boxShadow: getButtonBoxShadow('#ea4c89'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#ea4c89',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#ea4c89'),
      },
    },
    reddit: {
      backgroundColor: '#ff4500',
      color: ' #fff',
      boxShadow: getButtonBoxShadow('#ff4500'),
      '&:hover,&:focus,&:visited': {
        backgroundColor: '#ff4500',
        color: '#fff',
        boxShadow: getButtonFocusBoxShadow('#ff4500'),
      },
    },
    simple: {
      '&,&:focus,&:hover': {
        color: '#FFFFFF',
        background: 'transparent',
        boxShadow: 'none',
      },
      '&$primary': {
        '&,&:focus,&:hover,&:visited': {
          color: theme.palette.primary.main,
        },
      },
      '&$info': {
        '&,&:focus,&:hover,&:visited': {
          color: theme.palette.info.main,
        },
      },
      '&$success': {
        '&,&:focus,&:hover,&:visited': {
          color: theme.palette.success.main,
        },
      },
      '&$warning': {
        '&,&:focus,&:hover,&:visited': {
          color: theme.palette.warning.main,
        },
      },
      '&$danger': {
        '&,&:focus,&:hover,&:visited': {
          color: theme.palette.error.main,
        },
      },
      '&$twitter': {
        '&,&:focus,&:hover,&:visited': {
          color: '#55acee',
        },
      },
      '&$facebook': {
        '&,&:focus,&:hover,&:visited': {
          color: '#3b5998',
        },
      },
      '&$google': {
        '&,&:focus,&:hover,&:visited': {
          color: '#dd4b39',
        },
      },
      '&$linkedin': {
        '&,&:focus,&:hover,&:visited': {
          color: '#0976b4',
        },
      },
      '&$pinterest': {
        '&,&:focus,&:hover,&:visited': {
          color: '#cc2127',
        },
      },
      '&$youtube': {
        '&,&:focus,&:hover,&:visited': {
          color: '#e52d27',
        },
      },
      '&$tumblr': {
        '&,&:focus,&:hover,&:visited': {
          color: '#35465c',
        },
      },
      '&$github': {
        '&,&:focus,&:hover,&:visited': {
          color: '#333333',
        },
      },
      '&$behance': {
        '&,&:focus,&:hover,&:visited': {
          color: '#1769ff',
        },
      },
      '&$dribbble': {
        '&,&:focus,&:hover,&:visited': {
          color: '#ea4c89',
        },
      },
      '&$reddit': {
        '&,&:focus,&:hover,&:visited': {
          color: '#ff4500',
        },
      },
    },
    transparent: {
      '&,&:focus,&:hover': {
        color: 'inherit',
        background: 'transparent',
        boxShadow: 'none',
      },
    },
    disabled: {
      opacity: '0.65',
      pointerEvents: 'none',
    },
    lg: {
      padding: '1.125rem 2.25rem',
      fontSize: '0.875rem',
      lineHeight: '1.333333',
      borderRadius: '0.2rem',
    },
    sm: {
      padding: '0.40625rem 1.25rem',
      fontSize: '0.6875rem',
      lineHeight: '1.5',
      borderRadius: '0.2rem',
    },
    round: {
      borderRadius: '30px',
    },
    block: {
      width: '100% !important',
    },
    link: {
      '&,&:hover,&:focus': {
        backgroundColor: 'transparent',
        color: '#999999',
        boxShadow: 'none',
      },
    },
    justIcon: {
      paddingLeft: '12px',
      paddingRight: '12px',
      fontSize: '20px',
      height: '41px',
      minWidth: '41px',
      width: '41px',
      '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
        marginRight: '0px',
      },
      '&$lg': {
        height: '57px',
        minWidth: '57px',
        width: '57px',
        lineHeight: '56px',
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
          fontSize: '32px',
          lineHeight: '56px',
        },
        '& svg': {
          width: '32px',
          height: '32px',
        },
      },
      '&$sm': {
        height: '30px',
        minWidth: '30px',
        width: '30px',
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
          fontSize: '17px',
          lineHeight: '29px',
        },
        '& svg': {
          width: '17px',
          height: '17px',
        },
      },
    },
  };
};

export default buttonStyle;
