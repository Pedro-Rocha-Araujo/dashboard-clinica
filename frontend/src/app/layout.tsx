import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
      <ToastContainer />
      </body>
    </html>
  );
}
