import React from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { RootState } from "../types";

export function List() {
  const items = useSelector((state: RootState) => state.filteredItems);
  return (
    <div className="list">
      <h4>{items && `Resultaten: ${items.length}`}</h4>
      {items && (
        <div className="item-container">
          {items.map((item, i) => (
            <div key={uniqid()} className="item">
              <h4>{`[${i + 1}] ${item.title}`}</h4>
              <div>{item.lead}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
