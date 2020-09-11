import React from "react";
import { useSelector } from "react-redux";
import uniquid from "uniquid";
import { RootState } from "../types";
import { FilterGroup } from "./FilterGroup";

export function List() {
  const items = useSelector((state: RootState) => state.filteredItems);
  return <h3>{items && `num programs: ${items.length}`}</h3>;
}
