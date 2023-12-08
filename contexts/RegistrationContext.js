// RegistrationContext.js
import React, { createContext, useState, useContext } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  interests: "",
  foods: "",
  destination: "",
};

const RegistrationContext = createContext();
const RegistrationProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialState);

  const setFirstName = (firstName) => {
    setUserData((prevState) => ({ ...prevState, firstName }));
  };

  const setLastName = (lastName) => {
    setUserData((prevState) => ({ ...prevState, lastName }));
  };

  const setEmailAddress = (emailAddress) => {
    setUserData((prevState) => ({ ...prevState, emailAddress }));
  };

  const setPassword = (password) => {
    setUserData((prevState) => ({ ...prevState, password }));
  };

  const setInterests = (interests) => {
    setUserData((prevState) => ({ ...prevState, interests }));
  };

  const setFoods = (foods) => {
    setUserData((prevState) => ({ ...prevState, foods }));
  };

  const setDestination = (destination) => {
    setUserData((prevState) => ({ ...prevState, destination }));
  };

  return (
    <RegistrationContext.Provider
      value={{
        userData,
        setFirstName,
        setLastName,
        setEmailAddress,
        setPassword,
        setInterests,
        setFoods,
        setDestination,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider",
    );
  }
  return context;
};

export { RegistrationProvider, useRegistrationContext };
