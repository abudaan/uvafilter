import { RootState } from "../types";
import { RESIZE, DATA, SELECT_CHECKBOX } from "../constants";

export const rootReducer = (
  state: RootState,
  action: { type: string; payload: { [id: string]: any } }
): RootState => {
  if (action.type === RESIZE) {
    const { width, height } = action.payload;
    return {
      ...state,
      width,
      height,
    };
  } else if (action.type === DATA) {
    const { items, filteredItems, filterState, filterGroups, numberOfPrograms } = action.payload;
    return {
      ...state,
      items,
      filteredItems,
      filterState,
      filterGroups,
      numberOfPrograms,
    };
  } else if (action.type === SELECT_CHECKBOX) {
    const { filterState, numberOfPrograms, filteredItems } = action.payload;
    return {
      ...state,
      filterState,
      numberOfPrograms,
      filteredItems,
    };
  }
  return state;
};
