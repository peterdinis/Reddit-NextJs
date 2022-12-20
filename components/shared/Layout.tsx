import React from "react"
import Navbar from "./navbar/Navbar";

interface IProps {
    children?: React.ReactNode;
}

function Layout(props: IProps) {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}

export default Layout