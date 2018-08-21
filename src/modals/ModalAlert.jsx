import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

class ModalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.open,
      modalContent: {
        modalTitle: this.props.modalTitle,
        modalContent: this.props.modalContent,
        modalAction: this.props.modalAction
      }
    };
  }
  Transition = props => {
    return (
      <Slide
        direction="down"
        {...props}
        style={{ transitionDelay: true ? 1100 : 0 }}
      />
    );
  };
  handleClose = () => this.setState({ openModal: false });

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.openModal}
          TransitionComponent={this.Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.modalContent.modalTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.modalContent.modalContent}
            </DialogContentText>
          </DialogContent>
          {this.state.modalContent.modalContent !== "" && (
            <DialogActions>{this.state.modalContent.modalAction}</DialogActions>
          )}
        </Dialog>
      </React.Fragment>
    );
  }
}

export default ModalAlert;
