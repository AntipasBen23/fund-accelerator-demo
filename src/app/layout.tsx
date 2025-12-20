import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundraising Readiness Demo",
  description: "Demo-only UI: simulated pitch deck review + fundraising readiness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#ECE7EE",
          color: "#17242D",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(165,45,173,0.12), transparent 60%)," +
              "radial-gradient(1000px 600px at 90% 20%, rgba(70,72,180,0.12), transparent 60%)," +
              "#ECE7EE",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
