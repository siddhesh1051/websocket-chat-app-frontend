import React from "react";
import logo from "../assets/logo.png";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../helpers";

const GroupSelector = ({
  groups,
  currentGroup,
  setCurrentGroup,
  addGroup,
  setIsSidebarOpen,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <div className="relative h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center sm:justify-center justify-start px-4 py-2 mb-8">
          <img src={logo} alt="Chat App" className="h-16 rounded-xl" />
        </div>
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="cursor-pointer z-10 absolute right-0 top-0 bg-blue-400/20 p-4 rounded-full sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <button
          onClick={addGroup}
          className="w-full bg-blue-500 text-white py-2 mb-4 rounded-lg"
        >
          Add Group
        </button>
        <div>
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => {
                setIsSidebarOpen(false);
                setCurrentGroup(group.id);
              }}
              className={`w-full py-2 my-1 text-left px-4 rounded-lg ${
                currentGroup === group.id ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default GroupSelector;
