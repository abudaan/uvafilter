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
    const { filterState, filterGroups, items, numberOfPrograms } = action.payload;
    // console.log(filterState);
    return {
      ...state,
      items,
      filterState,
      filterGroups,
      numberOfPrograms,
    };
  } else if (action.type === SELECT_CHECKBOX) {
    const { filterState, numberOfPrograms, filteredItems } = action.payload;
    // console.log(filterState);
    return {
      ...state,
      filterState,
      numberOfPrograms,
      filteredItems,
    };
  }
  return state;
};
