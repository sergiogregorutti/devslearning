"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Pricing({
  stats,
  dictionary,
}: {
  stats: any
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pricing = params.get("pricing");

  const handleChange = () => {
    const oneTimePayment = (document.getElementById('pricingOneTimePayment') as HTMLInputElement)?.checked;
    const subscription = (document.getElementById('pricingSubscription') as HTMLInputElement)?.checked;
    const free = (document.getElementById('pricingFree') as HTMLInputElement)?.checked;

    let pricingValue = "";
    if (oneTimePayment) {
      pricingValue = pricingValue.concat("one-time-payment,");
    }
    if (subscription) {
      pricingValue = pricingValue.concat("subscription,");
    }
    if (free) {
      pricingValue = pricingValue.concat("free");
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("pricing", encodeURIComponent(pricingValue) || '');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.price}</label>
      <label className="ckeckbox-wrapper">
        {dictionary.technologies.pricingPaid} {stats.paidCourses !== undefined ? `(${stats.paidCourses})` : null}
        <input type="checkbox" id="pricingOneTimePayment" onChange={handleChange} defaultChecked={pricing?.includes('one-time-payment') ? true : false} />
        <span className="checkmark"></span>
      </label>
      <label className="ckeckbox-wrapper">
        {dictionary.technologies.pricingSubscription} {stats.subscriptionCourses !== undefined ? `(${stats.subscriptionCourses})` : null}
        <input type="checkbox" id="pricingSubscription" onChange={handleChange} defaultChecked={pricing?.includes('subscription') ? true : false} />
        <span className="checkmark"></span>
      </label>
      <label className="ckeckbox-wrapper">
        {dictionary.technologies.pricingFree} {stats.freeCourses !== undefined ? `(${stats.freeCourses})` : null}
        <input type="checkbox" id="pricingFree" onChange={handleChange} defaultChecked={pricing?.includes('free') ? true : false} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
