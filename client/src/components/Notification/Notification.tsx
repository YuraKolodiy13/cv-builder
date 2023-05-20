import React from "react";
import {useAppSelector} from "../../hooks/redux";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import {useActions} from "../../hooks/actions";

const severities: {[index: string]:any} = {
  info: 'info',
  error: 'error',
  success: 'success',
}

const Notification = () => {

  const notification = useAppSelector(state => state.common.notification);
  const {snackbarMessage, snackbarSeverity, openSnackbar} = notification;
  const {setNotificationMessage} = useActions();

  const closeSnackbar = () => {
    setNotificationMessage({snackbarMessage: '', snackbarSeverity: 'info', openSnackbar: false})
  }

  return (
    <Snackbar
      open={openSnackbar}
      onClose={closeSnackbar}
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      autoHideDuration={3000}
      TransitionComponent={Slide}
    >
      <Alert onClose={closeSnackbar} severity={severities[snackbarSeverity]}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
