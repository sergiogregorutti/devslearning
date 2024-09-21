"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import Select from "@/ui/common/Select";

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
    params.set("page", "1");
    params.set("sortBy", value || "newest");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.sortBy}</label>
      <div className="form-control">
        <Select
          options={options}
          value={options.find((option) => option.value === sortBy)}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
