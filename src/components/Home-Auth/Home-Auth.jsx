import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar.jsx";
import { withStyles } from "@material-ui/core/styles";
import Password from "@material-ui/icons/VisibilityOff";
import Email from "@material-ui/icons/Email";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import apiURL from "../../apiConfig.js";
import App from "../../App.js";
import { BrowserRouter } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import ModalAlert from "../../modals/ModalAlert.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserName from "@material-ui/icons/Face";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: 400
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});
class HomeAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: apiURL,
      loggedUser: {
        user: "",
        isLogged: false
      },
      account: {
        email: "",
        password: ""
      },
      newAccount: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      //field to open register modal
      openRegisterModal: false,
      validationError: {},
      openAlert: ""
    };
  }
  //Login request on formSubmit
  loginRequest = onSubmit => {
    onSubmit.preventDefault();
    this.validateForm();
    Axios.post(`${this.state.api}/sign-in`, {
      credentials: {
        email: this.state.account.email,
        password: this.state.account.password
      }
    })
      .then(user => {
        const loggedUser = { ...this.state.loggedUser };
        loggedUser.user = user.data;
        loggedUser.isLogged = true;
        this.setState({ loggedUser });
        this.setState({ openAlert: false });
      })
      .catch(exe => {
        this.setState({ openAlert: true });
      });
  };
  validateForm = () => {
    const { account, validationError } = this.state;
    if (account.title === "") {
      validationError.message = "Error";
      validationError.title = "Title cannot be empty";
      this.setState({ openAlert: true });
    }
    if (account.note === "") {
      validationError.note = "Note cannot be empty";
      this.setState({ openAlert: true });
    }
    this.setState({ openWrongLoginAlert: true });
    return Object.keys(validationError).length === 0
      ? ("", this.setState({ openAlert: false }))
      : validationError;
  };
  // validateLogin=(exe) =>{
  //    if(exe)
  // }

  //getting login fields
  handleFormValues = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    //setting state account fields when user types email and password
    account[input.name] = input.value;
    this.setState({ account: account });
  };
  //opening register modal on register button click
  handleOpenRegisterModal = () => {
    this.setState({ openRegisterModal: true });
  };
  //function that renders the notes dashboard if user logges in
  handleAuthenticationState = () => {
    if (!this.state.loggedUser.isLogged) {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <div>
            <NavBar user={this.state.loggedUser.user} />
          </div>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Card
              className={classes.card}
              style={{
                position: "absolute",
                width: "500px",
                height: "350px",
                top: "30%",
                left: "40%"
              }}
            >
              <CardHeader title="NotePress" subheader="LogIn" />
              <CardContent>
                {this.state.openAlert ? (
                  <Typography variant="subheading" color="secondary">
                    Wrong fields, please try again!
                  </Typography>
                ) : null}
              </CardContent>
              <form onSubmit={this.loginRequest} id="LoginForm">
                <Grid
                  container
                  spacing={8}
                  alignItems="flex-end"
                  justify="center"
                  style={{ padding: "10px" }}
                >
                  <Grid item>
                    <Email />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="email"
                      id="input-with-icon-grid"
                      label="Email"
                      name="email"
                      onChange={this.handleFormValues}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={8}
                  alignItems="flex-end"
                  justify="center"
                  style={{ padding: "10px" }}
                >
                  <Grid item>
                    <Password />
                  </Grid>
                  <Grid item>
                    <TextField
                      autoFocus
                      type="password"
                      id="login-password"
                      label="Password"
                      name="password"
                      onChange={this.handleFormValues}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={8}
                  alignItems="flex-end"
                  justify="center"
                  style={{ padding: "10px" }}
                >
                  <Grid item style={{ paddingLeft: "60px" }}>
                    <CardActions>
                      <Button type="submit" variant="contained" color="primary">
                        LogIn
                      </Button>
                    </CardActions>
                  </Grid>
                  <Grid item>
                    <CardActions>
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="secondary"
                        onClick={this.handleOpenRegisterModal}
                      >
                        Register
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Slide>
          {/*Show Register User Modal on register button click*/}
          {this.registerUserModal()}
        </div>
      );
    }
    //Render dashboard when the user authenticates
    return (
      <React.Fragment>
        <BrowserRouter>
          <App
            isLoggedIn={this.state.loggedUser.isLogged}
            loggedUser={this.state.loggedUser.user}
          />
        </BrowserRouter>
        <ModalAlert
          open={true}
          modalTitle="Welcome!"
          modalContent={this.state.loggedUser.user.user.name}
        />
        );
      </React.Fragment>
    );
  };
  //Rendering
  render() {
    return this.handleAuthenticationState();
  }
  //Register request on register form modal submit
  registerRequest = onSubmit => {
    onSubmit.preventDefault();
    Axios.post(`${this.state.api}/sign-up`, {
      credentials: {
        name: this.state.newAccount.name,
        email: this.state.newAccount.email,
        password: this.state.newAccount.password,
        password_confirmation: this.state.newAccount.password_confirmation
      }
    })
      .then(registeredUser => {
        // const loggedUser = { ...this.state.loggedUser };
        // loggedUser.user = user.data;
        // loggedUser.isLogged = true;
        // this.setState({ loggedUser });
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  //set openRegisterModal to false when modals closes.
  onCloseModal = () => this.setState({ openRegisterModal: false });
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  //setting fields types in the register user modal
  handleRegisterUser = ({ currentTarget: input }) => {
    let formValues = { ...this.state.newAccount };
    formValues[input.name] = input.value;
    this.setState({ newAccount: formValues });
  };
  //Register new user modal
  registerUserModal = () => {
    return (
      <div>
        <Dialog
          open={this.state.openRegisterModal}
          onClose={this.onCloseModal}
          aria-labelledby="form-dialog-title"
          TransitionComponent={this.Transition}
          style={{ height: "600px" }}
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <form onSubmit={this.registerRequest}>
            <DialogContent>
              <DialogContentText>
                Fill the required fields to register
              </DialogContentText>
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
                justify="center"
                style={{ padding: "5px" }}
              >
                <Grid item>
                  <UserName color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="UserName"
                    type="text"
                    name="name"
                    fullWidth
                    onChange={this.handleRegisterUser}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
                justify="center"
                style={{ padding: "5px" }}
              >
                <Grid item>
                  <Email color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={this.handleRegisterUser}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
                justify="center"
                style={{ padding: "5px" }}
              >
                <Grid item>
                  <Password color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    onChange={this.handleRegisterUser}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
                justify="center"
                style={{ padding: "5px" }}
              >
                <Grid item>
                  <Password color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    name="password_confirmation"
                    fullWidth
                    onChange={this.handleRegisterUser}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                // onClick={this.setId}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };
}

HomeAuth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeAuth);
