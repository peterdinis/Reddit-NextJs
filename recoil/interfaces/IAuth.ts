export interface AuthModalState {
    open: boolean;
    view: ModalView;
  }
  
  export type ModalView = "login" | "signup" | "resetPassword";
  