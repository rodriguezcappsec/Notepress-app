import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Title from "@material-ui/icons/Title";
import Note from "@material-ui/icons/TextFields";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import apiURL from "../../apiConfig.js";
import "bootstrap/dist/css/bootstrap.css";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});
class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNoteModal: this.props.open,
      user: this.props.user.user,
      newNote: {
        title: "",
        note: ""
      },
      validationError: {},
      openAlert: false
    };
  }

  validateForm = () => {
    const { newNote, validationError } = this.state;
    if (newNote.title === "") {
      validationError.message = "Error";
      validationError.title = "Title cannot be empty";
    }
    if (newNote.note === "") {
      validationError.note = "Note cannot be empty";
    }
    this.setState({ openAlert: true });
    return Object.keys(validationError).length === 0 ? "" : validationError;
  };

  createNoteRequest = onSubmit => {
    onSubmit.preventDefault();
    this.validateForm();
    Axios.post(
      `${apiURL}/notes`,
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
        this.setState({ openAlert: false });
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
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            margin: "50px 20px 0 0",
            maxWidth: "345px",
            height: "450px",
            textAlign: "center"
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Create Note
            </Typography>
            {this.state.openAlert && (
              <Typography variant="subheading" color="secondary">
                Fields cannot be empty
              </Typography>
            )}
          </CardContent>
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
                rows={5}
                name="note"
                onChange={this.handleFormValues}
                fullWidth
              />
            </Grid>
            <CardActions>
              <Button
                className={this.props.classes.button}
                size="small"
                color="primary"
                variant="contained"
                onClick={this.createNoteRequest}
              >
                Add Note
              </Button>
            </CardActions>
          </Grid>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(CreateNote);
