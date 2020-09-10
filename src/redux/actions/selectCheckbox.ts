import { SELECT_CHECKBOX } from "../../constants";
import { RootState } from "../../types";
import { store } from "../store";

export const selectCheckbox = ({ facetProperty, id, selected }) => {
  const {
    items,
    checkKeys,
    filterGroups,
    filterState: oldFilterState,
  } = store.getState() as RootState;

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

  const numberOfPrograms = filterGroups.reduce((acc, val) => {
    const options = val.filterOptions.reduce((acc1, val1) => {
      return { ...acc1, [val1.id]: 0 };
    }, {});
    return {
      ...acc,
      [val.facetProperty]: options,
    };
  }, {});

  filteredItems.forEach(val => {
    checkKeys.forEach(key => {
      if (val[key]) {
        val[key].forEach((s: string) => {
          if (numberOfPrograms[key] && numberOfPrograms[key][s] >= 0) {
            numberOfPrograms[key][s] = numberOfPrograms[key][s] + 1;
          }
        });
      }
    });
  });

  return {
    type: SELECT_CHECKBOX,
    payload: {
      filterState,
      numberOfPrograms,
      filteredItems,
    },
  };
};
