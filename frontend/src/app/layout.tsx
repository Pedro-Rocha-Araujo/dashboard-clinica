import type { Metadata } from "next";
import "./globals.css";

import Dashboard from "../components/navbar/page"

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
        <script src="https://kit.fontawesome.com/ba7c57d421.js"></script>
      </body>
    </html>
  );
}
