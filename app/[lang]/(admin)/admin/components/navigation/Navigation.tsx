"use client";
import Link from "next/link";

import "./styles.css";

const Navigation = ({}: {}) => {
  return (
    <div className="navigation">
      <ul className="menu">
        <li className="item">
          <Link href="/admin">Dashboard</Link>
        </li>
        <li className="item">
          <Link href="/admin/technologies">Technologies</Link>
        </li>
        <li className="item">
          <Link href="/admin/courses">Courses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
