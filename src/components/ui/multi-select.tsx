
import React, { useState, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxDisplayItems?: number;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  maxDisplayItems,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = (selectedValue: string) => {
    onChange(selected.filter((value) => value !== selectedValue));
  };

  const handleSelect = useCallback((selectedValue: string) => {
    const isSelected = selected.includes(selectedValue);
    if (isSelected) {
      onChange(selected.filter((value) => value !== selectedValue));
    } else {
      onChange([...selected, selectedValue]);
    }
  }, [selected, onChange]);

  // Limit the number of displayed selected items
  const displaySelected = maxDisplayItems
    ? selected.slice(0, maxDisplayItems)
    : selected;
  const remainingCount = maxDisplayItems
    ? Math.max(0, selected.length - maxDisplayItems)
    : 0;

  // Get label for a value
  const getLabel = (value: string) => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : value;
  };

  // Prevent closing popover when clicking inside
  const handlePopoverInteraction = (e: Event) => {
    // Allow interaction within the popover content
    if ((e.target as HTMLElement).closest('[cmdk-input-wrapper]') ||
        (e.target as HTMLElement).closest('[cmdk-item]')) {
      e.preventDefault();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between px-3 py-2 h-auto min-h-10",
              selected.length > 0 ? "h-auto" : "",
              disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={() => !disabled && setOpen(!open)}
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {selected.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {displaySelected.map((value) => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {getLabel(value)}
                  <button
                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(value);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge variant="secondary">+{remainingCount}</Badge>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onInteractOutside={handlePopoverInteraction}
        >
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder} 
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => {
                        handleSelect(option.value);
                        // Don't close the popover when selecting an item
                        setInputValue("");
                      }}
                      className={cn(
                        option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                        "flex items-center gap-2"
                      )}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!option.disabled) {
                            handleSelect(option.value);
                          }
                        }}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MultiSelect;
