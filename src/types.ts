export type JSONData = {
  title: string;
  subtitle: string;
  filters: Filter[];
  contentType: string;
  items: [
    {
      [id: string]: string | string[] | { [id: string]: string };
    }
  ];
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

export type Filter = {
  title: string;
  facetProperty: string;
  filterOptions: { [id: string]: string }[];
};

export type FilterState = {
  title: string;
  facetProperty: string;
  filterOptions: { id: string; name: string; checked: boolean }[];
};

export type RootState = {
  width: number;
  height: number;
  json: JSONData;
  filterState: FilterState;
};
