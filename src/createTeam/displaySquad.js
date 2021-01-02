import React, { useContext } from "react";
import { TeamContext } from "../App";
import { GiHarryPotterSkull } from "react-icons/gi";

export default function DisplaySquad() {
  const {
    active,
    teamList,
    setActiveMember,
    setTeamList,
    activeMember,
    summaryCost,
  } = useContext(TeamContext);
  const find = teamList.find((element) => element.id == active);

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
      return mapped;
    });
  };

  return (
    <>
      <header>
        <h4>Name: {find && find.name}</h4>
        <h4>Members: {find && find.squad.length}</h4>
        <h4>Cost: {summaryCost}</h4>
      </header>
      <div>
        {find &&
          find.squad.map((element) => {
            if (element) {
              const { id, name, baseCost, items } = element;
              let total = items.reduce(
                (total, element) => total + Number(element.baseCost),
                Number(baseCost)
              );
              return (
                <div
                  className={
                    activeMember == id ? "member active-member" : "member"
                  }
                  key={id}
                  onClick={() => setActiveMember(id)}
                >
                  <h4>{name}</h4>
                  <h4>cost: {total}</h4>
                  <button
                    onClick={() => removeMember(id)}
                    className="trash-btn"
                  >
                    <GiHarryPotterSkull />
                  </button>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
