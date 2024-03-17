import React from "react";

const Modal2 = ({ open, onClose, children }: any) => {
  const handleOnClose = (e : any) => {
    if(e.target.id === "container"){
      onClose();
    }
  };
  if (!open) return null;
  return (
    <>
      <div
      id='container'
        onClick={handleOnClose}
        className="fixed inset-0 z-50 bg-black  bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
      >
        {children}
      </div>
    </>
  );
};

export default Modal2;
