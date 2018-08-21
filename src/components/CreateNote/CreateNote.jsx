import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Title from "@material-ui/icons/Title";
import Note from "@material-ui/icons/TextFields";
import { withRouter } from "react-router-dom";

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNoteModal: this.props.open,
      user: this.props.user.user,
      newNote: {
        title: "",
        note: ""
      }
    };
  }

  createNoteRequest = onSubmit => {
    onSubmit.preventDefault();
    Axios.post(
      `${this.state.api}/notes`,
      {
        note: {
          title: this.state.newNote.title,
          note: this.state.newNote.note
        }
      },
      {
        headers: {
          Authorization: "Bearer " + this.state.user.token
        }
      }
    )
      .then(user => {
        this.props.history.push("/home");
      })
      .catch(exe => {
        console.log(exe);
      });
  };
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  onCloseModal = () => this.setState({ createNoteModal: false });
  handleFormValues = ({ currentTarget: input }) => {
    const newNote = { ...this.state.newNote };
    //setting state account fields when user types email and password
    newNote[input.name] = input.value;
    this.setState({ newNote: newNote });
  };
  //create new note modal
  createNoteModal = () => {
    return (
      <div>
        <Dialog
          open={this.state.createNoteModal}
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
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };

  render() {
    return this.createNoteModal();
  }
}
export default withRouter(CreateNote);
