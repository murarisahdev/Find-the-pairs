//material ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@mui/material";

const DialogBox = ({ open, moves, getScore, handleRestart }) => {
  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Hurray!!! You completed the challenge
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You completed the game in {moves} moves. Your score is{" "}
          {getScore() ?? "0"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRestart} color="primary">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
 