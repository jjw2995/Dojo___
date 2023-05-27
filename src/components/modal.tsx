import { Dialog } from "@headlessui/react";
import { ReactElement, useState } from "react";

interface IProps {
  children: ReactElement | Array<ReactElement>;
}

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cycleState = () => {
    setIsOpen((r) => !r);
  };

  return (
    <button onClick={cycleState}>
      {props.children}
      <Dialog open={isOpen} onClose={cycleState} className="relative">
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-1 outline">
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </button>
  );
};

export default Modal;
