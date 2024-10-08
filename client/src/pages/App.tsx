import { Outlet } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import Header from "../components/Layout/Header/Header";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="d-flex h-100">
        <SidebarProvider>
          <Sidebar />
          <div className="w-100 h-100 ml-4 p-1 overflow-auto">
            <Header />
            <div className="main-content">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </div>
    </UserProvider>
  );
};

export default App;
