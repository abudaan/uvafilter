import React from "react";
import { TypeFilter } from "../types";
import { Checkbox } from "./Checkbox";
import { Value } from "./Value";

type Props = { data: TypeFilter; facetProperty: string };
export function Filter({ data, facetProperty }: Props) {
  return (
    <div>
      <Checkbox data={data} facetProperty={facetProperty}></Checkbox>
      <Value data={data} facetProperty={facetProperty}></Value>
    </div>
  );
}
