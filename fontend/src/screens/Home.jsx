import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [message, setMessage] = useState("");

  function createProject(e) {
    e.preventDefault();
    if (!projectName.trim()) {
      setMessage("Project name is required");
      return;
    }

    console.log("📌 Creating project:", projectName);
    setMessage(`Project "${projectName}" created successfully!`);

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setProjectName(""); // reset input
    setIsModalOpen(false); // close modal
  }

  return (
    <main className="p-4">
      <div className="projects mb-4">
        <button
          className="project p-4 border border-slate-300 rounded-md hover:bg-gray-100"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="ri-links-line text-xl"></i> Create Project
        </button>
      </div>

      {message && (
        <div className="mb-4 text-green-600 font-medium">{message}</div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

            <form onSubmit={createProject}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-indigo-500 text-black px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Create
              </button>
            </form>

            <button
              onClick={() => {
                setIsModalOpen(false);
                setMessage("");
              }}
              className="mt-4 w-full text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
