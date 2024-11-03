import NavBar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";
import React from "react";

export default function GuestLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
