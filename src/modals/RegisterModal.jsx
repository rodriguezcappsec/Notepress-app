import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Password from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Axios from "axios";
// import apiURL from "../../apiConfig.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Title from "@material-ui/icons/Title";
import Slide from "@material-ui/core/Slide";

export default class registerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerModal: true,
      formRegister: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        profilePicture: ""
      }
    };
  }
  render() {
    return <div>{this.registerUserModal()}</div>;
  }
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  onCloseModal = () => this.setState({ registerModal: false });
  handleFormValues = ({ currentTarget: input }) => {
    let formValues = { ...this.state.formRegister };
    formValues[input.name] = input.value;
    this.setState({ formEdit: formValues });
  };


}
