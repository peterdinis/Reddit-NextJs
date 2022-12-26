import { Button, useColorMode } from "@chakra-ui/react";

const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
};

export default ThemeToggle;
