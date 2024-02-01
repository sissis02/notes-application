import { Outlet, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  return (
    <UserProvider>
      <div className="App">
        {location.pathname !== "/" && <Navbar /> &&
          location.pathname !== "/registration" && <Navbar />}
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
