import React, { useContext, useRef, useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import {
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  Switch,
  ClickAwayListener,
  Tooltip,
  Divider,
} from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AuthenticationContext } from '@tabtabgo/core/providers/AuthenticationProvider';
import { UserSettingsContext } from '@tabtabgo/core/contexts/UserSettingsContext';

import Avatar from '@material-ui/core/Avatar';
import FileService from '@tabtabgo/core/services/FileService';
import { getPersonInitials } from '@tabtabgo/core/Utilities';

//const RouterNavLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    buttonLink: {
      color: theme.palette.common.white,
      padding: 0,
      marginLeft: theme.spacing(1),
    },
    icon: { width: 20, height: 20, zIndex: 4 },
    menuItemLink: {
      backgroundColor: 'transparent',
      width: 'auto',
      '&:hover': {
        outline: 'none',
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        boxShadow: 'none',
      },
      '&,&:hover,&:focus': {
        color: 'inherit',
      },
      cursor: 'pointer',
      '& li': {
        marginTop: 8,
      },
    },
    menuItemIcon: {
      marginRight: theme.spacing(1),
    },
    avatarImg: {
      width: '100%',
      verticalAlign: 'middle',
      border: '0',
    },
    avatarLetters: {
      width: 40,
      verticalAlign: 'middle',
      border: '0',
      backgroundColor: theme.palette.secondary.main,
      fontSize: 'small',
      '&:hover,&:focus': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  }),
);

interface UserHeaderLinkProps {
  userRoutes: Array<any>;
}

export default function UserHeaderLink({ userRoutes }: UserHeaderLinkProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { user } = useContext(AuthenticationContext);
  const fileService = new FileService();

  const settingContext = useContext(UserSettingsContext);
  const [state, setState] = useState({
    showIds: settingContext.showIds,
  });
  useEffect(() => {
    setState({ showIds: settingContext.showIds });
  }, [settingContext.showIds]);
  const handleSettingChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
    settingContext.setSetting(name, event.target.checked);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (!user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div>
        <Tooltip id="tooltip-bottom" title={user.name} placement="left">
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className={classes.buttonLink}
          >
            {user.profile && user.profile.avatar ? (
              <Avatar
                src={fileService.getImageUrl(user.profile.avatar) ?? undefined}
                className={classes.avatarImg}
                alt="..."
              />
            ) : (
              <Avatar className={classes.avatarLetters}>
                {getPersonInitials({ person: user ? (user.profile ? user.profile : user) : {} })}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem style={{ marginBottom: 6 }}>
                      Show Ids
                      <Switch
                        checked={state.showIds}
                        onChange={handleSettingChange('showIds')}
                        value="showIds"
                        color="primary"
                        inputProps={{ 'aria-label': 'show Ids checkbox' }}
                      />
                    </MenuItem>
                    <Divider />
                    {userRoutes &&
                      userRoutes.map((route) => (
                        <NavLink to={route.path} className={classes.menuItemLink} key={route.name}>
                          <MenuItem>
                            {<route.icon className={classes.menuItemIcon} />} {route.name}
                          </MenuItem>
                        </NavLink>
                      ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
