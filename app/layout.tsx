import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Alquimista — 21 días",
  description: "Una experiencia auditiva de identidad, claridad y acción consciente por Bárbara Beiles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
