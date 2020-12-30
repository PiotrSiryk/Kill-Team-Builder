import React, { useContext } from "react";
import { TeamContext } from "../App";
import { FaTrash } from "react-icons/fa";

export default function DisplayMember() {
  const { active, activeMember, teamList, setTeamList } = useContext(
    TeamContext
  );

  const team = teamList.find((element) => element.id == active);
  let member;
  if (team) {
    member = team.squad.find((element) => element.id == activeMember);
    if (member) {
      const { name, baseCost, items, id } = member;

      const removeItem = (id) => {
        setTeamList((prev) => {
          const mapped = prev.map((element) => {
            if (element === team) {
              const stuff = element.squad.map((el) => {
                if (el === member) {
                  const indexed = el.items.map((item, index) => {
                    return { ...item, id: index };
                  });
                  const fil = indexed.filter((item) => item.id !== id);
                  return { ...el, items: fil };
                }
                return el;
              });
              return { ...element, squad: stuff };
            }
            return element;
          });
          return mapped;
        });
      };
      return (
        <div>
          <h4>{id}</h4>
          <h4>{name}</h4>
          <h4>{baseCost}</h4>
          <div>
            {items.map((el, index) => {
              return (
                <div key={Math.random()}>
                  <h5>{el.name}</h5>
                  <h5>{el.baseCost}</h5>
                  <button
                    onClick={() => removeItem(index)}
                    className="trash-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
  return <div></div>;
}
