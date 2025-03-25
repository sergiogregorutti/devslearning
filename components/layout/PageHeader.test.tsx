import { render, screen, fireEvent } from "@testing-library/react";
import PageHeader from "./PageHeader";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PageHeader Component", () => {
  const dictionary = {
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

  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    image: "/test-image.jpg",
    breadcrumb: [{ name: "Home", link: "/" }],
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });
  });

  test("renders title and description", () => {
    render(<PageHeader {...defaultProps} dictionary={dictionary} lang="en" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders breadcrumb with one item", () => {
    render(<PageHeader {...defaultProps} dictionary={dictionary} lang="en" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  test("handles go back button correctly", () => {
    render(
      <PageHeader
        {...defaultProps}
        dictionary={dictionary}
        lang="en"
        previousPage={{ name: "Previous" }}
      />
    );

    const goBackButton = screen.getByText("Previous");
    fireEvent.click(goBackButton);

    const router = useRouter();
    expect(router.back).toHaveBeenCalled(); // Verifies that the back function is called
  });

  test("does not show 'Go Back' button if previousPage is not provided", () => {
    render(<PageHeader {...defaultProps} dictionary={dictionary} lang="en" />);

    const goBackButton = screen.queryByText("Previous");
    expect(goBackButton).toBeNull();
  });

  test("hides image on mobile if imageMobileHidden is true", () => {
    render(
      <PageHeader
        {...defaultProps}
        imageMobileHidden={true}
        dictionary={dictionary}
        lang="en"
      />
    );

    const imageContainer = screen.getByAltText("Test Title").parentElement;
    expect(imageContainer).toHaveClass("hidden");
  });

  test("renders image with correct classes", () => {
    render(
      <PageHeader
        {...defaultProps}
        imagePositionMobile="bottom"
        dictionary={dictionary}
        lang="en"
      />
    );

    const image = screen.getByAltText("Test Title");
    expect(image).toHaveClass("h-fit w-[100%] md:w-[80%] md:max-h-[200px]");
  });

  test("applies correct classes for image position (bottom)", () => {
    render(
      <PageHeader
        {...defaultProps}
        imagePositionMobile="bottom"
        dictionary={dictionary}
        lang="en"
      />
    );

    const imageContainer = screen.getByAltText("Test Title").parentElement;
    expect(imageContainer).toHaveClass("mt-6 md:mt-0 order-2");
  });

  test("applies correct classes for image position (top)", () => {
    render(
      <PageHeader
        {...defaultProps}
        imagePositionMobile="top"
        dictionary={dictionary}
        lang="en"
      />
    );

    const imageContainer = screen.getByAltText("Test Title").parentElement;
    expect(imageContainer).toHaveClass("mb-3 md:mb-0 md:order-2");
  });

  test("handles dynamic breadcrumb items", () => {
    render(
      <PageHeader
        {...defaultProps}
        breadcrumb={[
          { name: "Home", link: "/" },
          { name: "Courses", link: "/courses" },
        ]}
        dictionary={dictionary}
        lang="en"
      />
    );

    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Courses" })).toHaveAttribute(
      "href",
      "/courses"
    );
  });

  test("renders the component with default styles when no image is passed", () => {
    render(
      <PageHeader
        {...defaultProps}
        image={undefined}
        dictionary={dictionary}
        lang="en"
      />
    );

    const container = screen.getByText("Test Title").closest("section");
    expect(container).not.toHaveClass("grid");
  });

  test("applies grid classes when image is passed", () => {
    render(<PageHeader {...defaultProps} dictionary={dictionary} lang="en" />);

    const container = screen.getByText("Test Title").closest("section");
    expect(container).toHaveClass("mt-6 sm:mt-10 lg:mt-10 mb-6 lg:mb-10");
  });

  test("handles previousPage being undefined", () => {
    render(<PageHeader {...defaultProps} dictionary={dictionary} lang="en" />);

    const goBackButton = screen.queryByText("Previous");
    expect(goBackButton).toBeNull();
  });
});
