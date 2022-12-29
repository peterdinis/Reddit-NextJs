import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { firestore } from "../../../firebase/init";
import { Community } from "../../../recoil/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotExists from "../../../components/communities/NotExists";
import CommunityHeader from "../../../components/communities/CommunityHeader";
import PageContent from "../../../components/shared/PageContent";
import CreatePostLink from "../../../components/communities/CreatePostLink";

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
        <div>right</div>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "community",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (err) {
    console.log("Error", err);
  }
}

export default CommunityPage;