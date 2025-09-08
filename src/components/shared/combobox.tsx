"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: ComboboxOption | null;
  defaultValue?: ComboboxOption | null;
  onValueChange?: (option: ComboboxOption | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  buttonClassName,
  contentClassName,
  disabled = false,
  fullWidth = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] =
    React.useState<ComboboxOption | null>(value ?? defaultValue ?? null);

  // Sync controlled value
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value ?? null);
    }
  }, [value]);

  const handleValueChange = (newOption: ComboboxOption) => {
    const isSame = internalValue?.value === newOption.value;
    const finalOption = isSame ? null : newOption;
    setInternalValue(finalOption);
    onValueChange?.(finalOption);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            fullWidth ? "w-full" : "w-[200px]",
            "justify-between",
            buttonClassName
          )}
        >
          {internalValue ? internalValue.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          fullWidth ? "w-full" : "w-[200px]",
          "p-0",
          contentClassName
        )}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // for filtering
                  onSelect={() => handleValueChange(option)} // return full object
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      internalValue?.value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
