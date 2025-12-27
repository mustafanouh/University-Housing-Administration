
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCommentTwoToneIcon from '@mui/icons-material/AddCommentTwoTone';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

import SupportAgent from '@mui/icons-material/SupportAgent';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import { useThemeContext } from '../theme/themeContext';
import { useNavigateContext } from '../context/navigateContext';
import { useState } from 'react';
import MaintenanceRequestsTable from './admin/MaintenanceRequestsTable';
import { useAuthStore } from '../features/auth/auth.store';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `60px`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Drawer({ open, handleDrawerClose }) {

  const navigate = useNavigateContext();
  const theme = useTheme();

  const [selectedCard, setSelectedCard] = useState(null);

  const { mode, colors, primaryColor, language, toggleMode, changeColor, setLanguage } = useThemeContext();

 const {role}=  useAuthStore();
 const  employeeRoles =role;
 
//  const rolePermissions = {
//   Storage: [ "storageKeeper"], 
//   admin:["admin"],            
//   EmployeesManagement: ["itOffice"], 
//   Payments: [ "accountant"],       
//   MaintenanceRequestsTable: ["maintenanceService"],
//   AccommodationForm: ["mentor"]
// };

// const filteredMenuItems = menuItems.filter(item => {
//   const allowedRoles = rolePermissions[item.text];
//   if (!allowedRoles) return true; 
//   return employeeRoles.some(role => allowedRoles.includes(role));
// });

// filteredMenuItems.map(item => (
//   <MenuItem key={item.index} icon={item.icon} path={item.path}>
//     {item.text}
//   </MenuItem>
// ));


  const menuItems = [
    { index: 7, text: "MaintenanceRequestsTable", icon: <AssignmentIcon />, path: "/MaintenanceRequestsTable" },
    { index: 0, text: "Construction", icon: <ConstructionOutlinedIcon />, path: "/Construction" },
    { index: 1, text: "Employees Management", icon: <GroupIcon />, path: "/EmployeesManagement" },
    { index: 6, text: "AccommodationForm", icon: <AddCommentTwoToneIcon />, path: "/accommodation-form" },
    { index: 2, text: "Payments", icon: <PaymentsOutlinedIcon />, path: "/payments" },
    { index: 3, text: "Contact", icon: <SupportAgent />, path: "/Contact" },
    { index: 4, text: "Settings", icon: <SettingsOutlinedIcon />, path: "/Settings" },
    { index: 5, text: "Logout", icon: <LogoutOutlinedIcon />, path: "/logout" },
    { index: 8, text: "Units", icon: <ApartmentIcon />, path: "/Units" },
    { index: 9, text: "Storage", icon: <StorageIcon />, path: "/Storage" },

  ];

  return (
    <StyledDrawer
      variant="permanent"
      open={open}

      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: colors.primary,
          color: colors.text.primary,
        },
        position: open ? 'fixed' : 'block',
        zIndex: 1200,
       

      }
      }

    >

      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} sx={{ color: colors.iconPrimary, }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <Box sx={{
        mt: 2, mb: 2, mx: 'auto',


      }}>
        {open ? <>
          <Avatar sx={{ width: 45, height: 45, mx:"auto", fontWeight: "bold", border: "6px solid rgba(255,255,255,0.3)", }} >  U  </Avatar>
          <Typography sx={{ color: 'blue', mt: 1, textAlign: 'center', translate: -3 }}>Role</Typography>
          <Typography sx={{ color: colors.iconPrimary }} >{role}</Typography> </> :
          <Avatar sx={{ width: 30, height: 30, fontWeight: "bold", border: "3px solid rgba(255,255,255,0.3)" }}  > X  </Avatar>

        }


      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.index} disablePadding

          >
            <ListItemButton

              sx={{
                bgcolor: selectedCard === index ? "action.selected" : "",
                "&:hover": {
                  elevation: 24,
                  transform: "translateY(-4px)",
                 

                  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                },
                elevation: selectedCard === index ? 8 : 3,

              }}
              onClick={() => {
                navigate(item.path);
                setSelectedCard(selectedCard === index ? null : index)
              }}
            >

              <ListItemIcon
                sx={{ color: colors.iconPrimary }}
                title={item.text}
              >{item.icon}</ListItemIcon>
              {open && <ListItemText
                sx={{ color: colors.iconPrimary }}
                primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
