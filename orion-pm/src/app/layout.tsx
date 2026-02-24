import "./globals.css";
import { satoshi } from "../fonts/satoshi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${satoshi.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}