import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalCarWash from '@mui/icons-material/LocalCarWash';
import Home from '@mui/icons-material/Home';
import Inventory from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import { Opacity } from '@mui/icons-material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import HotelIcon from '@mui/icons-material/Hotel';
import PersonIcon from '@mui/icons-material/Person';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();

  const handleIslemNavigation = () => {
    navigate('/islemler');
  };

  const handlePersonelNavigation = () => {
    navigate('/personel');
  };
  const handleHomeNavigation = () => {
    navigate('/home');
  };
  const handleAracIslemNavigation = () => {
    navigate('/aracislemler');
  };

  const handleEnvanterNavigation = () => {
    navigate('/envanter');
  };

  const handleLastikOtelNavigation = () => {
    navigate('/lastikotel');
  };
  const handleUcretliOtoparkNavigation = () => {
    navigate('/ucretliotopark');
  };


  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

      <ListItem key="homeTab" disablePadding>
          <ListItemButton   onClick={handleHomeNavigation}>
            <ListItemIcon>
              <Home /> 
            </ListItemIcon>
            <ListItemText primary="Anasayfa" />
          </ListItemButton>
        </ListItem>


       <ListItem key="islemTab" disablePadding>
          <ListItemButton  onClick={handleIslemNavigation}>
            <ListItemIcon>
              <LocalCarWash /> 
            </ListItemIcon>
            <ListItemText primary="İşlemler" />
          </ListItemButton>
        </ListItem>

        <ListItem key="personelTab" disablePadding>
          <ListItemButton  onClick={handlePersonelNavigation}>
            <ListItemIcon>
              <PersonIcon /> 
            </ListItemIcon>
            <ListItemText primary="Personel" />
          </ListItemButton>
        </ListItem>

        <ListItem key="aracIslemTab" disablePadding>
          <ListItemButton onClick={handleAracIslemNavigation}>
            <ListItemIcon>
              <CarRepairIcon /> 
            </ListItemIcon>
            <ListItemText primary="Araç İşlemler" />
          </ListItemButton>
        </ListItem>

        <ListItem key="envanterTab" disablePadding>
          <ListItemButton onClick={handleEnvanterNavigation}>
            <ListItemIcon>
              <Inventory /> 
            </ListItemIcon>
            <ListItemText primary="Envanter" />
          </ListItemButton>
        </ListItem>

        <ListItem key="lastikOtelTab" disablePadding>
          <ListItemButton onClick={handleLastikOtelNavigation}>
            <ListItemIcon>
              <HotelIcon /> 
            </ListItemIcon>
            <ListItemText primary="Lastik Otel" />
          </ListItemButton>
        </ListItem>

        <ListItem key="ucretliOtoparkTab" disablePadding>
          <ListItemButton onClick={handleUcretliOtoparkNavigation}>
            <ListItemIcon>
              <LocalParkingIcon /> 
            </ListItemIcon>
            <ListItemText primary="Ucretli Otopark" />
          </ListItemButton>
        </ListItem>
        
      </List>


    
      <Divider />
      
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}>   <i className="fa fa-bars fa-3x" aria-hidden="true" style={ { color: '#2b2a29', opacity: 1  }}></i>        </Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}

export default TemporaryDrawer;

