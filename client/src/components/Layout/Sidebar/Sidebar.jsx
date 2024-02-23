import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SideItem from "./SideItem";
import PropTypes from "prop-types";
import { useContext } from "react";
import SidebarContext from "../../../contexts/SidebarContext";

const Sidebar = () => {
  const { sidebarData, toggleSidebar } = useContext(SidebarContext);
  return (
    <>
      <div className={`h-100 ${styles.sidebarContainer} ${toggleSidebar ? styles.toggleSidebar : ''}`}>
        <Link to="/dashboard" className="mb-3">
          <img src="/assets/logo1.png" className="img-fluid" alt="sentinent" />
        </Link>
        <ul className={styles.sidebarContainerList}>
          {sidebarData.map((item) => (
            <SideItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
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
