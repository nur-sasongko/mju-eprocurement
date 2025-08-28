import Image from "next/image";

export default function BrandingIcon({
  className = "",
  height = 40,
  width = 88,
  ...props
}: Omit<React.ComponentProps<"img">, "src" > & { height?: number, width?: number }) {
  return (
    <Image
      src="/static/logo/muj.png"
      alt="Logo MUJ"
      width={Number(width)}
      height={Number(height)}
      className={className}
      priority
      {...props}
    />
  );
}
