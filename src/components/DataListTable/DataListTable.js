import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from "@material-ui/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Paper from "@material-ui/core/Paper/Paper.js";
import Table from "components/Table/Table.js";

// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CircularProgress } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
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
  tableImg: {
    width: "35px",
    height: "35px",
    top: "0px",
    position: "relative",
    verticalAlign: "middle",
    marginRight: "6px",
    border: "1px solid black",
    borderRadius: "50%"
  },
  descImg: {
    width: "200px",
    top: "0px",
    border: "0"
  },
  progressIndicator: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: 10
  },
  label: {
    color: "#AAAAAA"
  }
};

class DataListTable extends React.Component {
  constructor() {
    super();
    this.state = { state: false, selectedData: null };
  }

  handleRowClick = (flag, singleDoc) => {
    this.setState({ state: flag, selectedData: singleDoc });
  };

  render() {
    const { tableHeders, dataList, isLoading, classes } = this.props;
    const tableData = dataList;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {this.state.state === true ? (
            <div>
              <Paper
                onClick={() =>
                  this.handleRowClick(false, this.state.selectedData)
                }
                className={classes.backButton}
              >
                <ArrowBackIcon className={classes.img} />
                අපස්සට යන්න
              </Paper>
              <Card>
                <CardHeader color="primary">
                  <div>නම: {this.state.selectedData.name}</div>
                </CardHeader>
                <CardBody>
                  {/* <p>{this.state.selectedData.name}</p> */}
                  <img
                    src={this.state.selectedData.imageUrl}
                    alt={this.state.selectedData.imageUrl}
                    className={classes.descImg}
                  />
                  <p>{this.state.selectedData.description}</p>
                  <p>{this.state.selectedData.phoneNumber}</p>
                  <p>{this.state.selectedData.location}</p>
                  <p>{this.state.selectedData.duration}</p>
                  {this.state.selectedData.cause && (
                    <div>
                      <p className={classes.label}>ර‌ෝගයට හ‌ේතුව</p>
                      <p>{this.state.selectedData.cause}</p>
                      <p className={classes.label}>ර‌ෝගයට පිළියම</p>
                      <p>{this.state.selectedData.solution}</p>
                      <p className={classes.label}>
                        සදා ගැනීම සදහා උවමනා උපකරණ
                      </p>
                      <p>{this.state.selectedData.medication_goods}</p>
                      <p className={classes.label}>බ‌ෙහ‌ෙත් සදා ගන්නා ආකාරය</p>
                      <p>{this.state.selectedData.prepare_method}</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  දැනට ඇතුලත් කර තිබෙන දත්තයන්
                </h4>
                <p className={classes.cardCategoryWhite}>
                  මෙම දත්තයන් වල විස්තර ලබා ගැනීම සදහා වගුවෙහි අවශ්‍ය තීරුව මත
                  ඔබන්න.
                </p>
              </CardHeader>
              {/* "ලිපිනය", */}
              <CardBody>
                {!isLoading ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={tableHeders}
                    tableData={tableData}
                    state={this.state.state}
                    handleRowClick={this.handleRowClick}
                  />
                ) : (
                  <div className={classes.progressIndicator}>
                    <CircularProgress />
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

DataListTable.propTypes = {
  tableHeders: PropTypes.array.isRequired,
  dataList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataListTable);
