import { atom } from "recoil";
import { TiHome } from "react-icons/ti";
import { DirectoryMenuState } from "../interfaces/IDirectory";

export const defaultMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom({
  key: "directoryMenuState",
  default: defaultMenuState,
});