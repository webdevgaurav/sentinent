import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { useState } from "react";

const App = () => {
  const sidebarData = [
    {
      id: 1,
      label: "Dashboard",
      route: "dashboard",
      active: true,
    },
    {
      id: 2,
      label: "Training",
      route: "training",
      active: false,
    },
    {
      id: 3,
      label: "Coaching",
      route: "coaching",
      active: false,
    },
    {
      id: 4,
      label: "Tasks",
      route: "tasks",
      active: false,
    },
    {
      id: 5,
      label: "Notes",
      route: "notes",
      active: false,
    },
  ];
  const [sidebarActive, setSidebarActive] = useState(sidebarData);
  const [headerTab, setHeaderTab] = useState({heading: 'Dashboard'});

  const handleSidebarTags = ({ id }) => {
    setSidebarActive((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          setHeaderTab({...item, heading: item.label});
          return { ...item, active: true };
        } else {
          return { ...item, active: false };
        }
      })
    );
  };

  return (
    <div className="d-flex" style={{height: "100vh"}}>
      <Sidebar sidebarData={sidebarActive} onClick={handleSidebarTags}/>
      <div style={{width: "100%"}}>
        <Header headerTab={headerTab}/>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
