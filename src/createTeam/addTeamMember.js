import React, { useContext, useState } from "react";
import { TeamContext } from "../App";

export default function AddTeamMember() {
  const { active, teamList, setTeamList } = useContext(TeamContext);
  const find = teamList.find((element) => element.id == active);
  const [current, setCurrent] = useState({ name: "", baseCost: 0, items: [] });

  const addMember = () => {
    setTeamList((prev) => {
      const mapped = prev.map((el) =>
        el == find ? { ...el, squad: [...el.squad, current] } : el
      );
      return mapped;
    });
    setTeamList((prev) => {
      const indexed = prev.map((element) => {
        const stuff = element.squad.map((el, index) => {
          return { ...el, id: index };
        });
        return { ...element, squad: stuff };
      });
      return indexed;
    });
  };

  return (
    <nav>
      <div>
        <label htmlFor="member-name">Name</label>
        <input
          type="text"
          id="member-name"
          onChange={(event) =>
            setCurrent((prev) => {
              return {
                name: event.target.value,
                baseCost: prev.baseCost,
                items: [],
              };
            })
          }
        />
      </div>
      <div>
        <label htmlFor="member-cost">cost</label>
        <input
          type="number"
          id="member-cost"
          max="100"
          onChange={(event) =>
            setCurrent((prev) => {
              return {
                name: prev.name,
                baseCost: event.target.value,
                items: [],
              };
            })
          }
        />
      </div>
      <button onClick={() => addMember()}>add member</button>
    </nav>
  );
}
