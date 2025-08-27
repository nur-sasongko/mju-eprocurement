import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";
import { id as localeId } from "date-fns/locale";

// Date formatting
export const formatDate = (
  date: string | Date,
  formatString: string = "dd MMM yyyy"
): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "Invalid Date";
    return format(dateObj, formatString, { locale: localeId });
  } catch {
    return "Invalid Date";
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, "dd MMM yyyy, HH:mm");
};

export const formatDateShort = (date: string | Date): string => {
  return formatDate(date, "dd/MM/yyyy");
};

export const formatTimeAgo = (date: string | Date): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "Invalid Date";
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: localeId });
  } catch {
    return "Invalid Date";
  }
};

// Number formatting
export const formatCurrency = (
  amount: number,
  currency: string = "IDR",
  locale: string = "id-ID"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (
  number: number,
  locale: string = "id-ID"
): string => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatPercentage = (
  decimal: number,
  locale: string = "id-ID"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(decimal);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// String formatting
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format Indonesian phone number
  if (cleaned.startsWith("62")) {
    return `+${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(
      5,
      9
    )}-${cleaned.slice(9)}`;
  }

  if (cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  }

  return phone;
};

export const formatName = (firstName: string, lastName?: string): string => {
  const first = firstName.trim();
  const last = lastName?.trim();

  if (!last) return first;
  return `${first} ${last}`;
};

export const formatInitials = (name: string): string => {
  const names = name.trim().split(" ");
  const initials = names
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return initials;
};

export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => capitalizeFirst(word))
    .join(" ");
};

// Social media formatting
export const formatMention = (username: string): string => {
  return username.startsWith("@") ? username : `@${username}`;
};

export const formatHashtag = (tag: string): string => {
  return tag.startsWith("#") ? tag : `#${tag}`;
};
