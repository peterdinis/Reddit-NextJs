import { Box, Flex, Icon, Image, Text, Button } from "@chakra-ui/react";
import { Community } from "../../recoil/atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "../../hooks/useCommunity";

interface ICommunityHeaderProps {
  communityData: Community;
}

const CommunityHeader: React.FC<ICommunityHeaderProps> = ({
  communityData,
}) => {
  const { communityStateValue, loading, error, onJoinLeaveCommunity } =
    useCommunityData(!!communityData);
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <>
      <Flex direction="column" width="100%" height="146px">
        <Box height="50%" backgroundColor="blue.400" />
        <Flex justifyContent="center" bg="white" height="50%">
          <Flex width="95%" maxWidth="860px">
            {communityData.imageURL ? (
              <Image>Image</Image> /* TODO: Update here */
            ) : (
              <Icon
                as={FaReddit}
                fontSize={64}
                position="relative"
                top={-3}
                color="blue.500"
                border="4px solid white"
                borderRadius="50%"
              />
            )}
            <Flex padding="10px 16px">
              <Flex direction="column" mr={6}>
                <Text fontWeight={800} fontSize="16pt">
                  {communityData.id}
                </Text>
                <Text fontWeight={600} fontSize="10pt" color="gray.400">
                  r/{communityData.id}
                </Text>
              </Flex>
              <Flex>
                <Button
                  onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                  height="30px"
                  pr={6}
                  pl={6}
                  isLoading={loading}
                >
                  {isJoined ? "Joined" : "Join"}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CommunityHeader;
