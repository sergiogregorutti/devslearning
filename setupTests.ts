import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import * as nextNavigation from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    prefetch: jest.fn(),
    asPath: "/",
    query: {},
    back: jest.fn(),
  }),
}));
