import React, { useContext, useState } from "react";
import "./Todo.css";
import UserContext from "../Context/UserContext";
import { fetchData } from "../api/FetchData";
import { toast } from "react-toastify";

const Todo = () => {
  const { announcements, reloadUser } = useContext(UserContext);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState(false); // New state for filter status
  const [activeFilter, setActiveFilter] = useState("new"); // New state for active filter button
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const toggleFilterCompleted = (status) => {
    setFilterCompleted(status);
    setActiveFilter(status ? "done" : "new");
  };

  const getTodosFromAnnouncements = () => {
    return announcements.reduce((todos, announcement) => {
      return [...todos, ...announcement.todos];
    }, []);
  };

  const todos = getTodosFromAnnouncements();

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter todos based on completion status and search query
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery) ||
      todo.description.toLowerCase().includes(searchQuery);
    return todo.completed === filterCompleted && matchesSearch;
  });

  // Function to handle todo item click
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo); // Set the clicked todo as the selected todo
  };

  const descriptionWithBreaks = selectedTodo?.description
    .split("·")
    .map((item, index) =>
      index > 0 ? (
        <p key={index}>{"· " + item.trim()}</p>
      ) : (
        <p key={index}>{item.trim()}</p>
      )
    );

  const markTodoAsCompleted = async (todoId) => {
    try {
      await fetchData(`admin/updateTodoCompletion/${todoId}`, "POST");
      await reloadUser();
      toast.success("Todo marked as completed");
      setSelectedTodo(null); // Set selectedTodo to null to clear the view
    } catch (error) {
      console.error("Failed to mark todo as completed:", error);
      toast.error("Failed to mark todo as completed");
    }
  };
  console.log(selectedTodo);
  return (
    <div className="todo-container">
      <div className="todo-search">
        <input
          type="text"
          className="todo-search-bar"
          placeholder="Search tasks..."
          onChange={handleSearchChange} // Set onChange handler
        />
        <div className="todo-control">
          <button
            className={activeFilter === "new" ? "active" : ""}
            onClick={() => toggleFilterCompleted(false)}
          >
            New
          </button>
          <button
            className={activeFilter === "done" ? "active" : ""}
            onClick={() => toggleFilterCompleted(true)}
          >
            Done
          </button>
        </div>
        <div className="todo-list">
          {filteredTodos.map((todo, index) => (
            <div
              key={index}
              className={`todo-item ${
                selectedTodo?._id === todo._id ? "selected" : ""
              }`}
              onClick={() => handleTodoClick(todo)}
            >
              <h3>{todo.title}</h3>
              <p>Please click to view</p>
            </div>
          ))}
        </div>
      </div>
      {selectedTodo && (
        <div className="todo-view">
          <div className="todo-info">
            <h1>{selectedTodo.title}</h1>
            {descriptionWithBreaks}

            {/* Conditional rendering to hide the button if todo is completed */}
            {!selectedTodo.completed && (
              <button onClick={() => markTodoAsCompleted(selectedTodo._id)}>
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
