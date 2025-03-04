import { render, screen, act } from "@testing-library/react";
import Backend from ".";

jest.mock("./en", () => ({
  __esModule: true,
  default: () => <div>English Component</div>,
}));

jest.mock("./es", () => ({
  __esModule: true,
  default: () => <div>Spanish Component</div>,
}));

describe("Backend Component", () => {
  test("renders the English component when lang is 'en'", async () => {
    await act(async () => {
      render(<Backend lang="en" />);
    });

    expect(screen.getByText("English Component")).toBeInTheDocument();
  });

  test("renders the Spanish component when lang is 'es'", async () => {
    await act(async () => {
      render(<Backend lang="es" />);
    });

    expect(screen.getByText("Spanish Component")).toBeInTheDocument();
  });

  test("renders the default English component when lang is invalid", async () => {
    await act(async () => {
      render(<Backend lang="fr" />);
    });

    expect(screen.getByText("English Component")).toBeInTheDocument();
  });
});
