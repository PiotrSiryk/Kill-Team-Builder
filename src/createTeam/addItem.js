import React, { useContext, useState } from "react";
import { TeamContext } from "../App";

export default function AddItem() {
  const { active, activeMember, teamList, setTeamList } = useContext(
    TeamContext
  );
  const [current, setCurrent] = useState({ name: "", cost: 0 });

  const team = teamList.find((element) => element.id == active);
  let member;
  if (team) {
    member = team.squad.find((element) => element.id == activeMember);
  }

  const addItem = () => {
    setTeamList((prev) => {
      const mapped = prev.map((element) => {
        if (element === team) {
          const members = element.squad.map((el, index) => {
            if (el === member) {
              return {
                ...el,
                items: [...el.items, { ...current, id: index }],
              };
            }
            return el;
          });
          return { ...element, squad: members };
        }
        return element;
      });
      return mapped;
    });
  };

  return (
    <nav>
      <div>
        <label htmlFor="item-name">Item</label>
        <input
          type="text"
          id="item-name"
          onChange={(event) =>
            setCurrent((prev) => {
              return {
                name: event.target.value,
                baseCost: prev.baseCost,
              };
            })
          }
        />
      </div>
      <div>
        <label htmlFor="item-cost">cost</label>
        <input
          type="number"
          id="item-cost"
          max="100"
          onChange={(event) =>
            setCurrent((prev) => {
              return {
                name: prev.name,
                baseCost: event.target.value,
              };
            })
          }
        />
      </div>
      <button onClick={() => addItem()}>add item</button>
    </nav>
  );
}
