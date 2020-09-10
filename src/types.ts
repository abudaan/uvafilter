export type JSONData = {
  title: string;
  subtitle: string;
  filters: TypeFilterGroup[];
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

export type TypeFilter = { [id: string]: string };

export type TypeFilterGroup = {
  title: string;
  facetProperty: string;
  filterOptions: TypeFilter[];
};

export type RootState = {
  width: number;
  height: number;
  filters: { [id: string]: boolean }[];
  filterGroups: TypeFilterGroup[];
};
