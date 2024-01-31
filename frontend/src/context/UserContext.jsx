import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // to save the value of {user, setUser} - this is done to avoid recreating this value every time you render, unless the [user, setUser] dependencies change
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserContext;
