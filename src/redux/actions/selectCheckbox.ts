import { SELECT_CHECKBOX } from "../../constants";
import { RootState } from "../../types";
import { store } from "../store";
import { getNumberOfPrograms } from "./getNumberOfPrograms";

export const selectCheckbox = ({ facetProperty, id, selected }) => {
  const { items, filterGroups, filterState: oldFilterState } = store.getState() as RootState;

  const filterState = { ...oldFilterState };
  filterState[facetProperty][id] = selected;

  const filteredItems = items.filter(item => {
    const keys1 = Object.keys(filterState);
    let pass = true;
    for (let i = 0; i < keys1.length; i++) {
      const key1 = keys1[i];
      // console.log(key1);
      if (item[key1]) {
        const keys2 = Object.keys(filterState[key1]).filter(k2 => filterState[key1][k2]);
        // console.log(val.title, keys2);
        for (let j = 0; j < keys2.length; j++) {
          const key2 = keys2[j];
          // console.log(key1, key2);
          const hasKey = item[key1].indexOf(key2) !== -1;
          return hasKey;
        }
      }
    }
    // console.log(pass);
    return pass;
  });

  const numberOfPrograms = getNumberOfPrograms(filterGroups, filteredItems);

  return {
    type: SELECT_CHECKBOX,
    payload: {
      filterState,
      numberOfPrograms,
      filteredItems,
    },
  };
};
