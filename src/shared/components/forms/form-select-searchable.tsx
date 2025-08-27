import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useController, Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import FieldMessage from "./field-message";
import { cn } from "@/lib/cn";
import { Check, ChevronsUpDown, SearchIcon, Loader2Icon } from "lucide-react";
import { useDebounce } from "@/shared/hooks/use-debounce";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectSearchableProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  options?: SelectOption[]; // optional, initial options
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  onSearch?: (keyword: string) => void; // server side fetch
}

export function FormSelectSearchable<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  options: initialOptions = [],
  label,
  placeholder = "Pilih opsi",
  required = false,
  disabled = false,
  description,
  containerClassName,
  labelClassName,
  selectClassName,
  errorClassName,
  showLoadMore = false,
  onLoadMore,
  loading = false,
  onSearch,
}: FormSelectSearchableProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>();

  const [searchOptions, setSearchOptions] = useState<SelectOption[]>(initialOptions);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  // Sync options if parent changes initialOptions
  useEffect(() => {
    setSearchOptions(initialOptions);
  }, [initialOptions]);

  // Debounced value for search
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === "" && !onSearch) {
      setSearchOptions(initialOptions);
      return;
    }

    if (onSearch) {
      onSearch(debouncedSearchTerm);
    } else {
      // fallback client side filter
      setSearchOptions(
        initialOptions.filter(opt =>
          opt.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }
  }, [debouncedSearchTerm, onSearch, initialOptions]);

  // Find selected label
  const selectedLabel =
    field.value && searchOptions.find((opt) => opt.value === field.value)?.label;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "block text-sm font-medium text-gray-700",
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between overflow-auto",
              !field.value && "text-muted-foreground",
              selectClassName,
              error && "border-red-500 focus:ring-red-300 focus:border-red-500"
            )}
            disabled={disabled}
            id={name}
          >
            {selectedLabel || placeholder}
            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            minWidth: popoverWidth ? `${popoverWidth}px` : undefined,
          }}
          className="p-0"
        >
          <Command>
            <div className="relative">
              <CommandInput
                placeholder={`Cari ${label?.toLowerCase() || "opsi"}...`}
                className="h-9 pr-10"
                onValueChange={setSearchTerm}
              />
              {(loading) && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
                </span>
              )}
            </div>
            <CommandList>
              <CommandEmpty>Tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {searchOptions.map((option, idx) => (
                  <React.Fragment key={option.value}>
                    <CommandItem
                      value={option.label}
                      disabled={option.disabled}
                      onSelect={() => {
                        field.onChange(option.value);
                      }}
                      className={cn(
                        idx % 2 === 1 && "bg-muted/60", // striped
                        option.value === field.value && "font-semibold",
                        "transition-colors border-b border-gray-200 hover:bg-gray-100 rounded-none",
                      )}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                    {onLoadMore && showLoadMore && !loading && idx === searchOptions.length - 1 && (
                      <div className="flex justify-center py-2 w-full">
                        <Button size="sm" variant="ghost" type="button" onClick={onLoadMore}>
                          <SearchIcon className="h-4 w-4" />
                          Cari lebih banyak
                        </Button>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {description && !error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {error && (
        <FieldMessage
          className={cn("", errorClassName)}
          message={error.message}
        />
      )}
    </div>
  );
}
