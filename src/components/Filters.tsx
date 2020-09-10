import React from "react";
import { useSelector } from "react-redux";
import uniquid from "uniquid";
import { RootState } from "../types";
import { FilterGroup } from "./FilterGroup";

export const Filters = () => {
  const filters = useSelector((state: RootState) => state.filterGroups);
  return (
    filters && (
      <>
        {" "}
        {filters.map(f => (
          <FilterGroup key={uniquid()} data={f}></FilterGroup>
        ))}{" "}
      </>
    )
  );
};
