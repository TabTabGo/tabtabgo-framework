import * as React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  rootContainer: {
    ...theme.custom.styles.rootContainer,
    //maxWidth: props => (props.isWide ? 1200 : 1024),
    flexDirection: (props: any) => (props.isCol ? 'column' : 'row'),
  },
  boxedContainer: theme.custom.styles.boxedContainer,
  inverseBoxedContainer: {
    ...theme.custom.styles.inverseBoxedContainer,
    background: theme.palette.common.white,
    marginLeft: 0,
    marginRight: 0,
    '& table tr:nth-of-type(even)': {
      backgroundColor: '#f2f2f2'
    }
  },
}));

type RootContainerProps = {
  children: any;
  isCol?: boolean;
  isWide?: boolean;
};

export const RootContainer = ({ children, isCol = false, isWide = false }: RootContainerProps) => {
  const classes = useStyles({ isCol, isWide });
  return <div className={classes.rootContainer}>{children}</div>;
};

type BoxedContainerProps = {
  children: any;
  className?: string;
  isCol?: boolean;
};

export const BoxedContainer = ({
  className = '',
  children,
  isCol = false,
}: BoxedContainerProps) => {
  const classes = useStyles();
  return <div className={className + ' ' + classes.boxedContainer}>{children}</div>;
};

type InverseBoxedContainerProps = {
  children: any;
  className?: string;
  width?: string;
  style?: React.CSSProperties;
};

export const InverseBoxedContainer = ({
  className = '',
  children,
  width,
  style,
}: InverseBoxedContainerProps) => {
  const classes = useStyles();
  return (
    <div
      className={className + ' ' + classes.inverseBoxedContainer}
      style={{
        ...style,
        width: width,
      }}
    >
      {children}
    </div>
  );
};
