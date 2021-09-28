import React from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import sideBarItems from './SideBarItems';

function SideBarMenu() {

  let history = useHistory();

  const handleListItemClick = (path) => { history.push(path) };

  return(
    <Drawer anchor="left" open={true}>
      <List sx={{ width: '240px' }}>
        {sideBarItems.map((item, index) => (
          <ListItem key={`li-${index}`} onClick={() => handleListItemClick(item.path)} button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideBarMenu;