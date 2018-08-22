import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Password from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiURL from "../../apiConfig.js";
import Axios from "axios";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: 240
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isLogged: this.props.isLogged,
      openChangePass: false,
      newPass: {
        old: "",
        new: ""
      },
      user: this.props.user.user
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <AppBar position="absolute" className={classes.appBar} color="primary">
          <Toolbar>
            <Typography
              style={{ flex: 1 }}
              variant="title"
              color="inherit"
              noWrap
            >
              Notepress
            </Typography>
            {this.state.isLogged && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleChangePassModal}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {this.changePassModal()}
      </React.Fragment>
    );
  }
  handleChangePassModal = () => {
    this.setState({ openChangePass: true });
  };
  handlecloseChangePassModal = () => {
    this.setState({ openChangePass: false });
  };
  changePassRequest = onSubmit => {
    onSubmit.preventDefault();
    console.log(this.state.user);

    Axios.post(
      `${apiURL}/change-password`,
      {
        passwords: {
          old: this.state.newPass.old,
          new: this.state.newPass.new
        }
      },
      {
        headers: {
          Authorization: "Token token=" + this.state.user.token
        }
      }
    )
      .then(registeredUser => {
        console.log(registeredUser.data);
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  handleFormValues = ({ currentTarget: input }) => {
    const newPass = { ...this.state.newPass };
    //setting state account fields when user types email and password
    newPass[input.name] = input.value;
    console.log(newPass);
    this.setState({ newPass: newPass });
  };
  changePassModal = () => {
    return (
      <div>
        <Dialog
          open={this.state.openChangePass}
          onClose={this.handlecloseChangePassModal}
          aria-labelledby="form-dialog-title"
          TransitionComponent={this.Transition}
          style={{ height: "600px" }}
        >
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <form onSubmit={this.changePassRequest}>
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
                  <Password color="secondary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="old-pass"
                    label="Old Password"
                    type="password"
                    name="old"
                    fullWidth
                    onChange={this.handleFormValues}
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
                  <Password color="secondary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="new-pass"
                    label="New password"
                    name="new"
                    type="password"
                    onChange={this.handleFormValues}
                    fullWidth
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

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
