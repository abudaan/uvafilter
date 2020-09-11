import React from "react";
import uniqid from "uniqid";
import { TypeFilterGroup } from "../types";
import { Filter } from "./Filter";

type Props = { data: TypeFilterGroup };
export function FilterGroup({ data }: Props) {
  // console.log(data);
  return (
    <div className="filter-group">
      <h4>{data.title}</h4>
      {data.filterOptions.map(d => (
        <Filter key={uniqid()} data={d} facetProperty={data.facetProperty}></Filter>
      ))}
    </div>
  );
}
