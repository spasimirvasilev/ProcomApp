import { useContext, useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { EmployeeWithId } from "../types/Employee";
import DeleteEmployeeDialog from "../components/modals/DeleteEmployee";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setNotification } = useContext(SnackbarContext);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState<Array<EmployeeWithId>>([]);

  const fetchEmployees = async () => {
    const response = await fetch(
      "https://procom-interview-employee-test.azurewebsites.net/Employee"
    );

    const data = await response.json();

    setEmployees(data);
  };

  const deleteEmployee = async () => {
    const response = await fetch(
      `https://procom-interview-employee-test.azurewebsites.net/Employee/${selectedEmployee}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Show Success Notification
      setNotification({
        message: "Success",
        severity: "success",
        isActive: true,
      });
      await fetchEmployees();
    } else {
      // Show Error Notification
      setNotification({
        message: "Something went wrong",
        severity: "error",
        isActive: true,
      });
    }

    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <IconButton
          onClick={() => {
            navigate(`/createEmployee`);
          }}
          sx={{ borderRadius: "10%", mb: 2 }}
        >
          Add Employee
          <AddBoxIcon sx={{ height: "30px", width: "30px" }} />
        </IconButton>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        navigate(`/employee/${row.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelectedEmployee(row.id);
                        setOpenDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <DeleteEmployeeDialog
        open={openDialog}
        onDelete={deleteEmployee}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEmployee(null);
        }}
      />
    </>
  );
};

export default Home;
