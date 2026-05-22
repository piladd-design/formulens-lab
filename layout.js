import "./styles.css";

export const metadata = {
  title: "FORMULENS LAB",
  description: "Clinical cosmetic intelligence for skincare formulas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
