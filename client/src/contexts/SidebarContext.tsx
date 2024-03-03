import { createContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const sidebarData = [
    {
      label: "Dashboard",
      route: "dashboard",
      icon: "bi bi-speedometer2",
      childrens: [],
    },
    {
      label: "Training",
      route: "training/product",
      icon: "bi bi-basket",
      childrens: [],
    },
    {
      label: "Coaching",
      icon: "bi bi-people",
      childrens: [
        {
          label: "Client",
          route: "client",
          icon: "bi bi-person",
          childrens: [],
        },
      ],
    },
    {
      label: "Tasks",
      route: "tasks",
      icon: "bi bi-list-task",
      childrens: [],
    },
    {
      label: "Notes",
      route: "notes",
      icon: "bi bi-newspaper",
      childrens: [],
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Dashbaord");
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSidebarTabChange = (item) => {
    setSelectedTab(item.label);
  };

  const handleToggleSidebar = () => {
    setToggleSidebar((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarData,
        selectedTab,
        toggleSidebar,
        handleSidebarTabChange,
        handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
