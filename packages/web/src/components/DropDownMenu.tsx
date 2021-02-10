import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/MoreVert';
import MenuIconHorizontal from '@material-ui/icons/MoreHoriz';

import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

type DropDownMenuProps = {
  menuItems: Array<any>;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  horizontal?: boolean;
  className?: string;
};

const DropDownMenu = ({
  menuItems,
  color = 'primary',
  horizontal = false,
  className = '',
}: DropDownMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <IconButton
        style={{ padding: 8, marginBottom: -4 }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        color={color}
        onClick={handleClick}
      >
        {(() => {
          if (horizontal) {
            return <MenuIconHorizontal />;
          } else {
            return <MenuIcon />;
          }
        })()}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => {
          if (!item.hide) {
            return (
              <div key={index}>
                <MenuItem
                  onClick={(e) => {
                    item.action();
                    handleClose(e);
                  }}
                  disabled={item.disabled}
                >
                  {item.label}
                </MenuItem>
                {(() => {
                  if (item.hasDivider) {
                    return <Divider />;
                  }
                  return null;
                })()}
              </div>
            );
          }
          return null;
        })}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
