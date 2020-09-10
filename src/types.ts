export type JSONData = {
  title: string;
  subtitle: string;
  filters: TypeFilterGroup[];
  contentType: string;
  items: TypeItem[];
  selectionCriteria: [
    {
      [id: string]: string | string[] | { [id: string]: string };
    }
  ];
  searchBox: boolean;
  calendarEnabled: boolean;
  lexicon: {
    [id: string]: string;
  };
};

export type TypeItem = {
  id: string;
  title: string;
  lead: string;
  programmeLanguage: string[];
  taxonomy: string[];
  programmetype: string[];
  modes_of_study_key: string[];
  area_of_interest: string[];
  starts_in_key: string[];
  entry_requirements_key: [];
};

export type TypeFilter = {
  id: string;
  name: string;
};

export type TypeFilterGroup = {
  title: string;
  facetProperty: string;
  filterOptions: TypeFilter[];
};

export type RootState = {
  width: number;
  height: number;
  checkKeys: string[];
  filterState: {
    [id: string]: {
      [id: string]: boolean;
    };
  };
  filterGroups: TypeFilterGroup[];
  items: TypeItem[];
  numberOfPrograms: {
    [id: string]: {
      [id: string]: number;
    };
  };
  filteredItems: TypeItem[];
};
