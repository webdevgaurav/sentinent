import { Link, Navigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SideItem from "./SideItem";
import PropTypes from "prop-types";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ sidebarData, onClick }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const handleOpenSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };
  return (
    <div className="position-relative h-100">
      <div
        className={`${styles.sidebarToggle} ${
          !openSidebar ? styles.onToggleActive : ""
        }`}
        onClick={handleOpenSidebar}
      >
        <FaAngleDoubleRight />
      </div>
      <div className={`flex-shrink-0 h-100 ${styles.sidebarContainer} ${
          !openSidebar ? styles.onToggleActiveSidebar : ""
        }`}>
        <Link
          to="/dashboard"
          className="d-flex align-items-center justify-content-center mb-5 text-black text-decoration-none"
        >
          <img src="/assets/logo1.png" className="img-fluid" alt="sentinent" />
        </Link>

        <ul
          className={`nav nav-pills flex-column mb-auto pi-1 ${styles.sidebarContainerList}`}
        >
          {sidebarData.map((item) => (
            <SideItem key={item.id} item={item} onClick={() => onClick(item)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

SideItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
