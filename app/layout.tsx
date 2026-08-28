import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Alquimista — Manifestación basada en identidad",
  description: "Una experiencia de 21 días para trabajar identidad, reprogramación, regulación, hábitos y acción consciente con Bárbara Beiles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
