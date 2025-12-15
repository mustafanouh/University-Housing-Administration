// material ui
import { styled, alpha } from '@mui/material/styles';
import {
    Toolbar, Typography, IconButton, Box, Badge,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

// search
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('xs')]: {
            width: '0ch',
            '&:focus': {
                width: '15ch',
            },
        },
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

// appbar
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header({ open, handleDrawerOpen }) {
    const [count, setCount] = useState(4);
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left Section: Menu + Title */}
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            { marginRight: 5, color: "inherit" },
                            open && { display: { xs: 'block', sm: 'none' } }, // Show menu only when drawer is closed on small screens
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div" sx={{ 
                        display: { xs: 'none', sm: 'block' } // Hide title on very small screens if needed
                    }}>
                        University Housing Administration
                    </Typography>
                </Box>

                {/* Center: Search Bar - Responsive */}
                <Search sx={{
                    display: { xs: 'none', sm: 'flex' }, // Hide search on xs, show from sm+
                    flexGrow: { md: 1 },
                    maxWidth: { md: 500 },
                    mx: { md: 4 },
                }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                {/* Right Section: Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Mobile Search Icon (visible only on xs) */}
                    <IconButton sx={{ display: { xs: 'flex', sm: 'none' }, color: 'inherit' }}>
                        <SearchIcon />
                    </IconButton>

                    <Badge badgeContent={count} color="secondary" sx={{ mx: 1 }}>
                        <NotificationsNoneOutlinedIcon
                            onClick={() => navigate("/notifications")}
                            sx={{ cursor: "pointer", fontSize: 28 }}
                        />
                    </Badge>

                    <AccountCircleOutlinedIcon
                        onClick={() => navigate("/account")}
                        sx={{ cursor: "pointer", fontSize: 28, mx: 1 }}
                    />

                    <SettingsOutlinedIcon
                        onClick={() => navigate("/settings")}
                        sx={{ cursor: "pointer", fontSize: 28, mx: 1 }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}