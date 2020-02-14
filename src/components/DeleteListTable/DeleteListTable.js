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
import Table from "components/DeleteTable/DeleteTable.js";

// icons
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

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
  }
};

class DeleteListTable extends React.Component {
  constructor() {
    super();
    this.state = { state: false, tableData: [], selectedData: null };
  }

  handleRowClick = (flag, singleData) => {
    this.setState({
      state: flag,
      selectedData: singleData,
      isLoading: true
    });
    const deleteRoute = `/${this.props.submitType}/${singleData.id}`;
    console.log(deleteRoute);
    axios
      .delete(deleteRoute)
      .then(res => {
        if (res.data.message !== undefined) {
          this.setState({
            tableData: this.state.tableData.filter(
              (_, i) => i !== this.state.tableData.indexOf(singleData)
            ),
            isLoading: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.setState({
      tableData: this.props.dataList
    });
  }

  render() {
    const { tableHeders, isLoading, classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {
            <Card>
              <CardHeader color="warning">
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
                    tableHeaderColor="warning"
                    tableHead={tableHeders}
                    tableData={this.state.tableData}
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
          }
        </GridItem>
      </GridContainer>
    );
  }
}

DeleteListTable.propTypes = {
  tableHeders: PropTypes.array.isRequired,
  submitType: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteListTable);
