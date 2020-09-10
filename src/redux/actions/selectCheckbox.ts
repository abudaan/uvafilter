import { SELECT_CHECKBOX } from "../../constants";
import { JSONData, TypeFilterGroup } from "../../types";

export const selectCheckbox = ({ facetProperty, id, selected }) => {
  console.log(facetProperty, id, selected);
  return {
    type: SELECT_CHECKBOX,
    payload: {},
  };
};
