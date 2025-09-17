import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baby Meal Planner",
  description:
    "Plan and track your baby's meals with recipe integration and calendar sync",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
