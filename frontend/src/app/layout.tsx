import './globals.css'

export const metadata = {
  title: "Bene'nw",
  description: 'Gift Registry Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}