import { TypeItem, TypeNumberOfPrograms, TypeFilterState, TypeItemsPerFilter } from "../../types";
import { getItemsPerFilter } from "./getItemsPerFilter";

type Args = {
  filterState: TypeFilterState;
  items: TypeItem[];
  // itemsPerFilter: TypeItemsPerFilter;
};
export const runFilters = ({ items, filterState }: Args): [TypeItem[], TypeNumberOfPrograms] => {
  const itemsPerFilter = getItemsPerFilter(filterState, items);

  const filterArray = Object.entries(filterState).reduce((acc, [k, v]) => {
    const subFilters = Object.entries(filterState[k])
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    acc.push([k, subFilters]);
    return acc;
  }, []);

  // const filteredItems = {};
  filterArray.forEach(f => {
    const [filter1, filters2] = f;
    if (filters2.length > 0) {
      // console.log(filter1, filters2);
      Object.keys(itemsPerFilter).forEach(k1 => {
        if (k1 !== filter1) {
          Object.keys(itemsPerFilter[k1]).forEach(k2 => {
            const items = [...itemsPerFilter[k1][k2]];
            // console.log(k1, k2);
            // const items = r[k1][k2];
            itemsPerFilter[k1][k2] = items.filter(item => {
              if (item[filter1]) {
                // console.log(filter1, item[filter1], item.title);
                let f = 0;
                for (let i = 0; i < filters2.length; i++) {
                  const filter2 = filters2[i];
                  if (item[filter1].indexOf(filter2) !== -1) {
                    // console.log(filter1, item[filter1], filter2);
                    f += 1;
                  }
                }
                if (f >= 1) {
                  // filteredItems[item.id] = item;
                  return true;
                }
                return false;
              }
              // filteredItems[item.id] = item;
              return true;
            });
          });
        }
      });
    }
  });

  const filterItems = (items: TypeItem[], filter: string[]): TypeItem[] => {
    const result = {};
    const [filter1, filters2] = filter;
    items.forEach(item => {
      if (item[filter1]) {
        for (let i = 0; i < filters2.length; i++) {
          const filter2 = filters2[i];
          const hasKey = item[filter1].indexOf(filter2) !== -1;
          if (hasKey) {
            result[item.id] = item;
          }
        }
      }
    });
    return Object.values(result);
  };

  let filtered = [...items];
  const filteredItems = {};
  filterArray.forEach(f => {
    const [, filters2] = f;
    if (filters2.length !== 0) {
      const r = filterItems(filtered, f);
      filtered = r;
      // console.log(r.length);
      // if (r.length !== 0) {
      //   filtered = r;
      // }
    }
  });
  filtered.forEach(item => {
    filteredItems[item.id] = item;
  });

  const numberOfPrograms = {};
  Object.keys(itemsPerFilter).forEach(k1 => {
    numberOfPrograms[k1] = {};
    Object.entries(itemsPerFilter[k1]).forEach(([k2, v]) => {
      numberOfPrograms[k1][k2] = v.length;
    });
  });

  return [Object.values(filteredItems), numberOfPrograms];
};
