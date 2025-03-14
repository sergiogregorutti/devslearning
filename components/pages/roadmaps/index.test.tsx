import { render, screen } from "@testing-library/react";
import Roadmaps from ".";
import { LanguageProvider } from "@/components/context/LanguageContext";

const mockDictionary = {
  roadmaps: {
    title: "Roadmaps",
    description: "Explore the paths to becoming a developer.",
    journeyTitle: "Starting Your Journey",
    journeyDescription: "Learn the basics to start your development journey.",
    rolesTitle: "Roles in Web Development",
    frontendName: "Frontend Developer",
    frontendDescription: "Learn to build the user-facing part of applications.",
    backendName: "Backend Developer",
    backendDescription: "Work on the server-side of applications.",
    fullstackName: "Full Stack Developer",
    fullstackDescription: "Master both frontend and backend technologies.",
    chooseYourPath: "Choose Your Path",
  },
};

jest.mock("@/lib/language", () => ({
  getLocalizedPathFromPrefix: jest
    .fn()
    .mockImplementation((lang, path) => path),
}));

describe("Roadmaps Component", () => {
  const renderWithProvider = (lang: string) => {
    render(
      <LanguageProvider lang={lang} dictionary={mockDictionary}>
        <Roadmaps />
      </LanguageProvider>
    );
  };

  test("renders the correct page title and description", () => {
    renderWithProvider("en");

    expect(screen.getByText(mockDictionary.roadmaps.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockDictionary.roadmaps.description)
    ).toBeInTheDocument();
  });

  test("renders the journey title and description", () => {
    renderWithProvider("en");

    expect(
      screen.getByText(mockDictionary.roadmaps.journeyTitle)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDictionary.roadmaps.journeyDescription)
    ).toBeInTheDocument();
  });

  test("renders roles section with descriptions", () => {
    renderWithProvider("en");

    expect(
      screen.getByText(mockDictionary.roadmaps.rolesTitle)
    ).toBeInTheDocument();

    const frontendName = screen.getAllByText(
      mockDictionary.roadmaps.frontendName
    );
    const frontendDescription = screen.getAllByText(
      mockDictionary.roadmaps.frontendDescription
    );
    const backendName = screen.getAllByText(
      mockDictionary.roadmaps.backendName
    );
    const backendDescription = screen.getAllByText(
      mockDictionary.roadmaps.backendDescription
    );
    const fullstackName = screen.getAllByText(
      mockDictionary.roadmaps.fullstackName
    );
    const fullstackDescription = screen.getAllByText(
      mockDictionary.roadmaps.fullstackDescription
    );

    expect(frontendName[0]).toBeInTheDocument();
    expect(frontendDescription[0]).toBeInTheDocument();
    expect(backendName[0]).toBeInTheDocument();
    expect(backendDescription[0]).toBeInTheDocument();
    expect(fullstackName[0]).toBeInTheDocument();
    expect(fullstackDescription[0]).toBeInTheDocument();
  });

  test("renders correct links for the different paths", () => {
    renderWithProvider("en");

    const links = screen.getAllByRole("link");

    const frontendLink = links.find((link) =>
      link.textContent?.includes(mockDictionary.roadmaps.frontendName)
    );
    const backendLink = links.find((link) =>
      link.textContent?.includes(mockDictionary.roadmaps.backendName)
    );
    const fullstackLink = links.find((link) =>
      link.textContent?.includes(mockDictionary.roadmaps.fullstackName)
    );

    expect(frontendLink).toHaveAttribute("href", "/roadmaps/frontend");
    expect(backendLink).toHaveAttribute("href", "/roadmaps/backend");
    expect(fullstackLink).toHaveAttribute("href", "/roadmaps/fullstack");
  });

  test("applies correct CSS classes to the links", () => {
    renderWithProvider("en");

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass(
        "flex flex-row items-center font-poppins text-white bg-blue-500 rounded-2xl text-[22px] px-[20px] py-[15px] min-h-[100px] transition-all duration-300 hover:bg-blue-600"
      );
    });
  });
});
