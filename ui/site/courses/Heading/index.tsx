"use client";

import { ReactSVG } from "react-svg";

import "./styles.css";

export default function Heading({ technology }: { technology: any }) {
  return (
    <div className="heading">
      <div className="container">
        <h1>{technology.name}</h1>
      </div>
    </div>
  );
}
