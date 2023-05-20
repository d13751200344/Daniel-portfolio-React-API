import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download image:
        <a href={data.src.large} target="_blank">
          Click here
        </a>
      </p>
    </div>
  );
};

export default Picture;
