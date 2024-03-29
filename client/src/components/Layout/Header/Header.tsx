import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext, useState } from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { BASE_URL } from "../../../../config";
import UserContext from "../../../contexts/UserContext";
import SidebarContext from "../../../contexts/SidebarContext";

const Header = () => {
  const { selectedTab } = useContext(SidebarContext);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [notification, setNotification] = useState(false);
  const { userInfo } = useContext(UserContext);

  const handleHeaderDropdown = () => {
    setDropdownShow((prevState) => !prevState);
  };

  const handleCloseDropdown = () => {
    setDropdownShow((prevState) => !prevState);
  };

  const handleNotification = () => {
    setNotification((prevState) => !prevState);
  };

  return (
    <header className={`p-3 border-bottom ${styles.headerContainer}`}>
      <div className={`d-flex ${styles.containerMargin}`}>
        <h3 className="m-0">{selectedTab}</h3>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {!notification ? (
            <IoIosNotifications
              className={styles.notificationIcon}
              onClick={handleNotification}
            />
          ) : (
            <IoIosNotificationsOutline
              className={styles.notificationIcon}
              onClick={handleNotification}
            />
          )}

          <div className="dropdown text-end">
            <Link
              to="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleHeaderDropdown}
            >
              <img
                src={`${BASE_URL + userInfo.profile}`}
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </Link>
            <ul
              className={`dropdown-menu text-small ${
                dropdownShow ? styles.headerDropdown : ""
              }`}
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="/setting"
                  onClick={handleCloseDropdown}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/profile"
                  onClick={handleCloseDropdown}
                >
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
