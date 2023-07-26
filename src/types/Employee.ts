export interface EmployeeAddress {
  streetName: string;
  postalCode: string;
  apartmentNumber?: number;
  state: string;
  country: string;
}

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: Array<EmployeeAddress>;
}

export interface EmployeeWithId extends Employee {
  id: number;
}
