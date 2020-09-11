import React from "react";
import { useSelector } from "react-redux";
import { RootState, TypeFilter } from "../types";

type Props = { data: TypeFilter; facetProperty: string };
export function Value({ data, facetProperty }: Props) {
  const amount = useSelector((state: RootState): string => {
    if (state.numberOfPrograms === null) {
      return "";
    }
    if (
      typeof state.numberOfPrograms[facetProperty] === "undefined" ||
      typeof state.numberOfPrograms[facetProperty][data.id] === "undefined"
    ) {
      return "";
    }
    return `(${state.numberOfPrograms[facetProperty][data.id]})`;
  });
  return <span>{amount}</span>;
}
