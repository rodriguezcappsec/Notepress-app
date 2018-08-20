import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import apiURL from "../../apiConfig.js";
import Axios from "axios";
import ModalAlert from "../../modals/ModalAlert.jsx";
import { Modal } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  paper: {
    height: 140,
    width: 100
  },
  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class NotesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: apiURL,
      user: this.props.user.user,
      allNotes: []
    };
  }
  handleNoteRequest = () => {
    return Axios.get(`${this.state.api}/notes`, {
      headers: {
        Authorization: "Bearer " + this.state.user.token
      }
    })
      .then(notes => {
        this.setState({ allNotes: notes.data.notes });
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  handleDeleteNote = ({ currentTarget }) => {
    Axios.delete(`${this.state.api}/notes/${currentTarget.id}`, {
      headers: {
        Authorization: "Bearer " + this.state.user.token
      }
    })
      .then(deletedNote => {
        console.log(deletedNote.data);
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  componentDidMount() {
    this.handleNoteRequest();
  }
  componentDidUpdate() {
    this.handleNoteRequest();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={40}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={40}
          >
            {this.renderNotes()}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  renderNotes = () => {
    return this.state.allNotes.length === 0 ? (
      <h3>No data to display</h3>
    ) : (
      this.state.allNotes.map((note, index) => (
        <Card
          className={this.props.classes.card}
          key={index}
          style={{ margin: "50px 20px 0 0" }}
        >
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {note.title}
            </Typography>
            <Typography component="p">{note.note}</Typography>
          </CardContent>
          <CardActions>
            <Button
              className={this.props.classes.button}
              size="small"
              color="primary"
              variant="contained"
              id={note._id}
            >
              Edit
            </Button>
            <Button
              className={this.props.classes.button}
              size="small"
              variant="contained"
              color="secondary"
              id={note._id}
              onClick={this.handleDeleteNote}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))
    );
  };
}
NotesGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotesGrid);
