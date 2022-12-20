import { Flex, Image } from "@chakra-ui/react"
import React from "react"

const Navbar: React.FC = () => {
    return (
        <Flex bg="white" height="44px" padding="8px 12px">
            <Flex>
                <Image src="/redditlogo.png" height="30px" />
            </Flex>
        </Flex>
    )
}

export default Navbar