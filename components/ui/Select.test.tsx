import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  const mockHandleChange = jest.fn();

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  test("renders Select component with options", () => {
    render(
      <Select options={options} value={null} handleChange={mockHandleChange} />
    );

    const selectInput = screen.getByRole("combobox");
    fireEvent.mouseDown(selectInput);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("calls handleChange when an option is selected", async () => {
    render(
      <Select options={options} value={null} handleChange={mockHandleChange} />
    );

    const selectInput = screen.getByRole("combobox");
    fireEvent.mouseDown(selectInput);

    const firstOption = await screen.findByText(options[0].label);
    fireEvent.click(firstOption);

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith({
      label: options[0].label,
      value: options[0].value,
    });
  });

  test("renders the currently selected option", () => {
    render(
      <Select
        options={options}
        value={options[1]}
        handleChange={mockHandleChange}
      />
    );

    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("ensures Select is memoized", () => {
    const { rerender } = render(
      <Select options={options} value={null} handleChange={mockHandleChange} />
    );

    const prevRenderCount = mockHandleChange.mock.calls.length;

    rerender(
      <Select options={options} value={null} handleChange={mockHandleChange} />
    );

    expect(mockHandleChange.mock.calls.length).toBe(prevRenderCount);
  });
});
