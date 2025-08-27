const mimeLabels: Record<string, string> = {
  "application/pdf": "PDF",
  "application/msword": "Word (.doc)",
  "application/vnd.google-apps.document": "Google Docs",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Word (.docx)",
  "application/vnd.ms-excel": "Excel (.xls)",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Excel (.xlsx)",
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/gif": "GIF",
  "image/webp": "WEBP",
  "image/jpg": "JPG",
};

export const getMimeLabel = (mime: string): string => {
  return mimeLabels[mime] || mime;
};

export const renderMimeLabels = (accept: string[] | string): string => {
  if (Array.isArray(accept)) {
    return accept.map(getMimeLabel).join(", ");
  }
  return getMimeLabel(accept);
};

export const isImageMimeType = (urlOrFile: string | File): boolean => {
  // Cek dari ekstensi url jika string
  if (typeof urlOrFile === "string") {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(urlOrFile);
  }
  // Cek dari file.type jika File
  if (urlOrFile instanceof File) {
    return urlOrFile.type.startsWith("image/");
  }
  return false;
};
