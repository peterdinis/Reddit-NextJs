import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Community } from "../../recoil/atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";

interface ICommunityHeaderProps {
  communityData: Community;
}

const CommunityHeader: React.FC<ICommunityHeaderProps> = ({
  communityData,
}) => {
  return (
    <>
      <Flex direction="column" width="100%" height="146px">
        <Box height="50%" backgroundColor="blue.400" />
        <Flex justifyContent="center" bg="white" height="50%">
          <Flex width="95%" maxWidth="860px">
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CommunityHeader;
