import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SideItem = ({ item, onClick }) => {
  return (
    <li className="nav-item">
      <Link
        to={`/${item.route}`}
        className={`nav-link ${styles.navItem} ${item.active ? styles.selectedTab : ""}`}
        aria-current="page"
        onClick={() => onClick(item)}
      >
        {item.label}
      </Link>
    </li>
  );
};

export default SideItem;
