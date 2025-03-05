import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { getLocalizedPathFromPrefix } from "@/lib/language";

jest.mock("smartlook-client", () => ({
  Smartlook: {
    initialized: jest.fn().mockReturnValue(false),
    init: jest.fn(),
  },
}));

// Mock para el getLocalizedPathFromPrefix
jest.mock("@/lib/language", () => ({
  getLocalizedPathFromPrefix: jest.fn((lang, path) => path),
}));

const mockDictionary = {
  common: {
    navigation: {
      home: "Home",
      courses: "Courses",
      technologies: "Technologies",
      roadmaps: "Roadmaps",
      about: "About",
    },
  },
};

describe("Footer Component", () => {
  const lang = "en";

  beforeEach(() => {
    // Resetear mocks antes de cada test
    jest.clearAllMocks();
  });

  test("renders the correct navigation links", () => {
    render(<Footer dictionary={mockDictionary} lang={lang} />);

    const homeLink = screen.getByText("Home");
    const coursesLink = screen.getByText("Courses");
    const technologiesLink = screen.getByText("Technologies");
    const roadmapsLink = screen.getByText("Roadmaps");
    const aboutLink = screen.getByText("About");

    expect(homeLink).toBeInTheDocument();
    expect(coursesLink).toBeInTheDocument();
    expect(technologiesLink).toBeInTheDocument();
    expect(roadmapsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test("Smartlook is initialized only in production", async () => {
    process.env.NODE_ENV = "production";

    render(<Footer dictionary={mockDictionary} lang={lang} />);

    // Verifica si Smartlook.init() fue llamado
    const { Smartlook } = require("smartlook-client");
    expect(Smartlook.init).toHaveBeenCalledTimes(1);

    // Simula un cambio a otro entorno (desarrollo)
    process.env.NODE_ENV = "development";

    render(<Footer dictionary={mockDictionary} lang={lang} />);

    expect(Smartlook.init).toHaveBeenCalledTimes(1);
  });

  test("renders the correct classes for the footer links", () => {
    render(<Footer dictionary={mockDictionary} lang={lang} />);

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveClass("text-gray-400");
      expect(link).toHaveClass("hover:text-gray-600");
    });
  });

  test("navigates correctly when clicking on links", () => {
    render(<Footer dictionary={mockDictionary} lang={lang} />);

    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);
    expect(getLocalizedPathFromPrefix).toHaveBeenCalledWith("en", "/");
  });
});
