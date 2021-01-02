import React, { useState, createContext, useEffect } from "react";
import CreateTeamNav from "./createTeam/createTeamNav";
import DisplayTeams from "./createTeam/displayTeams";
import DisplaySquad from "./createTeam/displaySquad";
import AddTeamMember from "./createTeam/addTeamMember";
import DisplayMember from "./createTeam/displayMember";
import AddItem from "./createTeam/addItem";
const TeamContext = createContext();
export { TeamContext };

function App() {
  const [teamList, setTeamList] = useState([]);
  const [active, setActive] = useState("");
  const [activeMember, setActiveMember] = useState("");
  const [summaryCost, setSummaryCost] = useState(0);

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("data"));
    if (prevData) {
      setTeamList(prevData);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(teamList);
    localStorage.setItem("data", data);
  }, [teamList]);

  return (
    <TeamContext.Provider
      value={{
        teamList,
        setTeamList,
        setActive,
        active,
        activeMember,
        setActiveMember,
        summaryCost,
        setSummaryCost,
      }}
    >
      <main className="all">
        <div className="teams">
          <CreateTeamNav />
          <DisplayTeams />
        </div>
        <div className="members">
          <AddTeamMember />
          <DisplaySquad />
        </div>
        <div className="items">
          <AddItem />
          <DisplayMember />
        </div>
      </main>
    </TeamContext.Provider>
  );
}

export default App;
