"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import "./styles.css";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="search-wrapper">
      <SearchIcon />
      <TextField
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        type="email"
        defaultValue={searchParams.get("query")?.toString()}
        className="form-input"
      />
    </div>
  );
}
