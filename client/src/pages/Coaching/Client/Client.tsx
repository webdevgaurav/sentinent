import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "./Client.module.css";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import AddUser from "../Modals/AddUser";

const Client = () => {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [search, setSearch] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [clientPages, setClientPages] = useState(1);
  const handleClientSearch = (e) => {
    if (e.key === "Enter") {
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/get?page=${clientPages}`)
      .then((res) => {
        setUsers(res.data);
        setClientPages(clientPages + 1);
      })
      .catch((error) => {
        throw error.message;
      });
  }, []);

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  }
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    setUserDetails({});
  }
  const handleEditUser = (item) => {
    setOpenAddUser(true);
    setUserDetails(item);
  }
  return (
    <div>
      <AddUser onOpen={openAddUser} onClose={handleCloseAddUser} userDetails={userDetails}/>
      
      <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
        <input
          className="form-control w-25"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handleClientSearch}
          onChange={handleClientSearch}
        />
        <button className="addModalBtn" onClick={handleOpenAddUser}>
          <IoMdAdd />
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Socials</th>
              <th scope="col">Rating</th>
              <th scope="col">Last Login</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((item, index) => (
                <tr key={index}>
                  <td className="d-flex align-items-center">
                    <img src={`${BASE_URL + item.profile}`} alt={item.fullname} />
                    <span>{item.fullname}</span>
                  </td>
                  <td>{item.userType}</td>
                  <td>{item.status}</td>
                  <td>{item.socials}</td>
                  <td>{item.rating}</td>
                  <td>{item.lastLoggedIn}</td>
                  <td>
                    <button className="btn cursor-pointer" onClick={()=>handleEditUser(item)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;
