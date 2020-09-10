import React from "react";
import uniquid from "uniquid";
import { TypeFilter } from "../types";
import { Checkbox } from "./Checkbox";
import { Value } from "./Value";

type Props = { data: TypeFilter; facetProperty: string };
export function Filter({ data, facetProperty }: Props) {
  return (
    <div>
      <Checkbox key={uniquid()} data={data} facetProperty={facetProperty}></Checkbox>
      <Value key={uniquid()} data={data} facetProperty={facetProperty}></Value>
    </div>
  );
}
