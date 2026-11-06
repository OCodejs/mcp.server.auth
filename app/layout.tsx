import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Auth — Secure Identity Portal",
  description: "Cổng xác thực tập trung, an toàn cho các dịch vụ MCP.",
  applicationName: "MCP Auth",
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.95,
  minimumScale: 0.95,
  maximumScale: 0.95,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#070809"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
