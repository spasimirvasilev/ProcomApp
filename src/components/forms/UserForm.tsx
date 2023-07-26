import { Button, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee, EmployeeAddress } from "../../types/Employee";

interface Props {
  state: Employee;
  dispatch: React.Dispatch<{
    type: string;
    payload?: Employee | undefined;
    index?: number | undefined;
    field?: keyof Employee | keyof EmployeeAddress | undefined;
    value?: string | number | undefined;
  }>;
  buttonLabel: string;
}

// The form used in the Create and Update screens
const UserForm: React.FC<Props> = ({ state, dispatch, buttonLabel }) => {
  const handleRemoveAddress = (index: number) => {
    dispatch({ type: "remove_address", index });
  };

  const handleAddAddress = () => {
    dispatch({ type: "add_address" });
  };
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          required
          type="text"
          value={state.firstName}
          onChange={(e) =>
            dispatch({
              type: "set_field",
              field: "firstName",
              value: e.target.value,
            })
          }
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          required
          type="text"
          value={state.lastName}
          onChange={(e) =>
            dispatch({
              type: "set_field",
              field: "lastName",
              value: e.target.value,
            })
          }
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          required
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: "set_field",
              field: "email",
              value: e.target.value,
            })
          }
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          type="text"
          required
          value={state.phoneNumber}
          onChange={(e) => {
            const regex = /^[0-9\b]+$/;
            if (e.target.value === "" || regex.test(e.target.value)) {
              dispatch({
                type: "set_field",
                field: "phoneNumber",
                value: e.target.value,
              });
            }
          }}
        />
      </Stack>

      {state.addresses.map((address, index) => (
        <>
          <Stack spacing={2} direction="row" justifyContent={"space-between"}>
            <p>Address {index + 1}</p>
            {state.addresses.length > 1 && (
              <IconButton
                sx={{ width: "52px" }}
                onClick={() => handleRemoveAddress(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Street Name"
              name="streetName"
              required
              type="text"
              value={address.streetName}
              onChange={(e) =>
                dispatch({
                  type: "set_address_field",
                  index,
                  field: "streetName",
                  value: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              required
              type="text"
              value={address.postalCode}
              onChange={(e) =>
                dispatch({
                  type: "set_address_field",
                  index,
                  field: "postalCode",
                  value: e.target.value,
                })
              }
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
            <TextField
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Apartment #"
              name="apartmentNumber"
              value={address.apartmentNumber}
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  dispatch({
                    type: "set_address_field",
                    index,
                    field: "apartmentNumber",
                    value: parseInt(e.target.value),
                  });
                }
              }}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              required
              type="text"
              value={address.state}
              onChange={(e) =>
                dispatch({
                  type: "set_address_field",
                  index,
                  field: "state",
                  value: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              required
              type="text"
              value={address.country}
              onChange={(e) =>
                dispatch({
                  type: "set_address_field",
                  index,
                  field: "country",
                  value: e.target.value,
                })
              }
            />
          </Stack>
        </>
      ))}
      <Stack spacing={4} direction="row" sx={{ mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleAddAddress}>
          Add Address
        </Button>
        <Button variant="outlined" color="primary" type="submit">
          {buttonLabel}
        </Button>
      </Stack>
    </>
  );
};

export default UserForm;
