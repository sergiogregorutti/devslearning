"use client";

import { ReactSVG } from 'react-svg';

import "./styles.css";

export default function Heading({
  technology,
}: {
  technology: any;
}) {
  return (
    <div className="heading">
      <div className="container">
        {/*
          <Image
            src={technology.imageWhite}
            width={70}
            height={70}
            alt={technology.name}
          />
          */}
        <ReactSVG
          src={`${technology.imageWhite}?no-cache`}
        />
        <h1>{technology.name}</h1>
      </div>
      <div className="separator"></div>
    </div>
  );
}
