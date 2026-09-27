import './globals.css'

export const metadata = {
  title: 'Gemini Media Generator',
  description: 'Generate images and videos with Google Gemini API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
