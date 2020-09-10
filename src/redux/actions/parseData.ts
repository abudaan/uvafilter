import { DATA } from "../../constants";
import { JSONData, Filter, FilterState } from "../../types";

export const parseData = (data: JSONData) => {
  const { filters } = data;

  const filterState: FilterState[] = filters.map((f: Filter) => {
    const options = f.filterOptions.map(d => {
      const [id, name] = Object.entries(d)[0];
      return {
        id,
        name,
        checked: false,
      };
    });
    return {
      ...f,
      filterOptions: options,
    };
  });

  // console.log(filterState);
  return {
    type: DATA,
    payload: {
      data,
      filterState,
    },
  };
};
