import { IToastProps } from "./types";

const Toast = ({ text }: IToastProps) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-error">
        <span>{text.substring(0, 40)}...</span>
      </div>
    </div>
  );
};

export default Toast;
