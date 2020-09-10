import React from "react";
import { useSelector } from "react-redux";
import { RootState, TypeFilter } from "../types";

type Props = { data: TypeFilter; facetProperty: string };
export function Value({ data, facetProperty }: Props) {
  const amount = useSelector((state: RootState) =>
    state.numberOfPrograms === null ? 0 : state.numberOfPrograms[facetProperty][data.id]
  );
  return <span>{`(${amount})`}</span>;
}
