import { useState, useEffect } from "react";
import Candidate from "../interfaces/Candidate.interface";


const SavedCandidates = () => {
  const [savedUser, setSavedUser] = useState<Candidate[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("savedUsers") || "[]");
    setSavedUser(users);
  }, []);

  const deleteUser = (index: number) => {
    const updatedUsers = savedUser.filter((_, i) => i !== index);

    // Update the state and local storage
    setSavedUser(updatedUsers);
    localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
  };
  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedUser.length > 0
        ? savedUser.map((user, index) => (
            <div
              key={index}
              className="flex flex-row  justify-around border border-gray-300 py-2"
            >
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Image</p>
                <img
                  className="w-16 h-16 rounded-full mt-2"
                  src={user.avatar_url}
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Name</p>
                <p>
                  <span>{user.name}</span>{" "}
                  {user.name ? `(${user.login})` : user.login}
                </p>
              </div>
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Location</p>
                <p>{user.location ? user.location : "not provided"}</p>
              </div>
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Email</p>
                <p>{user.email ? user.email : "not provided"}</p>
              </div>
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Company</p>
                <p>{user.company ? user.company : "not provided"}</p>
              </div>
              <div className="flex flex-col items-center justify-start w-1/6 border-r border-gray-300">
                <p className="font-semibold underline">Bio</p>
                <p className="break-normal">
                  {user.bio ? user.bio : "not provided"}
                </p>
              </div>
              <div className="flex flex-col items-center justify-start w-1/6">
                <p className="font-semibold underline">Reject</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => deleteUser(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        : "no users saved yet"}
    </div>
  );
};

export default SavedCandidates;
