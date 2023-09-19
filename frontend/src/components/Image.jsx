import React from "react";
import { useEffect, useState } from "react";

const Image = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImage(reader.result);
    };
  }, [props.blob]);

  return <img style={{ width: 300, height: 400 }} src={image} />;
};

export default Image;
