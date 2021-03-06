import { SELECT_CHECKBOX } from "../../constants";
import { RootState } from "../../types";
import { store } from "../store";
import { runFilters } from "./runFilters";

export const selectCheckbox = ({ facetProperty, id, selected }) => {
  const { items, filterState: oldFilterState } = store.getState() as RootState;

  const filterState = { ...oldFilterState };
  filterState[facetProperty][id] = selected;

  const [filteredItems, numberOfPrograms] = runFilters({
    items,
    filterState,
  });

  return {
    type: SELECT_CHECKBOX,
    payload: {
      filterState,
      filteredItems,
      numberOfPrograms,
    },
  };
};
