import React from "react";
import { useController, Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/lib/cn";
import FieldMessage from "./field-message";

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
}

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  description,
  required = false,
  disabled = false,
  containerClassName,
  labelClassName,
  checkboxClassName,
  errorClassName,
}: FormCheckboxProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={field.value || false}
          onCheckedChange={field.onChange}
          disabled={disabled}
          className={cn(checkboxClassName)}
        />
        {label && (
          <Label
            htmlFor={name}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
      </div>

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
