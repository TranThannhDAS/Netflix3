import React from "react";
import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <PuffLoader size={60} color="#F20000" />
    </div>
  );
}

export default Loader;
