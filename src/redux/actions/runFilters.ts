import { uniq } from "ramda";
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
  const [key1, keys2] = filter;
  items.forEach(item => {
    if (item[key1]) {
      for (let i = 0; i < keys2.length; i++) {
        const hasKey = item[key1].indexOf(keys2[i]) !== -1;
        if (hasKey) {
          filteredItems.push(item);
        }
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

// export const runFilters = ({
//   filterState,
//   items,
//   filterGroups,
// }: Args): [TypeItem[], TypeNumberOfPrograms] => {
//   const filterArray = Object.entries(filterState).reduce((acc, [k, v]) => {
//     const subFilters = Object.entries(filterState[k])
//       .filter(([k, v]) => v)
//       .map(([k, v]) => k);
//     subFilters.forEach(k2 => {
//       acc.push([k, k2]);
//     });
//     return acc;
//   }, []);

//   let fi = [...items];
//   const filteredItems = [];
//   filterArray.forEach(f => {
//     filteredItems.push(...filterItems(fi, f));
//   });

//   // let numberOfPrograms = getNumberOfPrograms(filterGroups, items);
//   // filterArray.forEach(f => {
//   //   const [key1] = f;
//   //   const checkKeys = filterGroups.map(f => f.facetProperty).filter(v => v !== key1);
//   //   numberOfPrograms = getNumPrograms(numberOfPrograms, items, checkKeys, f);
//   // });
//   // console.log(filteredItems);
//   let numberOfPrograms = getNumberOfPrograms(filterGroups, uniq(filteredItems));
//   console.log(uniq(filteredItems).length);

//   return [filteredItems, numberOfPrograms];
// };

const itemsPerFilter = (filterState: TypeFilterState, items: TypeItem[]) => {
  const r = {};
  const keys1 = Object.keys(filterState);
  keys1.forEach(k1 => {
    const keys2 = Object.keys(filterState[k1]);
    r[k1] = {};
    keys2.forEach(k2 => {
      r[k1][k2] = [];
      items.forEach(item => {
        if (item[k1]) {
          if (item[k1].indexOf(k2) !== -1) {
            r[k1][k2].push(item);
          }
        }
      });
    });
  });
  return r;
};

export const runFilters = ({
  items,
  filterState,
  filterGroups,
}: Args): [TypeItem[], TypeNumberOfPrograms] => {
  const r = itemsPerFilter(filterState, items);
  // console.log(r);
  const keys1 = Object.keys(filterState);
  keys1.forEach(k => {});

  const filterArray = Object.entries(filterState).reduce((acc, [k, v]) => {
    const subFilters = Object.entries(filterState[k])
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    acc.push([k, subFilters]);
    return acc;
  }, []);

  const checkKeys = filterGroups.map(g => g.facetProperty);
  // console.log(filterArray);

  filterArray.forEach(f => {
    const [filter1, filters2] = f;
    if (filters2.length > 0) {
      checkKeys.forEach(k1 => {
        if (k1 !== filter1) {
          Object.keys(r[k1]).forEach(k2 => {
            const items = r[k1][k2];
            r[k1][k2] = items.filter(item => {
              if (item[filter1]) {
                // console.log(filter1, item[filter1], item.title);
                for (let i = 0; i < filters2.length; i++) {
                  const filter2 = filters2[i];
                  if (item[filter1].indexOf(filter2) === -1) {
                    return false;
                  }
                }
              }
              return true;
            });
          });
        }
      });
    }
  });

  console.log(r);

  // let fi = [...items];
  // const filteredItems = {};
  // let numFiltered = 0;
  // filterArray.forEach(f => {
  //   filteredItems[f[0]] = [];
  //   filteredItems[f[0]].push(...filterItems(fi, f));
  //   filteredItems[f[0]] = uniq(filteredItems[f[0]]);
  //   numFiltered += filteredItems[f[0]].length;
  // });

  // const checkKeys = filterGroups.map(g => g.facetProperty);
  // checkKeys.forEach(k => {
  //   const fKeys = checkKeys.filter(k1 => k1 !== k);
  //   const sum = [];
  //   fKeys.forEach(k2 => {
  //     // console.log(k, filteredItems[k2]);
  //     sum.push(...filteredItems[k2]);
  //   });
  //   const uSum = uniq(sum);
  //   uSum.filter(item => {
  //     if (item[k]) {
  //       const fKeys2 = checkKeys[k];
  //       for (let i = 0; i < fKeys2; i++) {
  //         if (item[k].indexOf(fKeys2[i]) !== -1) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   });
  //   console.log(k, uSum.length);
  // });

  return [[], getNumberOfPrograms(filterGroups, items)];
};
