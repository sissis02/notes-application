import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
