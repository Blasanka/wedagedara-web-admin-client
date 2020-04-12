import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import HealingIcon from "@material-ui/icons/Healing";
import Person from "@material-ui/icons/Person";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { dailySalesChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import axios from "axios";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [statCounts, setStatCounts] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("/stats")
      .then(res => {
        setStatCounts(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                {/* <Icon>content_copy</Icon> */}
                <HealingIcon />
              </CardIcon>
              <p className={classes.cardCategory}>ර‌ෝගයන්</p>
              <h3 className={classes.cardTitle}>
                {isLoading ? (
                  <div className={classes.loadingHolder}></div>
                ) : (
                  `+${statCounts && statCounts.diseases}`
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="info">
                <Person />
              </CardIcon>
              <p className={classes.cardCategory}>වෙද මහතුන්</p>
              <h3 className={classes.cardTitle}>
                {isLoading ? (
                  <div className={classes.loadingHolder}></div>
                ) : (
                  `+${statCounts && statCounts.doctors}`
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                {/* <Icon>info_outline</Icon> */}
                <LocalDrinkIcon />
              </CardIcon>
              <p className={classes.cardCategory}>බෙහෙත් වර්ග</p>
              <h3 className={classes.cardTitle}>
                {isLoading ? (
                  <div className={classes.loadingHolder}></div>
                ) : (
                  `+${statCounts && statCounts.medication}`
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="success">
                <LocalHospitalIcon />
              </CardIcon>
              <p className={classes.cardCategory}>වෙද මැදුරු</p>
              <h3 className={classes.cardTitle}>
                {isLoading ? (
                  <div className={classes.loadingHolder}></div>
                ) : (
                  `+${statCounts && statCounts.places}`
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>යොමු කල වෙද මහතුන් ප්‍රමාණය</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                වර්දනයක්.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                යොමු කල බෙහෙත් වර්ග ප්‍රමාණය
              </h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                වර්දනයක්.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>යොමු කල වෙද මැදුරු ප්‍රමාණය</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                වර්දනයක්.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> අවසාන පැය 24 තුල
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
