import { DATA } from "../../constants";
import { JSONData, TypeFilterGroup } from "../../types";

export const parseData = (data: JSONData) => {
  const { filters } = data;

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

  return {
    type: DATA,
    payload: {
      filterState: filterGroups.map(f =>
        f.filterOptions.reduce((acc, val) => ({ ...acc, [val.id]: false }), {})
      ),
      filterGroups,
    },
  };
};
