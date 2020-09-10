import { DATA } from "../../constants";
import { JSONData, TypeFilterGroup, RootState } from "../../types";
import { store } from "../store";

export const parseData = (data: JSONData) => {
  const { filters, items } = data;
  const { checkKeys } = store.getState() as RootState;

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

  const numberOfPrograms = filterGroups.reduce((acc, val) => {
    const options = val.filterOptions.reduce((acc1, val1) => {
      return { ...acc1, [val1.id]: 0 };
    }, {});
    return {
      ...acc,
      [val.facetProperty]: options,
    };
  }, {});

  items.forEach(val => {
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
    type: DATA,
    payload: {
      filterState,
      filterGroups,
      items,
      numberOfPrograms,
    },
  };
};
