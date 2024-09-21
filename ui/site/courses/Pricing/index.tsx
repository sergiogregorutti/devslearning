"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Pricing({
  stats,
  dictionary,
}: {
  stats: any;
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pricing = params.get("pricing");

  const handleChange = () => {
    const paid = (document.getElementById("pricingPaid") as HTMLInputElement)
      ?.checked;
    const free = (document.getElementById("pricingFree") as HTMLInputElement)
      ?.checked;

    let pricingValue = "";
    if (paid) {
      pricingValue = pricingValue.concat("paid,");
    }
    if (free) {
      pricingValue = pricingValue.concat("free");
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("pricing", encodeURIComponent(pricingValue) || "");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.price}</label>
      <div className="options">
        <label className="ckeckbox-wrapper">
          {dictionary.technologies.pricingPaid}{" "}
          {stats.paidCourses !== undefined ? `(${stats.paidCourses})` : null}
          <input
            type="checkbox"
            id="pricingPaid"
            onChange={handleChange}
            defaultChecked={pricing?.includes("paid") ? true : false}
          />
          <span className="checkmark"></span>
        </label>
        <label className="ckeckbox-wrapper">
          {dictionary.technologies.pricingFree}{" "}
          {stats.freeCourses !== undefined ? `(${stats.freeCourses})` : null}
          <input
            type="checkbox"
            id="pricingFree"
            onChange={handleChange}
            defaultChecked={pricing?.includes("free") ? true : false}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}
