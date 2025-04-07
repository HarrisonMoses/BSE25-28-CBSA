import { useState, createContext } from "react";

const useContextData = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
};

export const UserContext = createContext(useContextData);

export const UserProvider = ({ children }) => { 
    const [user, setUser] = useState(useContextData);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
