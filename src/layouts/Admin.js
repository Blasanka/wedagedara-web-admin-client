import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import routes from "routes.js";

import axios from "axios";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// icons
import { CircularProgress } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper/Paper.js";

import bgImage from "assets/img/bg-img.jpg";
import logo from "assets/img/no_user.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage); //, setImage
  const [color] = React.useState("blue"); // , setColor
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchViewOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isDetailView, setDetailView] = React.useState(false);
  const [singleResult, setSingleResult] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const toggleSearchViewOpen = text => {
    setSearchViewOpen(true);
    setIsLoading(true);
    axios
      .get(`/search/${text}`)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.data);
          setSearchResult(res.data);
        } else {
          console.log(res.error);
        }
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText="ව‌ෙද ග‌ෙදර"
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          searchAction={toggleSearchViewOpen}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {searchOpen ? (
          isDetailView ? (
            <div className={classes.content}>
              <Paper
                onClick={() => setDetailView(false)}
                className={classes.backButton}
              >
                <ArrowBackIcon className={classes.img} />
                අපස්සට යන්න
              </Paper>
              <Card>
                <CardBody>
                  <div>නම: {singleResult.name}</div>
                  <img
                    src={singleResult.image_url}
                    alt={singleResult.image_url}
                    className={classes.descImg}
                  />
                  <p>{singleResult.description}</p>
                  <p>{singleResult.phone_number}</p>
                  <p>{singleResult.location}</p>
                  <p>{singleResult.duration}</p>
                  {singleResult.cause && (
                    <div>
                      <p className={classes.label}>ර‌ෝගයට හ‌ේතුව</p>
                      <p>{singleResult.cause}</p>
                      <p className={classes.label}>ර‌ෝගයට පිළියම</p>
                      <p>{singleResult.solution}</p>
                      <p className={classes.label}>
                        සදා ගැනීම සදහා උවමනා උපකරණ
                      </p>
                      <p>{singleResult.medication_goods}</p>
                      <p className={classes.label}>බ‌ෙහ‌ෙත් සදා ගන්නා ආකාරය</p>
                      <p>{singleResult.prepare_method}</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className={classes.content}>
              <Paper
                onClick={() => {
                  setSearchViewOpen(false);
                }}
                className={classes.backButton}
              >
                <ArrowBackIcon className={classes.img} />
                අපස්සට යන්න
              </Paper>
              <div className={classes.container}>
                <GridContainer>
                  {!isLoading ? (
                    searchResult.length === 0 || error !== null ? (
                      <div className={classes.screenCenter}>
                        <p>No data found</p>
                      </div>
                    ) : (
                      <GridItem xs={12} sm={12} md={12}>
                        {searchResult.map(result => (
                          <Card
                            key={result.id}
                            onClick={() => {
                              setSingleResult(result);
                              setDetailView(true);
                            }}
                          >
                            <CardBody>
                              <h4>{result.name}</h4>
                              <p>{result.description}</p>
                              {result.location && <p>{result.location}</p>}
                              {result.duration && <p>{result.duration}</p>}
                            </CardBody>
                          </Card>
                        ))}
                      </GridItem>
                    )
                  ) : (
                    <CircularProgress className={classes.screenCenter} />
                  )}
                </GridContainer>
              </div>
            </div>
          )
        ) : getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
