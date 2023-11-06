import React from 'react';
import { IconButton, Badge } from '@mui/material';
import Icon from "@mui/material/Icon";
import VuiTypography from "components/VuiTypography";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {FaCoins} from "react-icons/fa6";
import VuiBox from 'components/VuiBox'; // Assuming this is the correct import path
import { navbarIconButton} from "examples/Navbars/DashboardNavbar/styles";
const Credits = ({ credits }) => {
  return (
    // <IconButton size="large" edge="end" color="inherit" aria-label="credits">
    //   <VuiBox display="flex" alignItems="center">
    //     <MonetizationOnIcon />
    //     <VuiBox ml={1}>{credits}</VuiBox> {/* Margin left for spacing */}
    //   </VuiBox>
    // </IconButton>
    // <Link to="/authentication/sign-in">
    <IconButton sx={navbarIconButton} size="small">
    
     <FaCoins size="15px" color="black" />
    
    <VuiTypography
      variant="button"
      fontWeight="medium"
      color={ "white"}
    >
      {credits}
    </VuiTypography>
  </IconButton>
//   </Link>
  );
};

export default Credits;
