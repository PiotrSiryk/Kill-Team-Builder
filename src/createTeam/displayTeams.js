import React, { useContext } from "react";
import { TeamContext } from "../App";
import { ImCross } from "react-icons/im";

export default function DisplayTeams() {
  const { teamList, setTeamList, setActive, active } = useContext(TeamContext);

  const removeTeam = (id) => {
    setTeamList((prev) => {
      return prev.filter((el) => el.id != id);
    });
  };

  return (
    <main>
      {teamList.map((element) => {
        const { name, faction, id } = element;
        return (
          <article
            key={id}
            onClick={() => setActive(id)}
            className={active == id ? "team active-team" : "team"}
          >
            <h4>{name}</h4>
            <h4>{faction}</h4>
            <button onClick={() => removeTeam(id)} className="trash-btn">
              <ImCross />
            </button>
          </article>
        );
      })}
    </main>
  );
}
