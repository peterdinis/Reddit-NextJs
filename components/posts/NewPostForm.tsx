import { Flex, Icon } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC = () => {
  return (
    <Flex direction="column" background="white" borderRadius={4} mt={2}>
      <Flex>
        {formTabs.map((item, index) => (
          <TabItem
          /*  key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab} */
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
