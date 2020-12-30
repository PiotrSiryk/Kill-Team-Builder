import React, { useContext } from "react";
import { TeamContext } from "../App";
import { FaTrash } from "react-icons/fa";

export default function DisplaySquad() {
  const { active, teamList, setActiveMember, setTeamList } = useContext(
    TeamContext
  );
  const find = teamList.find((element) => element.id == active);
  console.log(find);

  const removeMember = (id) => {
    setTeamList((prev) => {
      const fil = find.squad.filter((el) => {
        return el.id != id;
      });
      const mapped = prev.map((element) => {
        if (element === find) {
          return { ...element, squad: fil };
        }
        return element;
      });
      console.log(mapped);
      return mapped;
    });
  };

  return (
    <>
      <div>
        <h4>Name: {find && find.name}</h4>
        <h4>Members {find && find.squad.length}</h4>
      </div>
      <div>
        {find &&
          find.squad.map((element) => {
            return (
              <div
                className="member"
                key={Math.random()}
                onClick={() => setActiveMember(element.id)}
              >
                <h4>{element.name}</h4>
                <h4>{element.baseCost}</h4>
                <h4>{element.id}</h4>
                <button
                  onClick={() => removeMember(element.id)}
                  className="trash-btn"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
