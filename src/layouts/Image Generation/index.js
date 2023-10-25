/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";


// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import ImageFeed from "examples/ImageFeed/ImageFeed";
// Data
import ImgGen from "examples/ImgGen/ImgGen";
import authorsTableData from "layouts/feed/data/authorsTableData";
import projectsTableData from "layouts/feed/data/projectsTableData";
import colors from 'assets/theme/base/colors.js';

function ImgGeneration() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
        <VuiBox mb={3}>
        <ImgGen></ImgGen>
      </VuiBox>
      
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ImgGeneration;
