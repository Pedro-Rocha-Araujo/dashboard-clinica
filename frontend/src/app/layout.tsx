import type { Metadata } from "next";
import "./globals.css";

import Dashboard from "../components/page"

export const metadata: Metadata = {
  title: "Clínica",
  description: "Gerar senha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <Dashboard />
          {children}
        </main>
      </body>
    </html>
  );
}
