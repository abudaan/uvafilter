import React from "react";
import { useDispatch } from "react-redux";
import { selectCheckbox } from "../redux/actions/selectCheckbox";

export const Checkbox = ({ data, facetProperty }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <label>{data.name}</label>
      <input
        onChange={e => {
          dispatch(
            selectCheckbox({
              facetProperty,
              id: data.id,
              selected: e.target.checked,
            })
          );
        }}
        type="checkbox"
      ></input>
    </div>
  );
};
