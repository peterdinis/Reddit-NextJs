import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../recoil/atoms/authModalAtom";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            dicta illum dolorum libero corrupti ratione nobis magnam voluptates
            tempora iusto?
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
