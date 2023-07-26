import { Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formReducer from "../reducers/formReducer";
import { initialState } from "./createEmployee";
import UserForm from "../components/forms/UserForm";
import { SnackbarContext } from "../contexts/SnackbarContext";

const UpdateEmployee = () => {
  const { setNotification } = useContext(SnackbarContext);
  const navigate = useNavigate();
  let { id } = useParams();
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(
        `https://procom-interview-employee-test.azurewebsites.net/Employee/${id}`
      );

      const data = await response.json();

      if (data.id) {
        delete data.id;
      }

      dispatch({ type: "initial_set", payload: data });
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://procom-interview-employee-test.azurewebsites.net/Employee/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    );

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
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <UserForm state={state} dispatch={dispatch} buttonLabel="Update" />
      </form>
    </Container>
  );
};

export default UpdateEmployee;
