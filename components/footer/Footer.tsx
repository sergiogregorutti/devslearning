"use client";
import React, { useEffect } from "react";

import Smartlook from "smartlook-client";

import "./styles.css";

export default function Footer({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  useEffect(() => {
    if (!Smartlook.initialized()) {
      Smartlook.init("bf44692fcb061ad2509652dae2260a7ded59bfac");
    }
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <div className="container">
          Devs Learning {new Date().getFullYear()}
          <span className="separator">|</span>
          <span>
            {dictionary.footer.createdBy}{" "}
            <a href="https://github.com/sergiogregorutti/" target="_blank">
              @sergiogregorutti
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
