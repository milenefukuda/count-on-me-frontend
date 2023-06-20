import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const parsedStoreUser = JSON.parse(storedUser || '""');
    if (parsedStoreUser.token) {
      setLoggedInUser(parsedStoreUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
