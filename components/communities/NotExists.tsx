import { Button, chakra, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NotExists: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <chakra.div textAlign={"center"}>
        <Text fontSize="1.2rem" color="red">
          Community does not exists
        </Text>
        <Button onClick={() => router.push("/")}>Go home</Button>
      </chakra.div>
    </>
  );
};

export default NotExists;
