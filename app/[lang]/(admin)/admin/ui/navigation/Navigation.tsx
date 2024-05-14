"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import "./styles.css";

const Navigation = ({}: {}) => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/" },
    {
      name: "Technologies",
      href: "/admin/technologies/",
    },
    { name: "Courses", href: "/admin/courses/" },
  ];

  return (
    <div className="navigation">
      <ul className="menu">
        {links.map((link) => {
          return (
            <li
              key={link.name}
              className={clsx("item", {
                active: pathname === link.href,
              })}
            >
              <Link href={link.href}>
                {link.name} <ArrowRightIcon />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
