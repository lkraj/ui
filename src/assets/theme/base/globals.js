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

// Vision UI Dashboard React Base Styles
import colors from "assets/theme/base/colors";
import bgAdmin from "assets/images/body-background-w2.jpg";
import bgAdminMobile from "assets/images/hi.jpg"; // Add a mobile version of the background


const { info, dark } = colors;
export default {
  html: {
    scrollBehavior: "smooth",
    background: `url(${bgAdmin})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // backgroundPosition: "center center"
    "@media (max-width: 768px)": { // For tablets and smaller devices
      background: `url(${bgAdminMobile})` ,// Use a different background for smaller screens
      // backgroundAttachment: "fixed",
      // backgroundSize: "cover",
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    
    }
  },
  body: {
    // background: `url(${bgAdmin})`,
    // backgroundSize: "cover",
    background:"transparent"
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${info.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
};
