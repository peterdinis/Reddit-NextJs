import { chakra, Text } from "@chakra-ui/react";

const NotExists: React.FC = () => {
  return (
    <>
      <chakra.div>
        <Text fontSize="1.2rem" color="red">
          Community does not exists
        </Text>
      </chakra.div>
    </>
  );
};

export default NotExists;
