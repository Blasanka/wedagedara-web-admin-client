import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "../../assets/img/no_user.png";
// router
import { Link } from "react-router-dom";

//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "100vh",
    alignItems: "center",
    justifyItems: "center" /* adjusted */
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}></GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>පිටුවක පිරිසැලසුම</h6>
              <h4 className={classes.cardTitle}>ලොරෙම් ඉප්සම්</h4>
              <p className={classes.description}>
                බොහෝ ඩෙස්ක්ටොප් ප්‍රකාශන පැකේජ සහ වෙබ් පිටු සංස්කාරකවරු දැන්
                ඔවුන්ගේ පෙරනිමි ආකෘති පා as ය ලෙස ලෝරම් ඉප්සම් භාවිතා කරන අතර,
                'ලෝරම් ඉප්සම්' සෙවීම බොහෝ ළදරු අවධියේ තවමත් බොහෝ වෙබ් අඩවි
                අනාවරණය කර ගනු ඇත.
              </p>
              <Link to="/">
                <Button color="primary" round>
                  <ArrowBackIosIcon />
                  &nbsp; ආපස්සට යන්න
                </Button>
              </Link>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}></GridItem>
      </GridContainer>
    </div>
  );
}
