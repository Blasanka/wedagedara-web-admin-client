import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteWarningDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClick = () => {
    props.handleRowClick();
    handleClose();
    props.handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ඉවත් කරනවද?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ම‌ෙම දත්තයන් නැවත ලබා ගැනීමට න‌ොහැකි බව කරුණිකව සලකන්න.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            නැත
          </Button>
          <Button onClick={handleClick} color="primary" autoFocus>
            ඹව්
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteWarningDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};
