import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Box, Typography } from '@material-ui/core';
import { BoxedContainer } from '@tabtabgo/web/components/Containers';
import Account from '@material-ui/icons/AccountBox';
import { RecentView } from '@tabtabgo/core/contexts/UserSettingsContext';


const useStyles = makeStyles((theme: any) => ({
  flex: {
    ...theme.custom.styles.flex,
    ...theme.custom.styles.vMiddle,
    flexWrap: 'wrap',
  },
  heading3: {
    ...theme.custom.styles.heading3,
    marginTop: 16,
    textAlign: 'left',
    color: theme.palette.text.hint,
  },
  boxedContainer: {
    minWidth: 200,
    whiteSpace: 'nowrap',
    color: theme.palette.grey[800],
    background: theme.palette.background.card,
    '-webkit-transition': 'background-color 200ms linear',
    '-ms-transition': 'background-color 200ms linear',
    transition: 'background-color 200ms linear',
    marginLeft: 0,
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      '& $icon': {
        color: theme.palette.common.white,
      },
      boxShadow: theme.custom.shadows.primary,
    },
    border: 'none',
    marginRight: theme.spacing(1.5),
  },
  icon: { color: theme.palette.secondary.light },
}));

type RecentViewProps = RecentView & {};

// eslint-disable-next-line react/display-name
//const RouterLink:RefObject<HTMLAnchorElement> = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const getIcon = (classes: any, type: string) => {  
    return <Account className={classes.icon} />;  
};

const RecentViewCard = ({ type, path, id, name }: RecentViewProps) => {
  const classes = useStyles();
  //const { t } = useTranslation("information");

  return (
    <Link to={path}>
      <BoxedContainer className={classes.boxedContainer}>
        <Grid container justify="space-between">
          <Typography component="div" variant="body1">
            <Box fontWeight="fontWeightBold">{type}</Box>
          </Typography>
          <Typography component="div" variant="body1">
            {getIcon(classes, type)}
          </Typography>
        </Grid>
        <Grid container>
          <Typography component="div" variant="subtitle2">
            <Box>Customer #{id}</Box>
          </Typography>
        </Grid>
        <Grid container>
          <Typography component="div" variant="body1">
            <Box fontWeight="fontWeightBold">{name}</Box>
          </Typography>
        </Grid>
      </BoxedContainer>
    </Link>
  );
};

export default RecentViewCard;
