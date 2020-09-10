import { compose, applyMiddleware, createStore, Store, AnyAction } from "redux";
import { createLogger } from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { rootReducer } from "./reducer";
import { RootState } from "../types";

const initialState: RootState = {
  width: 0,
  height: 0,
  items: [],
  filterState: null,
  filterGroups: null,
  numberOfPrograms: null,
  checkKeys: [
    "area_of_interest",
    "modes_of_study_key",
    "programmeLanguage",
    "programmetype",
    "starts_in_key",
    "taxonomy",
  ],
  filteredItems: null,
};

// const store: Store<any, AnyAction> = createStore(
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
  // compose(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })))
);

export { store };
