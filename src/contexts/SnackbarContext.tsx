import { Alert, AlertColor, Snackbar } from "@mui/material";
import { ReactNode, createContext, useState } from "react";

interface Notification {
  isActive: boolean;
  severity: AlertColor;
  message: string;
}

// Context which enables showing of a Notification
export const SnackbarContext = createContext<{
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}>({
  setNotification: () => {},
});

export const SnackbarContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification>({
    isActive: false,
    severity: "success",
    message: "",
  });

  return (
    <>
      <SnackbarContext.Provider value={{ setNotification }}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        open={notification?.isActive}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, isActive: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, isActive: false })}
          severity={notification?.severity}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
