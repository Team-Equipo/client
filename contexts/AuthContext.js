// AuthContext.js
import Base64 from "Base64";
import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGN_IN":
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case "SIGN_UP":
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case "SIGN_OUT":
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  }, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authActions = useMemo(
    () => ({
      // Sign in (send/compare data to/with backend)
      signIn: async (data) => {
        try {
          const url = "https://jk249.azurewebsites.net/user";
          const headers = {
            Authorization:
              "Basic " + Base64.btoa(data.emailAddress + ":" + data.password),
          };

          const response = await fetch(url, {
            method: "GET",
            headers,
          });

          const credentials = await response.json();
          if (response.ok) {
            dispatch({ type: "SIGN_IN", token: credentials.token });
          } else {
            alert("Sign-in failed");
            throw new Error("Sign-in failed");
          }
        } catch (error) {
          console.error(error);
        }
      },
      // Sign out (navigate to Signin page)
      signOut: () => dispatch({ type: "SIGN_OUT", token: "signedout" }),
      // Navigate to Signup page
      signUp: () => dispatch({ type: "SIGN_UP", token: "signup" }),
      // Actual Signup (send data to backend)
      signingUp: async (data) => {
        try {
          const url = "https://jk249.azurewebsites.net/user";
          const headers = {
            "Content-Type": "application/json",
          };

          const requestBody = {
            firstname: data.firstname,
            lastname: data.lastname,
            emailaddress: data.emailaddress,
            password: data.password,
            // hobby: userData.interests,
            // favoritefood: userData.foods,
            // destination: userData.destination
          };

          // submit user data to backend
          const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
          });

          // console log for debugging
          console.log("Request body: ", requestBody);
          console.log("Response status:", response.status);

          if (!response.ok) {
            alert("Sign-up failed");
            throw new Error(
              `HTTP error. Status: ${
                response.status
              }, Response: ${await response.text()}`,
            );
          } else {
            // Sign-up successful, get token
            const userToken = await response.text();
            console.log("Response text:", userToken);
            dispatch({ type: "SIGN_UP", token: userToken });
          }
        } catch (error) {
          console.error("Sign-up Error: ", error);
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ state, dispatch, authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
