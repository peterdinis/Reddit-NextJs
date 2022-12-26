import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { firestore } from "../../../firebase/init";
import { Text } from "@chakra-ui/react";
import { Community } from "../../../recoil/atoms/communitiesAtom";

type ICommunityPageProps = {
  community: Community
}

const CommunityPage: NextPage<ICommunityPageProps> = ({community}) => {
  return (
    <>
      <Text>Ping</Text>
    </>
  )
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
        communityData: communityDoc.data(),
      },
    };
  } catch (err) {
    console.log("Error", err);
  }
}

export default CommunityPage;
