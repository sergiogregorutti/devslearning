"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Language({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const language = params.get("language") || lang;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("language", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.language}</label>
      <FormControl
        sx={{
          width: {
            xs: "100%",
            sm: "200px",
          },
        }}
      >
        <Select value={language} onChange={handleChange}>
          <MenuItem value={"all"}>{dictionary.technologies.all}</MenuItem>
          <MenuItem value={"en"}>{dictionary.technologies.english}</MenuItem>
          <MenuItem value={"es"}>{dictionary.technologies.spanish}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
