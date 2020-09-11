import { TypeFilterGroup, TypeItem, TypeNumberOfPrograms, TypeFilterState } from "../../types";

const getNumberOfPrograms = (
  filterGroups: TypeFilterGroup[],
  items: TypeItem[]
): TypeNumberOfPrograms => {
  const checkKeys = filterGroups.map(g => g.facetProperty);
  const numberOfPrograms = {};
  items.forEach(val => {
    checkKeys.forEach(key => {
      if (val[key]) {
        val[key].forEach((s: string) => {
          if (!numberOfPrograms[key]) {
            numberOfPrograms[key] = [];
          }
          if (!numberOfPrograms[key][s]) {
            numberOfPrograms[key][s] = 0;
          }
          numberOfPrograms[key][s] = numberOfPrograms[key][s] + 1;
        });
      }
    });
  });
  return numberOfPrograms;
};

const filterItems = (items: TypeItem[], filter: string[]): TypeItem[] => {
  const filteredItems = [];
  const [key1, key2] = filter;
  items.forEach(item => {
    if (item[key1]) {
      const hasKey = item[key1].indexOf(key2) !== -1;
      if (hasKey) {
        filteredItems.push(item);
      }
    }
  });
  return filteredItems;
};

const getNumPrograms = (
  numberOfPrograms: TypeNumberOfPrograms,
  items: TypeItem[],
  checkKeys: string[],
  filter: string[]
): TypeNumberOfPrograms => {
  const res = { ...numberOfPrograms };
  const [f1, f2] = filter;

  items.forEach(item => {
    if (item[f1] && item[f1].indexOf(f2) === -1) {
      checkKeys.forEach(key1 => {
        if (item[key1]) {
          const keys2 = Object.keys(res[key1]);
          keys2.forEach(key2 => {
            if (item[key1].indexOf(key2) !== -1) {
              res[key1][key2] = res[key1][key2] - 1;
            }
          });
        }
      });
    }
  });
  return res;
};

type Args = {
  items: TypeItem[];
  filterState: TypeFilterState;
  filterGroups: TypeFilterGroup[];
};
export const runFilters = ({
  filterState,
  items,
  filterGroups,
}: Args): [TypeItem[], TypeNumberOfPrograms] => {
  const filterArray = Object.entries(filterState).reduce((acc, [k, v]) => {
    const subFilters = Object.entries(filterState[k])
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    subFilters.forEach(k2 => {
      acc.push([k, k2]);
    });
    return acc;
  }, []);

  let filteredItems = [...items];
  filterArray.forEach(f => {
    filteredItems = filterItems(filteredItems, f);
  });

  let numberOfPrograms = getNumberOfPrograms(filterGroups, items);
  filterArray.forEach(f => {
    const [key1] = f;
    const checkKeys = filterGroups.map(f => f.facetProperty).filter(v => v !== key1);
    numberOfPrograms = getNumPrograms(numberOfPrograms, items, checkKeys, f);
  });
  return [filteredItems, numberOfPrograms];
};
