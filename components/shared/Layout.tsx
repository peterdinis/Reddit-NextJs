import React from "react";
import Navbar from "../navbar/Navbar";
import Head from "next/head";

interface IProps {
  children?: React.ReactNode;
}

function Layout(props: IProps) {
  return (
    <>
      <Head>
        <title>Reddit - Dive into anything</title>
        <link rel="shortcut icon" href="/images/redditFace.svg" />
      </Head>
      <Navbar />
      {props.children}
    </>
  );
}

export default Layout;
