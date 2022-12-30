import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import React from "react";
import useCommunity from "../../../hooks/useCommunity";
import { auth } from "../../../firebase/init";
import NewPostForm from "../../../components/post/form/NewPost";
import PageContent from "../../../components/shared/PageContent";
import AboutCommunity from "../../../components/communities/AboutCommunity";
import { communityState } from "../../../recoil/atoms/communitiesAtom";

const SubmitPage: NextPage = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();
  const { community } = router.query;
  const communityStateValue = useRecoilValue(communityState);
  const { loading } = useCommunity();
  React.useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, communityStateValue.currentCommunity]);

  return (
    <PageContent maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )}
      </>
      {communityStateValue.currentCommunity && (
        <>
          <AboutCommunity
            communityData={communityStateValue.currentCommunity}
            pt={6}
            onCreatePage
            loading={loading}
          />
        </>
      )}
    </PageContent>
  )
};

export default SubmitPage;
