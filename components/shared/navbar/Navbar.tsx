import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import SearchInput from "./SearchInput"
import Directory from "./Directory"
import RightSidebar from "./RightSidebar"

const Navbar: React.FC = () => {
    return (
        <Flex bg="white" height="44px" padding="8px 12px">
            <Flex align="center">
                <Image src="https://raw.githubusercontent.com/shadeemerhi/reddit-clone-yt/dcaa8c107fb638b0541aca5d7aba9a49e70a7f81/public/images/redditFace.svg" height="30px" />
                <Image src="https://raw.githubusercontent.com/shadeemerhi/reddit-clone-yt/dcaa8c107fb638b0541aca5d7aba9a49e70a7f81/public/images/redditText.svg" height="46px" display={{
                    base: "none", // mobile base size
                    md: "unset" // display none
                }} />
            </Flex>
            <Directory />
            <SearchInput />
            <RightSidebar />
        </Flex>
    )
}

export default Navbar