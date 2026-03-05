"use client";
import React, { useEffect, useRef, useState } from "react";
import { BoxedIcon, Icons } from "../icons";
import { IoChevronDown } from "react-icons/io5";

export type SelectOption = {
  value: string;
  label: string;
  icon?: keyof typeof Icons;
  iconColor?: string;
  iconBgColor?: string;
};

interface CustomSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const renderIcon = (option?: SelectOption, isSelected?: boolean) => {
    if (!option || !option.icon) return null;

    if (option.iconBgColor) {
      return (
        <BoxedIcon
          icon={option.icon}
          bgColor={option.iconBgColor}
          iconColor={option.iconColor || "text-text-icon"}
        />
      );
    }

    const BaseIcon = Icons[option.icon];
    return (
      <BaseIcon
        size={18}
        className={
          isSelected
            ? "text-accent-primary"
            : option.iconColor || "text-text-icon"
        }
      />
    );
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
      <label className="text-md font-semibold text-text-primary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2.5 
        border border-bg-secondary shadow-sm rounded-md bg-bg-primary 
        cursor-pointer hover:border-blue-500 hover:ring-0.5 hover:ring-blue-500 transition-all" 
      >
        <div className="flex items-center gap-2">
          {renderIcon(selectedOption)}
          <span className={`text-md ${selectedOption ? "text-text-primary" : "text-gray-400"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <IoChevronDown
          size={18}
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 top-[calc(100%+4px)] w-full bg-bg-primary border border-border rounded-md shadow-md overflow-hidden">
          {options.map((option) => {
            const isSelected = value === option.value;

            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-bg-light-blue text-accent-primary font-medium"
                    : "hover:bg-bg-secondary text-text-primary"
                }`}
              >
                {renderIcon(option, isSelected)}
                <span className="text-md">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;