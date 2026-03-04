import type { Metadata } from "next";
import "./erp/globals.css";

export const metadata: Metadata = {
    title: "Amiruddaula Islamia Degree College",
    description:
        "Amiruddaula Islamia Degree College — Excellence in Education since establishment.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
