import { render, screen } from "@testing-library/react";
import Roadmaps from ".";
import { getLocalizedPathFromPrefix } from "@/lib/language";

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
  test("renders the correct page title and description", () => {
    render(<Roadmaps lang="en" dictionary={mockDictionary} />);

    expect(screen.getByText(mockDictionary.roadmaps.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockDictionary.roadmaps.description)
    ).toBeInTheDocument();
  });

  test("renders the journey title and description", () => {
    render(<Roadmaps lang="en" dictionary={mockDictionary} />);

    expect(
      screen.getByText(mockDictionary.roadmaps.journeyTitle)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDictionary.roadmaps.journeyDescription)
    ).toBeInTheDocument();
  });

  test("renders roles section with descriptions", () => {
    render(<Roadmaps lang="en" dictionary={mockDictionary} />);

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
    render(<Roadmaps lang="en" dictionary={mockDictionary} />);

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
    render(<Roadmaps lang="en" dictionary={mockDictionary} />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass(
        "font-poppins text-white text-center text-[22px] p-4 min-h-[100px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-2xl transition-all duration-500"
      );
    });
  });
});
