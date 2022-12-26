import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { firestore } from "../../../firebase/init";
import { Community } from "../../../recoil/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";

type ICommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<ICommunityPageProps> = ({ communityData }) => {
  return <></>;
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
