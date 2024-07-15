import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../../api/FetchData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import for liked state
import CircularProgress from "@mui/material/CircularProgress";
import UserContext from "../../Context/UserContext";
import "./RoadmapContent.css";

const RoadmapContent = () => {
  const { user } = useContext(UserContext);
  const [roadmaps, setRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRoadmaps = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("admin/getAllRoadmaps");
        setRoadmaps(response);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRoadmaps();
  }, []);

  const handleLike = async (roadmapId) => {
    if (!user || !user._id) {
      console.log("User not found");
      return;
    }

    try {
      const response = await fetchData("admin/likeRoadmap", "POST", {
        roadmapId,
        userId: user._id,
      });
      console.log(response.message);

      // Update the roadmap's likes in the state
      setRoadmaps(
        roadmaps.map((roadmap) => {
          if (
            roadmap._id === roadmapId &&
            !roadmap.likedBy.some((u) => u._id === user._id)
          ) {
            return {
              ...roadmap,
              likedBy: [...roadmap.likedBy, { _id: user._id }],
            };
          }
          return roadmap;
        })
      );
    } catch (error) {
      console.error("Error liking roadmap:", error);
    }
  };

  const isLikedByUser = (likedBy) => {
    return likedBy.some((like) => like._id === user._id);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      {roadmaps.map((roadmap, index) => (
        <div key={index} className="roadmap-item">
          <div className="roadmap-header">
            <h3 className="roadmap-title">{roadmap.title}</h3>
            <div className="roadmap-likes-section">
              <button
                onClick={() => handleLike(roadmap._id)}
                className="like-icon-button"
              >
                {isLikedByUser(roadmap.likedBy) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
              <span className="roadmap-likes">{roadmap.likedBy.length}</span>
            </div>
          </div>
          <p className="roadmap-description">{roadmap.description}</p>
          <div className="roadmap-dates">
            <span className="roadmap-date">
              Start Date: {new Date(roadmap.startDate).toLocaleDateString()}
            </span>
            <span className="roadmap-date">
              End Date: {new Date(roadmap.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapContent;
