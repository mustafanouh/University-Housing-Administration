import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Paper, Typography, Button } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { useNavigateContext } from "../../context/navigateContext";
export default function Logout() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigateContext();


  const [openLogOut, setOpenLogOut] = useState(true);




  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };
  const handleClose = () => {
    navigate(-1);
    setOpenLogOut(false);
  };

  return (
    <Box
      sx={{

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openLogOut}
        onClick={handleClose}
      >
        <Paper
          elevation={6}
          sx={{
            p: 6,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Logout
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4}>
            Are you sure you want to logout?
          </Typography>

          <Button
            variant="contained"
            color="success"
            style={{ width: '40%', marginRight: '10px' }}
            onClick={handleClose}
          >
            NO
          </Button>

          <Button
            variant="contained"
            color="error"
            style={{ width: '40%', marginRight: '10px' }}
            onClick={handleLogout}
          >
            Sure
          </Button>


        </Paper>

      </Backdrop>



    </Box>
  );
}
