import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import sideBarItems from './SideBarItems';
import AppContext from '../contexts/AppContext';

function SideBarMenu() {

  let history = useHistory();

  const { sbOpen, setSbOpen } = useContext(AppContext);
  
  const handleDrawerClose = () => { setSbOpen(false) };
  const handleListItemClick = (path) => { history.push(path); handleDrawerClose() };

  return(
    <Drawer anchor="left" open={sbOpen} onClose={handleDrawerClose}>
      <List sx={{ width: '260px', paddingTop: '0' }}>
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