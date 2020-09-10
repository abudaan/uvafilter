import { RootState } from "../types";
import { RESIZE, DATA } from "../constants";

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
    const { filters, filterGroups } = action.payload;
    // console.log(filterState);
    return {
      ...state,
      filters,
      filterGroups,
    };
  }
  return state;
};
