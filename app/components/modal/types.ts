import { PropsWithChildren } from "react";

export interface IModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}
