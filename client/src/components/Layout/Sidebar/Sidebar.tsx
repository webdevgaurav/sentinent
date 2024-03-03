import { Link } from "react-router-dom";
import SideItem from "./SideItem";
import { useContext } from "react";
import SidebarContext from "../../../contexts/SidebarContext";

const Sidebar = () => {
  const { sidebarData, toggleSidebar, handleToggleSidebar } =
    useContext(SidebarContext);

  return (
    <>
      <div
        className={`sidebarToggleBtn ${
          toggleSidebar ? 'sidebarOpen' : ""
        }`}
        onClick={handleToggleSidebar}
      >
        <i className="bi bi-chevron-double-right"></i>
      </div>
      <div
        className={`h-100 sidebarContainer ${
          toggleSidebar ?'toggleSidebar' : ""
        }`}
      >
        <Link to="/dashboard" className="mb-3">
          <img src="/assets/logo1.png" className="img-fluid" alt="sentinent" />
        </Link>
        <ul className='sidebarContainerList'>
          {sidebarData.map((item) => (
            <SideItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
