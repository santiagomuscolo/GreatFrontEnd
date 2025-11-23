import { useState } from "react";
import { createPortal } from "react-dom";
import ModalDialog from "./components/modal-dialog/ModalDialog";

export default function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <button
        className="button-base"
        onClick={() => setOpenModal((prev) => !prev)}
      >
        Open modal
      </button>
      {createPortal(
        <ModalDialog
          open={openModal}
          onClose={handleCloseModal}
          title={"Modal Title"}
        >
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
        </ModalDialog>,
        document.body
      )}
    </div>
  );
}
