import { TypeItem, TypeFilterState, TypeItemsPerFilter } from "../../types";

export const getItemsPerFilter = (
  filterState: TypeFilterState,
  items: TypeItem[]
): TypeItemsPerFilter => {
  const r = {};
  const keys1 = Object.keys(filterState);
  keys1.forEach(k1 => {
    const keys2 = Object.keys(filterState[k1]);
    r[k1] = {};
    keys2.forEach(k2 => {
      r[k1][k2] = [];
      items.forEach(item => {
        if (item[k1]) {
          if (item[k1].indexOf(k2) !== -1) {
            r[k1][k2].push(item);
          }
        }
      });
    });
  });
  return r;
};
