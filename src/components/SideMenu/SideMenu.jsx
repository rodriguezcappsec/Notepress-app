import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Home from "@material-ui/icons/Home";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
  toolbar: theme.mixins.toolbar
});
class SideMenu extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <Link to="/home" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/create-note" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <NoteAdd />
              </ListItemIcon>
              <ListItemText primary="Create Note" />
            </ListItem>
          </Link>
        </Drawer>
      </React.Fragment>
    );
  }
}
SideMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideMenu);
