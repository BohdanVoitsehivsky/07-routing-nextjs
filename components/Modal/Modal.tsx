import {  useEffect } from "react";
import type {ReactNode} from "react"
import { createPortal } from "react-dom";
import css from "./Modal.module.css"

interface ModalProps {
    children: ReactNode;
    onClose: ()=> void;
}



function Modal  ({children, onClose}: ModalProps)  {
 
    useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  document.addEventListener("keydown", handleEsc);
  document.body.style.overflow = 'hidden';
  return () => document.removeEventListener("keydown", handleEsc);
  document.body.style.overflow = 'unset';
}, [onClose]);


const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) onClose();
  };


return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} >
        {children}
      </div>
    </div>,
    document.body
  );
  
}

export default Modal