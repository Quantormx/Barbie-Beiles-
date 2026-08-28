import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Alquimista — Actúa desde la certeza",
  description: "El ritual auditivo de 21 días para pasar de actuar desde la carencia a elegir desde la certeza, por Bárbara Beiles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
