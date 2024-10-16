import React from "react";
import { Toaster } from "react-hot-toast";

function TosterContainer() {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      containerStyle={{}}
      toastOptions={{
        duration: 2000,
      }}
    />
  );
}

export default TosterContainer;
