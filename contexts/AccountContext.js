// CombinedContext.js
import React, { createContext, useContext } from "react";

import { AuthProvider, useAuthContext } from "./AuthContext";
import {
  RegistrationProvider,
  useRegistrationContext,
} from "./RegistrationContext";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const { userData, ...registrationContext } = useRegistrationContext();
  const { state, dispatch, authActions } = useAuthContext();

  const accountValues = {
    userData,
    ...registrationContext,
    state,
    dispatch,
    authActions,
  };

  return (
    <AccountContext.Provider value={accountValues}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};

export { AccountProvider, useAccountContext };
