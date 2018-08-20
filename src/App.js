import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SideMenu from "./components/SideMenu/SideMenu.jsx";
import Slide from "@material-ui/core/Slide";
import NotesGrid from "./components/NotesGrid/NotesGrid.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      checked: true,
      allNotes: [],
      user: this.props.loggedUser
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <React.Fragment>
          <NavBar isLogged={this.state.isLoggedIn} />
          <Slide
            direction="right"
            mountOnEnter
            unmountOnExit
            in={true}
            style={{ transitionDelay: true ? 500 : 0 }}
          >
            <SideMenu />
          </Slide>
          <Slide
            direction="up"
            mountOnEnter
            unmountOnExit
            in={true}
            style={{ transitionDelay: true ? 700 : 0 }}
          >
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route
                  exact
                  path="/home"
                  render={props => (
                    <NotesGrid {...props} user={this.state.user} />
                  )}
                />
                <Redirect exact from="/" to="/Home" />
              </Switch>
            </main>
          </Slide>
        </React.Fragment>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
