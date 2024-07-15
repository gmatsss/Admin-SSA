import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faPaperPlane,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Userlist.css"; // Import the CSS file for styling
import EmailModal from "./EmailModal";

const Userlist = ({ onUserSelect, clientsData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ field: "", asc: true });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  // Calculate the number of pages
  const pageCount = Math.ceil(clientsData.length / itemsPerPage); // Assuming itemsPerPage = 4

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if clientsData is not null/undefined and has elements
    if (clientsData && clientsData.length > 0) {
      // Set a timeout to delay setting isLoading to false
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 1.5 seconds delay

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [clientsData]);

  useEffect(() => {
    let sortedClients = [...clientsData];
    if (sortConfig.field) {
      sortedClients.sort((a, b) => {
        if (sortConfig.asc) {
          return a[sortConfig.field].localeCompare(b[sortConfig.field]);
        } else {
          return b[sortConfig.field].localeCompare(a[sortConfig.field]);
        }
      });
    }

    const filtered = sortedClients.filter(
      (client) =>
        client.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toString().includes(searchTerm)
    );

    setFilteredClients(filtered);
    resetSelection();
  }, [clientsData, searchTerm, sortConfig]);

  const toggleSort = (field) => {
    setSortConfig({
      field,
      asc: sortConfig.field === field ? !sortConfig.asc : true,
    });
    setActiveIndex(null); // Reset active index
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setActiveIndex(null); // Reset active index
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveIndex(null); // Reset active index
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
  const handleUserClick = (user) => {
    setActiveIndex(user._id);
    onUserSelect(
      {
        ...user.onboardingDetails,
        email: user.email,
      },
      user._id
    ); // Pass the user's _id as well
  };

  const resetSelection = () => {
    setActiveIndex(null);
    onUserSelect(null); // Reset the selected user data
  };

  // const handleSendEmail = async (user) => {
  //   try {
  //     const response = await fetchData("admin/sendEmailtoclient", "POST", {
  //       email: user.email,
  //       fname: user.fullname.split(" ")[0],
  //     });
  //     toast.success(response.message);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     toast.error("Error sending email");
  //   }
  // };

  // Update this function to handle modal opening
  const handleSendEmail = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="userlist">
      <div className="sorting-buttons">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button
          className={`sorting-button ${
            sortConfig.field === "fullname" ? "active" : ""
          }`}
          onClick={() => toggleSort("fullname")}
        >
          <span>Sort by Name</span>
          {/* Include an icon for sorting direction */}
          <FontAwesomeIcon
            icon={sortConfig.asc ? faArrowUp : faArrowDown}
            className="sort-icon"
          />
        </button>
        <button
          className={`sorting-button ${
            sortConfig.field === "email" ? "active" : ""
          }`}
          onClick={() => toggleSort("email")}
        >
          <span>Sort by Email</span>
          {/* Include an icon for sorting direction */}
          <FontAwesomeIcon
            icon={sortConfig.asc ? faArrowUp : faArrowDown}
            className="sort-icon"
          />
        </button>
      </div>

      {isLoading ? (
        <div className="loader"></div>
      ) : (
        currentItems.map((user, index) => (
          <div
            key={user._id}
            className={`user-card ${activeIndex === user._id ? "active" : ""}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="user-field">
              <FontAwesomeIcon icon={faUser} /> {user.fullname}
            </div>
            <div className="user-field">
              <FontAwesomeIcon icon={faEnvelope} /> {user.email}
            </div>
            <div className="user-field">
              <FontAwesomeIcon icon={faPhone} /> {user.phone}
            </div>
            <div className="d-flex justify-content-end w-100">
              <button
                className="email-user"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents handleUserClick from firing
                  handleSendEmail(user);
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Send mail
              </button>
            </div>
          </div>
        ))
      )}

      {!isLoading && (
        <div className="pagination">
          {[...Array(pageCount)].map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <EmailModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        userData={selectedUser}
      />
    </div>
  );
};

export default Userlist;
