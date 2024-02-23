import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useContext, useState } from "react";
import SidebarContext from "../../../contexts/SidebarContext";

const SideItem = ({ item }) => {
  const { label, route, icon, childrens } = item;
  const [open, setOpen] = useState(false);
  const { handleSidebarTabChange, selectedTab } = useContext(SidebarContext);
  const handleSubTabOpen = () => {
    console.log(selectedTab);
    setOpen((prevState) => !prevState);
  };

  if (childrens.length) {
    return (
      <li
        className={`nav-item p-3 ${
          selectedTab === label && styles.selectedTab
        } ${styles.sidebarItem} ${open ? styles.open : ""}`}
      >
        <div className={styles.sidebarTitleContainer}>
          <Link
            to={route}
            className={`nav-link`}
            aria-current="page"
            onClick={() => handleSidebarTabChange(item)}
          >
            <div className={styles.sidebarTitle}>
              <span>
                <i className={icon}></i>
                {label}
              </span>
            </div>
          </Link>
          <i
            className={`bi bi-chevron-down ${styles.sidebarSubItemToggle}`}
            onClick={() => handleSubTabOpen()}
          ></i>
        </div>
        {open && (
          <li className={`nav-item mt-1 ${styles.subNavItem}`}>
            {childrens.map((item, index) => (
              <SideItem key={index} item={item} />
            ))}
          </li>
        )}
      </li>
    );
  } else {
    return (
      <li
        className={`nav-item p-3 ${
          selectedTab === label && styles.selectedTab
        } ${styles.sidebarItem}`}
      >
        <Link
          to={route}
          className={`nav-link`}
          aria-current="page"
          onClick={() => handleSidebarTabChange(item)}
        >
          <div className={styles.sidebarTitle}>
            <span>
              <i className={icon}></i>
              {label}
            </span>
          </div>
        </Link>
      </li>
    );
  }
};

export default SideItem;
