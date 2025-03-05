"use client";

import { useEffect } from "react";
import Smartlook from "smartlook-client";

const initializeSmartlook = () => {
  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    Smartlook.init("bf44692fcb061ad2509652dae2260a7ded59bfac");
  }
};

export default function SmartlookInit() {
  useEffect(() => {
    initializeSmartlook();
  }, []);

  return null;
}
