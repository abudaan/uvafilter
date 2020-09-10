import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckbox } from "../redux/actions/selectCheckbox";
import { TypeFilter, RootState } from "../types";

type Props = { data: TypeFilter; facetProperty: string };
export function Checkbox({ data, facetProperty }: Props) {
  const dispatch = useDispatch();
  const checked = useSelector((state: RootState) => state.filterState[facetProperty][data.id]);
  return (
    <span>
      {/* <label>{`${data.name} (${data.id})`}</label> */}
      <label>{data.name}</label>
      <input
        checked={checked}
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
    </span>
  );
}
