"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import Select from "@/components/ui/Select";

export default function Sorting({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const sortBy = params.get("sortBy") || "newest";

  const options = [
    { value: "newest", label: dictionary.technologies.newest },
    { value: "priceHighToLow", label: dictionary.technologies.priceHighToLow },
    { value: "priceLowToHigh", label: dictionary.technologies.priceLowToHigh },
  ];

  const handleChange = (
    newValue: SingleValue<{ value: string; label: any }>
  ) => {
    const value = newValue?.value;
    const params = new URLSearchParams(searchParams);

    if (params.has("page")) {
      params.delete("page");
    }

    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }

    replace(`${pathname}?${decodeURIComponent(params.toString())}`);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Select
          options={options}
          value={options.find((option) => option.value === sortBy) || null}
          handleChange={handleChange}
        />
      ) : null}
    </>
  );
}
