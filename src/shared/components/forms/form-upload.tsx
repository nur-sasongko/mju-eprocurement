import React, { useCallback, useState } from "react";
import { useController, Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/lib/cn";
import {
  UploadIcon,
  XIcon,
  FileIcon,
} from "lucide-react";
import FieldMessage from "./field-message";
import { useSonner } from "@/shared/hooks/use-sonner";
import { renderMimeLabels } from "@/shared/utils/files";

type fileMeta = {
  id: number | string | null | undefined;
  name: string;
}
interface FormUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string[];
  maxSize?: number; // in MB
  maxFiles?: number;
  description?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  fileMeta?: fileMeta[]; // Optional array of filenames for URLs
  onDownload?: (id: string | number) => void; // Optional callback for download action
}

export function FormUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  multiple = false,
  accept,
  maxSize = 5, // 5MB by default
  maxFiles = 5,
  description,
  containerClassName,
  labelClassName,
  errorClassName,
  fileMeta = [],
  onDownload,
}: FormUploadProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [dragOver, setDragOver] = useState(false);
  const { sonner } = useSonner();

  const maxSizeInBytes = maxSize * 1024 * 1024;

  const handleFileChange = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const filesArray = Array.from(newFiles);
      const currentFiles = field.value || [];

      // Validate file type if accept is provided
      if (accept && accept.length > 0) {
        const invalidTypeFiles = filesArray.filter(file => !accept.includes(file.type));
        if (invalidTypeFiles.length > 0) {
          sonner.error(`Format file tidak didukung. Format yang diterima: ${renderMimeLabels(accept)}`);
          return;
        }
      }

      // Validate file size
      const invalidFiles = filesArray.filter(file => file.size > maxSizeInBytes);
      if (invalidFiles.length > 0) {
        sonner.error(`File terlalu besar. Maksimal ${maxSize}MB per file.`);
        return;
      }

      // Combine with existing files
      const combinedFiles = multiple ? [...currentFiles, ...filesArray] : filesArray;

      // Check max files limit
      if (combinedFiles.length > maxFiles) {
        sonner.error(`Maksimal ${maxFiles} file yang dapat diunggah.`);
        return;
      }

      field.onChange(combinedFiles);
    },
    [field, multiple, maxFiles, maxSizeInBytes, sonner, maxSize, accept]
  );

  const removeFile = useCallback(
    (index: number) => {
      const currentFiles = field.value || [];
      const newFiles = currentFiles.filter((_: unknown, i: number) => i !== index);
      field.onChange(newFiles);
    },
    [field]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled) {
        handleFileChange(e.dataTransfer.files);
      }
    },
    [handleFileChange, disabled]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const files = field.value || [];

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label
          className={cn(
            "block text-sm font-medium text-gray-700",
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}

      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-gray-300",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="text-sm text-gray-600 mb-4">
          <p className="font-medium">
            Seret dan letakkan file di sini, atau{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-primary"
              disabled={disabled}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = multiple;
                input.accept = accept ? accept.join(",") : "";
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  handleFileChange(target.files);
                };
                input.click();
              }}
            >
              pilih file
            </Button>
          </p>

          {accept && accept.length > 0 && (
            <p className="text-xs text-gray-500">
              Format: {renderMimeLabels(accept)}
            </p>
          )}

          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">File/URL Terpilih:</Label>
          <div className="space-y-2">
            {files.map((item: File | string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <FileIcon className="h-8 w-8 text-gray-400" />
                  <div>
                    {item instanceof File ? (
                      <>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(item.size)}
                        </p>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="link"
                          className="text-sm font-medium text-blue-600 hover:underline p-0"
                          onClick={() => {
                            if (onDownload) {
                              onDownload(fileMeta[index]?.id || item);;
                            }
                          }}
                        >
                          {fileMeta[index]?.name || "File Lampiran"}
                        </Button>
                        <p className="text-xs text-gray-500">✅ Sudah diunggah</p>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="text-red-500 hover:text-red-700"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <FieldMessage
          className={cn("flex items-center gap-1", errorClassName)}
          message={error.message}
        />
      )}
    </div>
  );
}
