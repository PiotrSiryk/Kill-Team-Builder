import React, { useState, useContext } from "react";
import { TeamContext } from "../App";

export default function CreateTeamNav() {
  const [current, setCurrent] = useState({
    id: "",
    name: "",
    faction: "",
    squad: [],
  });
  const { teamList, setTeamList } = useContext(TeamContext);

  const addTeam = () => {
    setTeamList((prev) => [...prev, current]);
    setTeamList((prev) => {
      const mapped = prev.map((element, index) => {
        let squadMembers = [];
        if (element.squad) {
          squadMembers = element.squad;
        }
        return { ...element, id: index, squad: squadMembers };
      });
      return mapped;
    });
  };

  return (
    <>
      <h1>Create New Team</h1>
      <nav>
        <div>
          <label htmlFor="add-team-name">Name</label>
          <input
            spellCheck="false"
            maxLength="25"
            type="text"
            id="add-team-name"
            onChange={(event) =>
              setCurrent((prev) => {
                return { name: event.target.value, faction: prev.faction };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="add-faction-name">Faction</label>
          <input
            spellCheck="false"
            maxLength="15"
            type="text"
            id="add-faction-name"
            onChange={(event) =>
              setCurrent((prev) => {
                return { name: prev.name, faction: event.target.value };
              })
            }
          />
        </div>
        <div>
          <button onClick={() => addTeam()} className="create-btn">
            Create
          </button>
        </div>
      </nav>
    </>
  );
}
