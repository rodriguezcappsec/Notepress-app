import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import apiURL from "../../apiConfig.js";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Title from "@material-ui/icons/Title";
import Note from "@material-ui/icons/TextFields";

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
      allNotes: [],
      openEditModal: false,
      formEdit: {
        title: "",
        note: "",
        id: ""
      }
    };
  }
  handleNoteRequest = () => {
    return Axios.get(`${this.state.api}/notes`, {
      headers: {
        Authorization: "Bearer " + this.state.user.token
      }
    })
      .then(notes => {
        // console.log(this.state.user._id);
        let userNotes = notes.data.notes.filter(
          n => n.userID === this.state.user._id
        );
        this.setState({ allNotes: userNotes });
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
        //call modalAlert
        this.handleNoteRequest();
      })
      .catch(exe => {
        console.log(exe);
      });
  };

  componentDidMount() {
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
            {this.state.openEditModal ? this.editNoteModal() : ""}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  onOpenModal = e => {
    this.setState({ openEditModal: true });
    let setId = Object.assign({}, this.state.formEdit);
    setId.id = e.currentTarget.id;
    this.setState({ formEdit: setId });
  };
  onCloseModal = () => this.setState({ openEditModal: false });
  handleFormValues = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    //setting state account fields when user types email and password
    account[input.name] = input.value;
    this.setState({ account: account });
  };
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  handleEditForm = submit => {
    submit.preventDefault();
    Axios.patch(
      `${this.state.api}/notes/${this.state.formEdit.id}`,
      {
        note: {
          title: this.state.formEdit.title,
          note: this.state.formEdit.note
        }
      },
      {
        headers: {
          Authorization: "Bearer " + this.state.user.token
        }
      }
    )
      .then(editedNote => {
        this.handleNoteRequest();
      })
      .catch(err => {
        console.log(err);
      });
  };
  setId = e => {
    console.log(e.currentTarget.id);
  };
  handleFormValues = ({ currentTarget: input }) => {
    let formValues = { ...this.state.formEdit };
    formValues[input.name] = input.value;
    this.setState({ formEdit: formValues });
  };

  editNoteModal = () => {
    return (
      <div>
        <Dialog
          open={this.state.openEditModal}
          onClose={this.onCloseModal}
          aria-labelledby="form-dialog-title"
          TransitionComponent={this.Transition}
        >
          <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
          <form onSubmit={this.handleEditForm}>
            <DialogContent>
              <DialogContentText>
                Fill the required fields to update note.
              </DialogContentText>
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
                justify="center"
                style={{ padding: "10px" }}
              >
                <Grid item>
                  <Note color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Note Title"
                    type="text"
                    name="title"
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
                style={{ padding: "10px" }}
              >
                <Grid item>
                  <Title color="secondary" />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Note Text"
                    multiline={true}
                    rows={2}
                    name="note"
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
                onClick={this.setId}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };
  reformatDateHelper = date => {
    let formatted = date.split("T");
    return formatted[0];
  };
  renderNotes = () => {
    return this.state.allNotes.length === 0 ? (
      <span>No notes to display</span>
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
            <Typography
              gutterBottom
              color="textSecondary"
              variant="subheading"
              component="span"
            >
              created: {this.reformatDateHelper(note.createdAt)} <br />
              updated: {this.reformatDateHelper(note.updatedAt)}
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography
                component="p"
                style={{ maxWidth: "300px", flexWrap: "wrap" }}
              >
                {note.note}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button
              className={this.props.classes.button}
              size="small"
              color="primary"
              variant="contained"
              id={note._id}
              onClick={this.onOpenModal}
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
