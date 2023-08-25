import React from "react";
import type { ModalBox } from "../types";


type ModalBoxContext = { modalBox: ModalBox, setModalBox: React.Dispatch<React.SetStateAction<ModalBox>> };

const ModalBoxContext = React.createContext<ModalBoxContext>({
  modalBox: null,
  setModalBox: () => { }
});

export { ModalBoxContext };
