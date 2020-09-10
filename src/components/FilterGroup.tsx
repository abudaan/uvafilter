import React from "react";
import uniquid from "uniquid";
import { TypeFilterGroup } from "../types";
import { Filter } from "./Filter";

type TypeProps = { data: TypeFilterGroup };
export const FilterGroup = ({ data }: TypeProps) => {
  // console.log(data);
  return (
    <>
      <h4>{data.title}</h4>
      {data.filterOptions.map(d => (
        <Filter key={uniquid()} data={d} facetProperty={data.facetProperty}></Filter>
      ))}
    </>
  );
};
