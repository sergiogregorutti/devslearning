import { render, screen, act } from "@testing-library/react";
import Backend from ".";
import { LanguageProvider } from "@/components/context/LanguageContext";

jest.mock("./en", () => ({
  __esModule: true,
  default: () => <div>English Component</div>,
}));

jest.mock("./es", () => ({
  __esModule: true,
  default: () => <div>Spanish Component</div>,
}));

describe("Backend Component", () => {
  const renderWithProvider = async (lang: string) => {
    await act(async () => {
      render(
        <LanguageProvider lang={lang} dictionary={{}}>
          <Backend />
        </LanguageProvider>
      );
    });
  };

  test("renders the English component when lang is 'en'", async () => {
    await renderWithProvider("en");
    expect(screen.getByText("English Component")).toBeInTheDocument();
  });

  test("renders the Spanish component when lang is 'es'", async () => {
    await renderWithProvider("es");
    expect(screen.getByText("Spanish Component")).toBeInTheDocument();
  });

  test("renders the default English component when lang is invalid", async () => {
    await renderWithProvider("fr");
    expect(screen.getByText("English Component")).toBeInTheDocument();
  });
});
