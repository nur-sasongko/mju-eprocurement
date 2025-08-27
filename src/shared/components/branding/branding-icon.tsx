import Image from "next/image";

export default function BrandingIcon({
  size = 48,
  className = "",
  ...props
}: Omit<React.ComponentProps<"img">, "src" | "width" | "height"> & { size?: number }) {
  return (
    <Image
      src="/static/favicon/android-chrome-512x512.png"
      alt="Branding Icon"
      width={Number(size)}
      height={Number(size)}
      className={className}
      priority
      {...props}
    />
  );
}
