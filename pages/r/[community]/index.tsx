import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { auth, firestore } from "../../../firebase/init";
import {
  Community,
  communityState,
} from "../../../recoil/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotExists from "../../../components/communities/NotExists";
import CommunityHeader from "../../../components/communities/CommunityHeader";
import PageContent from "../../../components/shared/PageContent";
import CreatePostLink from "../../../components/communities/CreatePostLink";
import AboutCommunity from "../../../components/communities/AboutCommunity";
import Posts from "../../../components/post/AllPosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import React from "react";
import { getErrorMessage } from "../../../utils/errorTyping";

type ICommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<ICommunityPageProps> = ({ communityData }) => {
  const [user, loadingUser] = useAuthState(auth);

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  React.useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <NotExists />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts
            communityData={communityData}
            userId={user?.uid}
            loadingUser={loadingUser}
          />
        </>
        <AboutCommunity communityData={communityData} />
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.community as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error: unknown) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    getErrorMessage({ message });
  }
}

export default CommunityPage;
