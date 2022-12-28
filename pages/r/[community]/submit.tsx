import { NextPage } from "next";
import PageContent from "../../../components/shared/PageContent";
import NewPostForm from "../../../components/posts/NewPostForm";
import AboutWrapper from "../../../components/posts/AboutWrapper";
import { Box, Text } from "@chakra-ui/react";

const SubmitPage: NextPage = () => {
    return (
        <PageContent>
          <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>Create a Post</Text>
            </Box>
            <NewPostForm />
          </>
          <>
            <AboutWrapper />
          </>
        </PageContent>
    )
}

export default SubmitPage;