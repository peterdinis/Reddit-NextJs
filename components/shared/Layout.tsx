import React from "react"
import Navbar from "./navbar/Navbar";
import Meta from "./Meta";

interface IProps {
    children?: React.ReactNode;
}

function Layout(props: IProps) {
    return (
        <>
            <Meta 
                title="Reddit - Dive into anything"
                image="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq"
            />
            <Navbar />
            {props.children}
        </>
    )
}

export default Layout