"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { FaCaretRight } from "react-icons/fa6";

import "./styles.css";

const Navigation = ({}: {}) => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/" },
    {
      name: "Technologies Categories",
      href: "/admin/technologies-categories/",
    },
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
                {link.name} <FaCaretRight />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
