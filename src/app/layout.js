import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import styles from "../app/styles/Layout.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={styles.html}>
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
        <title>PokeNext</title>
      </head>
      <body>
        <Navbar />
        <main className={styles.central_content}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
