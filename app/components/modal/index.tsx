import { IModalProps } from "./types";

const Modal = ({ open, onClose, children }: IModalProps) => {
  return (
    <dialog id="my_modal_2" className="modal" open={open}>
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
