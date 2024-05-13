import { IModalProps } from "./types";

const Modal = ({ open, onClose }: IModalProps) => {
  return (
    <dialog id="my_modal_2" className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
