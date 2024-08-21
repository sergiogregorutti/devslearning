"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Sorting({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const sortBy = params.get("sortBy") || "priceHighToLow";

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("sortBy", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.sortBy}</label>
      <FormControl
        sx={{
          width: {
            xs: "200px",
            sm: "200px",
          },
        }}
      >
        <Select value={sortBy} onChange={handleChange}>
          <MenuItem value={"priceHighToLow"}>
            {dictionary.technologies.priceHighToLow}
          </MenuItem>
          <MenuItem value={"priceLowToHigh"}>
            {dictionary.technologies.priceLowToHigh}
          </MenuItem>
          <MenuItem value={"newest"}>{dictionary.technologies.newest}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
