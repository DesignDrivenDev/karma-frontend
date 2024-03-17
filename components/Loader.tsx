import React from "react";
import Image from "next/image";
import loading from "../public/loading.gif";
const Loader = () => {
  return (
    <>
      <div
        className={`w-screen h-screen bg-black/40 backdrop-blur-md fixed top-0 left-0 grid place-items-center transition-all visible opacity-100 `}
        style={{ zIndex: 60 }}
      >
        <Image height={160} width={160} src={loading} unoptimized  alt=""/>
      </div>
    </>
  );
};

export default Loader;
