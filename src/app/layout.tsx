import  ".//globals.css";

import Header from "./components/header";


export default function Layout({ children }) {
  return (
<html lang="en">  {/* The <html> tag defines the root of the document */}

      <body>
      <Header />
        {children}  {/* This is where your page content goes */}
      </body>
    </html>
  )
}