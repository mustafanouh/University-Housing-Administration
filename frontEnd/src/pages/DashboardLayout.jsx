import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Drawer from '../component/Drawer'; 
import Header from '../component/Header';

// header space
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout({ children }) {
  const [open, setOpen] = React.useState(false);
  

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);



  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />

      <Header open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main"  sx={{ flexGrow: 1, p: 3,bgcolor:'#639147' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
