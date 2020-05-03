import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

//assets
import noUser from "../../assets/img/no_user.png";

// my components
import MyButton from "components/MyButton/MyButton.js";
import EditMarkerMap from "./EditMarkerMap.js";

// icons
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

// MUI colors
import { green } from "@material-ui/core/colors";

//clxs for snackbar
import clsx from "clsx";

import axios from "axios";

//validation
import { validateFormData } from "../../util/validator";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  imageWrapper: {
    textAlign: "left",
    position: "relative",
    changeImageButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  },
  profileImage: {
    width: 60,
    height: 60,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "10%",
    marginLeft: 6,
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      description: "",
      image_url: "",
      location: "",
      phone_number: "",
      duration: "",
      marker_location: {},
      errors: {},
      loading: false,
      snackBarOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.selectedData.id,
      name: this.props.selectedData.name,
      description: this.props.selectedData.description,
      image_url: this.props.selectedData.image_url,
      location: this.props.selectedData.location,
      phone_number: this.props.selectedData.phone_number,
      duration: this.props.selectedData.duration,
      prepare_method: this.props.selectedData.prepare_method,
      solution: this.props.selectedData.solution,
      medication_goods: this.props.selectedData.medication_goods,
      cause: this.props.selectedData.cause,
    });
  }

  getMarkers = (loc) => {
    this.setState({
      markerLocation: loc,
    });
    console.log(`Markers received to AddForm lat: ${loc.lat} lng: ${loc.lng}`);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newDataObject = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      image_url: this.state.image_url,
      search_name: this.state.name,
    };

    // this.addFieldsToNewObject(newDataObject);
    const fieldTypes = this.props.textFieldsTypes;
    if (fieldTypes.indexOf("location") !== -1) {
      newDataObject.location = this.state.location;
      newDataObject.search_location = this.state.location;
    }

    if (fieldTypes.indexOf("phone_number") !== -1)
      newDataObject.phone_number = this.state.phone_number;

    if (fieldTypes.indexOf("duration") !== -1) {
      newDataObject.duration = this.state.duration;
      newDataObject.search_duration = this.state.duration;
    }

    if (fieldTypes.indexOf("cause") !== -1) {
      newDataObject.cause = this.state.cause;
      newDataObject.search_cause = this.state.cause;
    }

    if (fieldTypes.indexOf("solution") !== -1) {
      newDataObject.solution = this.state.solution;
    }

    if (fieldTypes.indexOf("medication_goods") !== -1) {
      newDataObject.medication_goods = this.state.medication_goods;
    }

    if (fieldTypes.indexOf("prepare_method") !== -1) {
      newDataObject.prepare_method = this.state.prepare_method;
    }

    if (
      fieldTypes.indexOf("marker_location") !== -1 &&
      this.state.markerLocation !== undefined
    ) {
      newDataObject.latitude = this.state.markerLocation.lat;
      newDataObject.longitude = this.state.markerLocation.lng;
    }

    const validity = validateFormData(newDataObject);
    if (validity.valid) {
      this.setState({
        loading: true,
        errors: {},
      });

      const submitRoute = `/${this.props.submitType}/${this.state.id}`;
      console.log(submitRoute);

      axios
        .put(submitRoute, newDataObject)
        .then((res) => {
          this.setState({
            loading: false,
            // snackBarOpen: true
          });
          console.log(`successfully submitted: status code: ${res.status}`);
        })
        .catch((err) => {
          this.setState({
            loading: false,
            errors: err.response !== undefined ? err.response.data : {},
          });
          console.error(
            `Could not submit filled data. Please try again! ${err.status}`
          );
        });
    } else {
      this.setState({
        errors: validity.errors,
        loading: validity.valid,
      });
    }
  };

  handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ image_url: e.target.result });
      };
      const image = event.target.files[0];
      reader.readAsDataURL(image);
      // send image to server
      const formData = new FormData();
      formData.append("image", image, image.name);
      const submitRoute = `/${this.props.submitType}/image`;
      axios
        .post(submitRoute, formData)
        .then((res) => {
          this.setState({ image_url: res.data.image_url });
        })
        .catch((err) => console.error(err));
    }
  };

  clearForm = () => {
    this.setState({
      id: "",
      name: "",
      description: "",
      image_url: "",
      location: "",
      phone_number: "",
      duration: "",
      errors: {},
      loading: false,
      snackBarOpen: false,
      marker_location: {},
    });
  };

  handleAddPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSnackBarClick = () => {
    this.setState({
      snackBarOpen: true,
    });
  };

  handleSnackBarClose = () => {
    this.setState({
      ...this.state,
      snackBarOpen: false,
    });
  };
  render() {
    const { classes, cardSubHeader, textFieldsTypes } = this.props;
    const errors = this.state.errors;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form noValidate onSubmit={this.handleSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>ව‌ෙනස් කන්න</h4>
                <p className={classes.cardCategoryWhite}>{cardSubHeader}</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {textFieldsTypes.indexOf("image_url") !== -1 && (
                      <div className={classes.imageWrapper}>
                        <img
                          src={
                            this.state.image_url ? this.state.image_url : noUser
                          }
                          alt="රුපය"
                          className={classes.profileImage}
                        />
                        <input
                          type="file"
                          name="imageInput"
                          id="imageInput"
                          hidden="hidden"
                          onChange={this.handleImageChange}
                        />
                        <MyButton
                          tip="රුපයක් ඇතුලත් කරන්න"
                          color="primary"
                          onClick={this.handleAddPicture}
                          btnClassName={classes.changeImageButton}
                        >
                          <AddAPhotoIcon color="primary" />
                          {errors.image_url && (
                            <Typography
                              variant="body2"
                              className={classes.customError}
                            >
                              {`Image ${errors.image_url}`}
                            </Typography>
                          )}
                        </MyButton>
                      </div>
                    )}
                    {textFieldsTypes.indexOf("name") !== -1 && (
                      <TextField
                        id="name"
                        name="name"
                        label="නම"
                        style={{ margin: 8 }}
                        placeholder="නම ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.name}
                        error={errors.name ? true : false}
                        className={classes.textField}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("location") !== -1 && (
                      <TextField
                        id="location"
                        name="location"
                        label="ස්ථානය"
                        style={{ margin: 8 }}
                        placeholder="ස්ථානය ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.location}
                        error={errors.location ? true : false}
                        className={classes.textField}
                        type="text"
                        value={this.state.location}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("phone_number") !== -1 && (
                      <TextField
                        id="phone_number"
                        name="phone_number"
                        label="දුරකථන අංකය"
                        style={{ margin: 8 }}
                        placeholder="දුරකථන අංකය ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.phone_number}
                        error={errors.phone_number ? true : false}
                        className={classes.textField}
                        type="text"
                        value={this.state.phone_number}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("duration") !== -1 && (
                      <TextField
                        id="duration"
                        name="duration"
                        label="දුර"
                        style={{ margin: 8 }}
                        placeholder="දුර ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.duration}
                        error={errors.duration ? true : false}
                        className={classes.textField}
                        type="text"
                        value={this.state.duration}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("description") !== -1 && (
                      <TextField
                        id="description"
                        name="description"
                        label="විස්තරය"
                        style={{ margin: 8 }}
                        placeholder="විස්තර ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.description}
                        error={errors.description ? true : false}
                        className={classes.textField}
                        type="text"
                        multiline
                        rows="4"
                        value={this.state.description}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("cause") !== -1 && (
                      <TextField
                        id="cause"
                        name="cause"
                        label="ර‌ෝගයට හ‌ේතුව"
                        style={{ margin: 8 }}
                        placeholder="හ‌ේතුව ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.cause}
                        error={errors.cause ? true : false}
                        className={classes.textField}
                        type="text"
                        multiline
                        rows="3"
                        value={this.state.cause}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("solution") !== -1 && (
                      <TextField
                        id="solution"
                        name="solution"
                        label="ර‌ෝගයට පිළියම"
                        style={{ margin: 8 }}
                        placeholder="පිළියම ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.solution}
                        error={errors.solution ? true : false}
                        className={classes.textField}
                        type="text"
                        multiline
                        rows="4"
                        value={this.state.solution}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("medication_goods") !== -1 && (
                      <TextField
                        id="medication_goods"
                        name="medication_goods"
                        label="සදා ගැනීම සදහා උවමනා උපකරණ"
                        style={{ margin: 8 }}
                        placeholder="උපකරණ ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.medication_goods}
                        error={errors.medication_goods ? true : false}
                        className={classes.textField}
                        type="text"
                        multiline
                        rows="4"
                        value={this.state.medication_goods}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                    {textFieldsTypes.indexOf("prepare_method") !== -1 && (
                      <TextField
                        id="prepare_method"
                        name="prepare_method"
                        label="බ‌ෙහ‌ෙත් සදා ගන්නා ආකාරය"
                        style={{ margin: 8 }}
                        placeholder="සදා ගන්නා ආකාරය ඇතුලත් කරන්න"
                        margin="normal"
                        variant="outlined"
                        helperText={errors.prepare_method}
                        error={errors.prepare_method ? true : false}
                        className={classes.textField}
                        type="text"
                        multiline
                        rows="4"
                        value={this.state.prepare_method}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {textFieldsTypes.indexOf("marker_location") !== -1 && (
                      <Card profile>
                        <EditMarkerMap
                          type={"Add"}
                          getMarkers={this.getMarkers}
                          editType={`${this.props.submitType}s`}
                          latitude={37.778519}
                          longitude={-122.40564}
                        />
                      </Card>
                    )}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <div className={classes.buttons} spacing={2} justify="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={this.state.loading}
                  >
                    <DoneIcon />
                    &nbsp; ස්ථාපනය කරන්න
                    {this.state.loading && (
                      <CircularProgress
                        size={20}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <Button
                    onClick={this.clearForm}
                    variant="contained"
                    color="danger"
                  >
                    <ClearIcon />
                    &nbsp; Clear
                  </Button>
                  <Snackbar
                    open={this.state.snackBarOpen}
                    onClose={this.handleSnackBarClose}
                    // TransitionComponent={SlideTransition}
                    autoHideDuration={5000}
                    ContentProps={{
                      "aria-describedby": "message-id",
                    }}
                    // message={<span id="message-id">Successfully submitted!</span>}
                  >
                    <MySnackbarContentWrapper
                      onClose={this.handleSnackBarClose}
                      variant="success"
                      message="Successfully submitted!"
                    />
                  </Snackbar>
                </div>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitType: PropTypes.string.isRequired,
  cardSubHeader: PropTypes.string.isRequired,
  textFieldsTypes: PropTypes.array.isRequired,
  selectedData: PropTypes.object.isRequired,
};

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.object,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};
export default withStyles(styles)(EditForm);
