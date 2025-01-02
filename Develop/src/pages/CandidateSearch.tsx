import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [randUser, setRandUser] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState<Candidate | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  useEffect(() => {
    searchGithub().then((users) => {
      setRandUser(users);
      if (users.length > 0) {
        searchGithubUser(users[0].login).then((newUser) => {
          setCurrentUser(newUser);
        });
      }
    });
  }, []);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < randUser.length) {
      setCurrentIndex(nextIndex);
      const nextUserName = randUser[nextIndex].login;

      searchGithubUser(nextUserName).then((newUser) => {
        setCurrentUser(newUser);
        setNoMoreCandidates(false);
      });
    } else {
      setNoMoreCandidates(true);
    }
  };

  const handleSave = () => {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers") || "[]");
    savedUsers.push(currentUser);
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    handleNext();
  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      {currentUser ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4 bg-black">
          <div className="h-48">
            <img
              className="w-full h-full object-cover"
              src={currentUser.avatar_url}
              alt="profile picture not provided"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2">
              {currentUser.login
                ? `${currentUser.name} (${currentUser.login})`
                : "deprecated account"}
            </h2>
            <p className="text-gray-700 text-base">
              Location:{" "}
              {currentUser.location ? currentUser.location : "not provided"}
            </p>
            <p className="text-gray-700 text-base">
              Email: {currentUser.email ? currentUser.email : "not provided"}
            </p>
            <p className="text-gray-700 text-base">
              Company:{" "}
              {currentUser.company ? currentUser.company : "not provided"}
            </p>
            <p className="text-gray-700 text-base">
              Bio: {currentUser.bio ? currentUser.bio : "not provided"}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNext}
              >
                -
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : noMoreCandidates ? (
        <p className="text-center text-gray-600 mt-4">No more candidates</p>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default CandidateSearch;
export default CandidateSearch;
