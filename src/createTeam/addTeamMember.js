import React, { useContext, useState, useEffect } from "react";
import { TeamContext } from "../App";

export default function AddTeamMember() {
  const {
    active,
    teamList,
    setTeamList,
    summaryCost,
    setSummaryCost,
  } = useContext(TeamContext);
  const find = teamList.find((element) => element.id == active);
  const [current, setCurrent] = useState({ name: "", baseCost: 0, items: [] });

  useEffect(() => {
    let cost = 0;
    if (find) {
      const test = find.squad.forEach((el) => {
        cost += Number(el.baseCost);
        el.items.forEach((item) => {
          cost += Number(item.baseCost);
        });
      });
    }
    setSummaryCost(cost);
  }, [teamList, active]);

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
          maxLength="20"
          spellCheck="false"
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
          spellCheck="false"
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
      <button onClick={() => addMember()} className="create-btn">
        add member
      </button>
    </nav>
  );
}
