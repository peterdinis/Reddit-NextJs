import { GetServerSidePropsContext } from "next";

const CommunityInfo: React.FC = () => {
    return (
        <>
            PING
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // get community data pass to client component

    try {

    } catch(error) {
        
    }
}

export default CommunityInfo;