import "./globals.css";
import ClientProvider from "./ClientProvider";

export const metadata = {
  title: "5KSANA | Bitcoin-Inspired Art & Fashion",
  description:
    "Discover Bitcoin-inspired art & fashion by 5KSANA. Unique crypto paintings, sculptures & designs blending blockchain culture with creativity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
