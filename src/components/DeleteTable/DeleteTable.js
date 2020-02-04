import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/DeleteTableStyle.js";

// Delete icon
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(styles);

function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, handleRowClick } = props; // state,

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((data, key) => {
            return (
              <TableRow
                key={key}
                className={classes.tableBodyRow}
                hover
                onClick={() => handleRowClick(true, data)}
              >
                {data.id !== undefined && <TableCell>{data.id}</TableCell>}
                {data.name !== undefined && <TableCell>{data.name}</TableCell>}
                {data.location !== undefined && (
                  <TableCell>{data.location}</TableCell>
                )}
                {data.duration !== undefined && (
                  <TableCell>{data.duration}</TableCell>
                )}
                <TableCell>
                  <DeleteIcon className={classes.deleteIcon} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  history: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired
};

export default withRouter(CustomTable);
