import { useContext, useReducer } from "react";
import { Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Employee } from "../types/Employee";
import formReducer from "../reducers/formReducer";
import UserForm from "../components/forms/UserForm";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const initialState: Employee = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [
    {
      streetName: "",
      postalCode: "",
      state: "",
      country: "",
    },
  ],
};

const CreateEmployee: React.FC = () => {
  const { setNotification } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      "https://procom-interview-employee-test.azurewebsites.net/Employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    );

    // Show notification based on status
    if (response.ok) {
      setNotification({
        message: "User Created",
        severity: "success",
        isActive: true,
      });
    } else {
      setNotification({
        message: "Something Went Wrong",
        severity: "error",
        isActive: true,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <IconButton
        onClick={() => {
          navigate(`/`);
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <UserForm state={state} dispatch={dispatch} buttonLabel="Create" />
      </form>
    </Container>
  );
};

export default CreateEmployee;
