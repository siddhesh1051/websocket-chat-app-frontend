import React, { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import "./index.css";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(1);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups && storedGroups.length > 0) {
      setGroups(storedGroups);
      setCurrentGroup(storedGroups[0].id);
    } else {
      const defaultGroup = [{ id: 1, name: "Group 1" }];
      setGroups(defaultGroup);
      localStorage.setItem("groups", JSON.stringify(defaultGroup));
    }
  }, []);

  const addGroup = () => {
    const newGroup = {
      id: groups.length + 1,
      name: `Group ${groups.length + 1}`,
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setCurrentGroup(newGroup.id);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    setIsSidebarOpen(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="sm:hidden p-4 absolute">
        {!isSidebarOpen ? (
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="cursor-pointer z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </div>
        ) : (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        )}
      </div>
      <div
        className={`sm:w-1/4 w-full ${
          isSidebarOpen ? "absolute " : "hidden md:block"
        } left-0 top-0 bg-gray-800 text-white p-4 h-full`}
      >
        <GroupSelector
          groups={groups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
          addGroup={addGroup}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="sm:w-3/4 w-full bg-gray-100 p-4 flex flex-col">
        <MessageList currentGroup={currentGroup} />
        <MessageInput currentGroup={currentGroup} />
      </div>
    </div>
  );
};

export default App;
