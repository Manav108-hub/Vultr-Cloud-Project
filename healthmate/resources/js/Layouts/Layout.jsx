import React from "react";
import NavBar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
