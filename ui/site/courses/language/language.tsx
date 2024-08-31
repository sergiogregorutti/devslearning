"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SingleValue } from 'react-select';
import Select from "@/ui/common/Select";

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

  const options = [
    { value: 'all', label: dictionary.technologies.all },
    { value: 'en', label: dictionary.technologies.english },
    { value: 'es', label: dictionary.technologies.spanish }
  ];

  const handleChange = (newValue: SingleValue<{ value: string; label: any; }>) => {
    const value = newValue?.value;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("language", value || 'en');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.language}</label>
      <div className="form-control">
        <Select options={options} value={options.find((option) => option.value === language)} handleChange={handleChange} />
      </div>
    </div>
  );
}
