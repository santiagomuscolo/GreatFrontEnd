import type { ReactNode } from "react";

type ModalDialogProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
};

export default function ModalDialog({
  children,
  title,
  open,
  onClose,
}: ModalDialogProps) {
  if (!open) return null;

  return (
    <div className="dialog-container">
      <div className="dialog" role="dialog" aria-modal="true">
        <h1>{title}</h1>
        {children}
        <button className="button-base" onClick={onClose}>
          Close Modal
        </button>
      </div>
    </div>
  );
}
