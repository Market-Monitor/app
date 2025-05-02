"use client";

import { useSearchData } from "@/providers/searchbar-data-provider";
import SearchBarResults from "./search-results";

export default function SearchBar(props: { onSelectAction?: () => void }) {
  const { data } = useSearchData();

  return (
    <>
      <SearchBarResults data={data} onSelectAction={props.onSelectAction} />
    </>
  );
}
