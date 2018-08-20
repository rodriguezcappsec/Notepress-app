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
      }
    };
  }
  loginRequest = onSubmit => {
    onSubmit.preventDefault();
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
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  handleFormValues = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account });
  };
  handleAuthenticationState = () => {
    if (!this.state.loggedUser.isLogged) {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <div>
            <NavBar />
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
                      id="input-with-icon-grid"
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
                      >
                        Register
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Slide>
        </div>
      );
    }
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
  render() {
    return this.handleAuthenticationState();
  }
}

HomeAuth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeAuth);
