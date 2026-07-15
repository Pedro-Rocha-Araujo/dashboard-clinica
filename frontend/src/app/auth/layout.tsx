import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Clínica | Atendimento',
  description: 'Atendimento rápido, prático e organizado em um só lugar.',
  keywords: ["clínica", "sistema", "atendimento", "dashboard"]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
