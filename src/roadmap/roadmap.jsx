import React, { useEffect, useRef, useState } from "react";
import "./roadmap.css"; // Make sure to link the CSS file
import Createroadmap from "./createroadmap";
import { fetchData } from "../api/FetchData";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const ITEMS_PER_PAGE = 9; // Define how many items per page

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const roadmapCardsRef = useRef(null); // Ref for the roadmap cards container
  const [showCreateRoadmap, setShowCreateRoadmap] = useState(false); // New state for toggling Createroadmap
  const [isLoading, setIsLoading] = useState(false);

  const getRoadmaps = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData("admin/getAllRoadmaps");
      setRoadmaps(response);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRoadmaps();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      roadmapCardsRef.current &&
      !roadmapCardsRef.current.contains(event.target) &&
      !event.target.classList.contains("delete-roadmap-button") // Check if the clicked element is not the delete button
    ) {
      setSelectedRoadmap(null); // Reset selected roadmap only if clicked outside the roadmap cards and not on the delete button
    }
  };

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) =>
      roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoadmaps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedRoadmaps = filteredRoadmaps.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRoadmapSelect = (roadmap) => {
    if (selectedRoadmap && selectedRoadmap._id === roadmap._id) {
      setSelectedRoadmap(null); // Deselect if the same roadmap is clicked again
    } else {
      setSelectedRoadmap(roadmap); // Select the clicked roadmap
    }
  };

  const handleDeleteRoadmap = async () => {
    if (selectedRoadmap) {
      try {
        // Make a DELETE request to the backend
        const response = await fetchData(
          `admin/deleteRoadmap/${selectedRoadmap._id}`,
          "DELETE"
        );

        // Handle the response
        console.log(response.message); // Or use toast to display success message
        toast.success("Roadmap deleted successfully");

        // Reset selection and refresh the roadmaps list
        setSelectedRoadmap(null);
        getRoadmaps();
      } catch (error) {
        console.error("Error deleting roadmap:", error);
        toast.error("Failed to delete roadmap.");
      }
    }
  };

  const buttonContainerStyle = {
    transform: selectedRoadmap ? "translateX(0)" : "translateX(20px)", // Adjust the X value as needed
  };

  const handleCreateRoadmap = () => {
    setShowCreateRoadmap(true); // Toggle the display of the Createroadmap component
  };

  const handleCancelCreate = () => {
    setShowCreateRoadmap(false); // Hide the Createroadmap component
  };

  const handleCreateSuccess = () => {
    setShowCreateRoadmap(false);
    getRoadmaps(); // Refresh the roadmap data
  };

  return (
    <div className="roadmap-container">
      {showCreateRoadmap ? (
        <Createroadmap
          onCancel={handleCancelCreate}
          onSuccess={handleCreateSuccess}
        />
      ) : (
        <>
          <div className="roadmap-controls">
            <input
              type="text"
              placeholder="Search Roadmaps..."
              className="roadmap-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              className="roadmap-button-container"
              style={buttonContainerStyle}
            >
              <button
                className="create-roadmap-button"
                onClick={handleCreateRoadmap}
              >
                Create Roadmap
              </button>
              {selectedRoadmap && (
                <button
                  className="delete-roadmap-button show"
                  onClick={handleDeleteRoadmap}
                >
                  Delete Roadmap
                </button>
              )}
            </div>
          </div>
          <div className="roadmap-cards" ref={roadmapCardsRef}>
            {isLoading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              selectedRoadmaps.map((roadmap) => (
                <div
                  key={roadmap._id}
                  className={`roadmap-card ${
                    selectedRoadmap?._id === roadmap._id ? "selected" : ""
                  }`}
                  onClick={() => handleRoadmapSelect(roadmap)}
                >
                  <h3>{roadmap.title}</h3>
                  <p>{roadmap.description}</p>
                </div>
              ))
            )}
          </div>

          <div className="pagination-roadmap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => changePage(index + 1)}
                className={`page-button-roadmap ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Roadmap;
