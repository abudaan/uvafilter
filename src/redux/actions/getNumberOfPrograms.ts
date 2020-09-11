import { TypeFilterGroup, TypeItem, TypeNumberOfPrograms } from "../../types";

export const getNumberOfPrograms = (
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
