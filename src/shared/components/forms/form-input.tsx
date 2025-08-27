import React from "react";
import { useController, Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/lib/cn";
import FieldMessage from "./field-message";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  description?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClickIconLeft?: () => void;
  onClickIconRight?: () => void;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = "text",
  description,
  containerClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  className,
  iconLeft,
  iconRight,
  onClickIconLeft,
  onClickIconRight,
  ...props
}: FormInputProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const hasLeftIcon = !!iconLeft;
  const hasRightIcon = !!iconRight;

  const handleNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  };

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

      <div className="relative">
        {iconLeft && (
          <span
            className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
            onClick={onClickIconLeft}
            tabIndex={onClickIconLeft ? 0 : -1}
            role={onClickIconLeft ? "button" : undefined}
          >
            {iconLeft}
          </span>
        )}

        <Input
          {...field}
          {...props}
          id={name}
          type={type}
          placeholder={placeholder}
          onInput={type === "number" || type === "tel" ? handleNumericInput : undefined}
          className={cn(
            error && "border-red-500 focus:ring-red-300 focus:border-red-500",
            hasLeftIcon && "pl-10",
            hasRightIcon && "pr-10",
            disabled && "opacity-50 cursor-not-allowed",
            inputClassName,
            className
          )}
        />

        {iconRight && (
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={
              onClickIconRight
                ? onClickIconRight
                : undefined
            }
            tabIndex={onClickIconRight || type === "password" ? 0 : -1}
            role={onClickIconRight || type === "password" ? "button" : undefined}
          >
            {iconRight}
          </span>
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
