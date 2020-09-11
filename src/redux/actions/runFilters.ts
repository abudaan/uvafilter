import { TypeItem, TypeNumberOfPrograms, TypeFilterState, TypeItemsPerFilter } from "../../types";
import { uniq } from "ramda";
import { getItemsPerFilter } from "./getItemsPerFilter";

type Args = {
  filterState: TypeFilterState;
  itemsPerFilter: TypeItemsPerFilter;
  items: TypeItem[];
};
export const runFilters = ({
  itemsPerFilter,
  filterState,
  items,
}: Args): [TypeItem[], TypeNumberOfPrograms] => {
  let numNoFilter = 0;
  const filterArray = Object.entries(filterState).reduce((acc, [k, v]) => {
    const subFilters = Object.entries(filterState[k])
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    acc.push([k, subFilters]);
    if (subFilters.length === 0) {
      numNoFilter += 1;
    }
    return acc;
  }, []);

  let r: TypeItemsPerFilter = { ...itemsPerFilter };

  if (numNoFilter !== Object.keys(filterState).length) {
    filterArray.forEach(f => {
      const [filter1, filters2] = f;
      if (filters2.length > 0) {
        // console.log(filter1, filters2);
        Object.keys(r).forEach(k1 => {
          if (k1 !== filter1) {
            r[k1] = {};
            Object.keys(itemsPerFilter[k1]).forEach(k2 => {
              const items = [...itemsPerFilter[k1][k2]];
              r[k1][k2] = items.filter(item => {
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
                    return true;
                  }
                  return false;
                }
                return true;
              });
            });
          } else {
            // r[filter1] = { ...itemsPerFilter[filter1] };
          }
        });
      }
    });
  } else {
    r = itemsPerFilter;
  }

  console.log(r);
  const numberOfPrograms = {};
  Object.keys(r).forEach(k1 => {
    numberOfPrograms[k1] = {};
    Object.entries(r[k1]).forEach(([k2, v]) => {
      numberOfPrograms[k1][k2] = v.length;
    });
  });

  return [[], numberOfPrograms];
};
