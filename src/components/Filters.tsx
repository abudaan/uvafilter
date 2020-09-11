import React from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { RootState } from "../types";
import { FilterGroup } from "./FilterGroup";

export function Filters() {
  const filters = useSelector((state: RootState) => state.filterGroups);
  return (
    filters && (
      <div className="filters">
        {filters.map(f => (
          <FilterGroup key={uniqid()} data={f}></FilterGroup>
        ))}
      </div>
    )
  );
}
