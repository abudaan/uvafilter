import { DATA } from "../../constants";
import { JSONData, TypeFilterGroup, RootState } from "../../types";
import { store } from "../store";
import { getNumberOfPrograms } from "./getNumberOfPrograms";

export const parseData = (data: JSONData) => {
  const { filters, items } = data;

  const filterGroups: TypeFilterGroup[] = filters.map((f: TypeFilterGroup) => {
    const options = f.filterOptions.map(d => {
      const [id, name] = Object.entries(d)[0];
      return {
        id,
        name,
      };
    });
    return {
      ...f,
      filterOptions: options,
    };
  });

  const filterState = filterGroups.reduce((acc, val: TypeFilterGroup) => {
    const options = val.filterOptions.reduce((acc1, val1) => ({ ...acc1, [val1.id]: false }), {});
    return {
      ...acc,
      [val.facetProperty]: { ...options },
    };
  }, {});

  const numberOfPrograms = getNumberOfPrograms(filterGroups, items);
  return {
    type: DATA,
    payload: {
      filterState,
      filterGroups,
      items,
      numberOfPrograms,
    },
  };
};
