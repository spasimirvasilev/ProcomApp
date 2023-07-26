import { Employee, EmployeeAddress } from "../types/Employee";

const formReducer = (
  state: Employee,
  action: {
    type: string;
    payload?: Employee;
    index?: number;
    field?: keyof Employee | keyof EmployeeAddress;
    value?: string | number;
  }
) => {
  switch (action.type) {
    case "remove_address": {
      if (typeof action.index === "number") {
        return {
          ...state,
          addresses: state.addresses
            .slice(0, action.index)
            .concat(state.addresses.slice(action.index + 1)),
        };
      }
      return {
        ...state,
      };
    }
    case "add_address": {
      return {
        ...state,
        addresses: [
          ...state.addresses,
          {
            streetName: "",
            postalCode: "",
            state: "",
            country: "",
          },
        ],
      };
    }

    case "set_field": {
      if (action.field) {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      return {
        ...state,
      };
    }

    case "set_address_field": {
      if (typeof action.index === "number" && action.field) {
        const addresses = [...state.addresses];
        addresses[action.index] = {
          ...state.addresses[action.index],
          [action.field]: action.value,
        };
        return {
          ...state,
          addresses,
        };
      }
      return {
        ...state,
      };
    }

    case "initial_set": {
      if (action.payload) {
        return {
          ...action.payload,
          addresses: [...action.payload.addresses],
        };
      }
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default formReducer;
