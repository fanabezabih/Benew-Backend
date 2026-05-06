import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </AuthProvider>

      </body>
    </html>
  );
}