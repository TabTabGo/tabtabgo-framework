import React from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';

interface WrapTextProps {
  text: string;
  maxLength?: number;
}

const useStyles = makeStyles((theme: any) => ({
  text: {
    whiteSpace: 'nowrap',
  },
  textWrap: {
    whiteSpace: 'normal'
  },
  tooltip: { fontSize: '0.875rem' },
}));

const WrapText = (props: WrapTextProps) => {
  const classes = useStyles();
  const { text, maxLength } = props;
  if (maxLength && text && text.length > maxLength) {
    return (
      <Tooltip
        title={text}
        arrow
        classes={{
          tooltip: classes.tooltip,
        }}
      >
        <span className={classes.text}>{text.substring(0, maxLength) + '...'}</span>
      </Tooltip>
    );
  }

  return <span className={`${classes.text} ${classes.textWrap}`}>{text || ''}</span>;
};

export default WrapText;
