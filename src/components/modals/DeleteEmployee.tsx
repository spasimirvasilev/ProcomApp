import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  onDelete: () => void;
  onClose: () => void;
}

// Dialog for confirming employee deletion
const DeleteEmployeeDialog: React.FC<Props> = ({ open, onDelete, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this employee?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployeeDialog;
