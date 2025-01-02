import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        display: "flex",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{
          marginRight: "2rem",
        }}
      >
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/SavedCandidates">Saved Candidates</NavLink>
      </div>
    </div>
  );
};

export default Nav;
