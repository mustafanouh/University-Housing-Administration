
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



import { useThemeContext } from '../theme/themeContext';
import { useNavigateContext } from '../context/navigateContext';
import { useState } from 'react';



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



  const menuItems = [
    // { text: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/dashboard" },
    {index: 0, text: "Construction", icon: <ConstructionOutlinedIcon />, path: "/Construction" },
    {index: 1, text: "AccommodationForm", icon: <AddCommentTwoToneIcon />, path: "/accommodation-form" },
    {index: 2, text: "Payments", icon: <PaymentsOutlinedIcon />, path: "/payments" },
    {index: 3, text: "Contact", icon: <SupportAgent />, path: "/Contact" },
    {index: 4, text: "Settings", icon: <SettingsOutlinedIcon />, path: "/Settings" },
    {index: 5, text: "Logout", icon: <LogoutOutlinedIcon />, path: "/logout" },

  ];

  return (
    <StyledDrawer
      variant="permanent"
      open={open}

      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: colors.primary,
          color: colors.text.primary,
        }
      }}


    >

      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} sx={{ color: colors.iconPrimary }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <Box sx={{ mt: 2, mb: 2, mx: 'auto' }}>
        {open ? <>
          <Avatar sx={{ width: 45, height: 45 }} src="https://www.bing.com/images/search?view=detailV2&ccid=YMWun3M9&id=C665067D90D327C85D28E3054558B7FEDACF2A06&thid=OIP.YMWun3M9S7OKAiaGnHWFwgHaHw&mediaurl=https%3a%2f%2fcdn.pixabay.com%2fphoto%2f2015%2f12%2f22%2f04%2f00%2fphoto-1103596_640.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.60c5ae9f733d4bb38a0226869c7585c2%3frik%3dBirP2v63WEUF4w%26pid%3dImgRaw%26r%3d0&exph=640&expw=611&q=personal+img&FORM=IRPRST&ck=2D6A2CA494CB3F62849EB4FB6A0E6CE6&selectedIndex=0&itb=1&idpp=overlayview&ajaxhist=0&ajaxserp=0" />
          <Typography sx={{ color: 'blue', mt: 1, textAlign: 'center', translate: -3 }}>Role</Typography>
          <Typography sx={{ color: colors.iconPrimary }} >Student</Typography> </> :
          <Avatar sx={{ width: 30, height: 30 }} src="https://www.bing.com/images/search?view=detailV2&ccid=YMWun3M9&id=C665067D90D327C85D28E3054558B7FEDACF2A06&thid=OIP.YMWun3M9S7OKAiaGnHWFwgHaHw&mediaurl=https%3a%2f%2fcdn.pixabay.com%2fphoto%2f2015%2f12%2f22%2f04%2f00%2fphoto-1103596_640.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.60c5ae9f733d4bb38a0226869c7585c2%3frik%3dBirP2v63WEUF4w%26pid%3dImgRaw%26r%3d0&exph=640&expw=611&q=personal+img&FORM=IRPRST&ck=2D6A2CA494CB3F62849EB4FB6A0E6CE6&selectedIndex=0&itb=1&idpp=overlayview&ajaxhist=0&ajaxserp=0" />

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
