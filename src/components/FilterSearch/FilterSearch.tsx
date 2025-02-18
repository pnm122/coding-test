"use client";

import { useId, useState } from "react";
import Input from "../Input/Input";
import FluentSearch16Filled from "~icons/fluent/search-16-filled";

export default function FilterSearch() {
  const [value, setValue] = useState("");
  const id = useId();

  return (
    <Input
      id={id}
      value={value}
      label="Search"
      placeholder="Search for animals"
      icon={<FluentSearch16Filled />}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
