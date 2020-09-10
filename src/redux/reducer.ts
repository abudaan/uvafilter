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
    const { json, filterState } = action.payload;
    return {
      ...state,
      json,
      filterState,
    };
  }
  return state;
};
