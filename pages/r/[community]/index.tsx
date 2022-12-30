import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { firestore } from "../../../firebase/init";
import { Community } from "../../../recoil/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotExists from "../../../components/communities/NotExists";
import CommunityHeader from "../../../components/communities/CommunityHeader";
import PageContent from "../../../components/shared/PageContent";
import CreatePostLink from "../../../components/communities/CreatePostLink";
import AboutCommunity from "../../../components/communities/AboutCommunity";

type ICommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<ICommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotExists />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <AboutCommunity communityData={communityData} />
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GET SERVER SIDE PROPS RUNNING");

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
  } catch (error) {
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
  }
}

export default CommunityPage;
