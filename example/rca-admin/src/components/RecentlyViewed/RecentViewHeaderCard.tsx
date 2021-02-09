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
    flexWrap: 'nowrap',
  },
  heading3: {
    ...theme.custom.styles.heading3,
    marginTop: 16,
    textAlign: 'left',
    color: theme.palette.text.hint,
  },
  boxedContainer: {
    border: '1px solid',
    borderColor: theme.palette.common.white,
    whiteSpace: 'nowrap',
    color: theme.palette.common.white,
    background: 'transparent',
    '-webkit-transition': 'background-color 200ms linear',
    '-ms-transition': 'background-color 200ms linear',
    transition: 'background-color 200ms linear',
    margin: 0,
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
      '& $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  item: { marginLeft: theme.spacing(0.5) },
  icon: { color: theme.palette.common.white, width: 18, height: 18 },
}));

interface RecentViewProps extends RecentView {
  className?: string;
}

// eslint-disable-next-line react/display-name
//const RouterLink:RefObject<HTMLAnchorElement> = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// TODO: refactor this to a helper so both normal and header recently viewed components can use it
const getIcon = (classes: any, type?: string) => {
  return <Account className={classes.icon} />;
};

const RecentViewHeaderCard = ({ type, path, id, name, className }: RecentViewProps) => {
  const classes = useStyles();
  //const { t } = useTranslation("information");

  return (
    <Link to={path}>
      <BoxedContainer className={classes.boxedContainer + ' ' + className}>
        <Grid container>
          {getIcon(classes, type)}
          <Typography component="span" variant="subtitle2">
            <Box className={classes.item} fontSize="0.8rem">
              {name}
            </Box>
          </Typography>
        </Grid>
      </BoxedContainer>
    </Link>
  );
};

export default RecentViewHeaderCard;
