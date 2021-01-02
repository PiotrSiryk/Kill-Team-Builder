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

      const total = items.reduce(
        (total, element) => total + Number(element.baseCost),
        Number(baseCost)
      );

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
        <>
          <header>
            <h4>Name: {name}</h4>
            <h4>Base Cost : {baseCost}</h4>
            <h4>Total Cost : {total}</h4>
          </header>

          <div>
            {items.map((el, index) => {
              return (
                <div key={Math.random()}>
                  <h4>{el.name}</h4>
                  <h4>Cost: {el.baseCost}</h4>
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
        </>
      );
    }
  }
  return <div></div>;
}
