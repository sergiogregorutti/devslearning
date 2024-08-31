"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
      <FaMagnifyingGlass />
      <input type="email" className="form-input" onChange={(e) => {
          handleSearch(e.target.value);
        }} defaultValue={searchParams.get("query")?.toString()} />
    </div>
  );
}
