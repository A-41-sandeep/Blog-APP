import React from "react";
import { AppBar, Typography ,Toolbar} from "@mui/material";

const Header = () => {
  return (
    <AppBar sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(104,171,130,1) 83%, rgba(0,212,255,1) 100%);"}}>
      <Toolbar>
        <Typography>AppBar</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
