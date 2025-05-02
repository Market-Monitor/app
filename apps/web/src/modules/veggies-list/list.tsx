"use client";

import { Veggie } from "@mm-app/internal/api";
import { Input } from "@mm-app/ui/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function VeggiesList(props: { data: Veggie[] }) {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <Input
          placeholder="Search..."
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="py-6"
        />
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-3">
        {props.data
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item) => (
            <Link
              key={item.id}
              className="px-4 py-2 border rounded-lg shadow-sm font-medium"
              href={`/prices/${item.id}`}
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
