import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.js";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  },
  backButton: {
    display: "block",
    position: "relative",
    verticalAlign: "middle",
    marginBottom: "10px",
    padding: "10px",
    color: "grey",
    "&:hover": {
      color: "black",
      cursor: "pointer"
    }
  },
  img: {
    width: "20px",
    top: "0px",
    position: "relative",
    verticalAlign: "middle",
    marginRight: "6px",
    border: "0"
  },
  screenCenter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    // transform: "translate(-50%, -50%)",
    padding: 10
  }
});

export default appStyle;
