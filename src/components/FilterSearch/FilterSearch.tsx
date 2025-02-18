"use client";

import { useId, useState } from "react";
import Input from "../Input/Input";
import FluentSearch16Filled from "~icons/fluent/search-16-filled";
import { useDebouncedCallback } from "use-debounce";
import { onUpdateValueSingle, SEARCH_PARAM_SEARCH, ValidSearchParams } from "@/utils/searchParams";
import { useRouter, useSearchParams } from "next/navigation";

interface Props<T extends 'Pet' | 'Toy'> {
  searchParams: ValidSearchParams<T>
}

export default function FilterSearch<T extends 'Pet' | 'Toy'>({
  searchParams
}: Props<T>) {
  const [value, setValue] = useState(searchParams[SEARCH_PARAM_SEARCH]);
  const id = useId();
  const allSearchParams = useSearchParams()
  const router = useRouter()

  const updateSearchParams = useDebouncedCallback(
    (v: string) => {
      onUpdateValueSingle(
        SEARCH_PARAM_SEARCH,
        v,
        allSearchParams,
        router
      )
    },
    500
  )

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    updateSearchParams(e.target.value)
  }

  return (
    <Input
      id={id}
      value={value}
      label="Search"
      placeholder="Search for animals"
      icon={<FluentSearch16Filled />}
      onChange={onChange}
    />
  );
}
