import { ChangeEvent } from "react";

export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  className?: string;
  children: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  disabled,
  defaultChecked,
  checked,
  onChange,
  id,
  className = "",
  children,
}) => (
  <div className={`w-full flex items-center gap-2 cursor-pointer ${className}`}>
    <input
      className="
        peer relative appearance-none shrink-0 w-[20px] h-[20px] border border-blue-500 rounded-sm bg-white
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
        checked:bg-blue-500 checked:border-0
        disabled:border-neutral-200 disabled:bg-neutral-200 cursor-pointer
      "
      type="checkbox"
      disabled={disabled}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={onChange}
      id={id}
    />
    <svg
      className="absolute mt-[2px] ml-[2px] w-[16px] h-[16px] pointer-events-none hidden peer-checked:block stroke-white outline-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    {children}
  </div>
);

export default Checkbox;
