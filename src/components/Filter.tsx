import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types";
import { Checkbox } from "./Checkbox";
import { Value } from "./Value";

export const Filter = ({ data, facetProperty }) => {
  // console.log(data, facetProperty);
  return (
    <>
      <Checkbox data={data} facetProperty={facetProperty}></Checkbox>
      <Value></Value>
    </>
  );
};
