import { Link, Navigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SideItem from "./SideItem";
import PropTypes from "prop-types";

const Sidebar = ({ sidebarData, onClick }) => {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 ${styles.sidebarContainer}`}
    >
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
