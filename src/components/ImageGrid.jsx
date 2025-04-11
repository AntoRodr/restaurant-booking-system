import React from "react";

const ImageGrid = () => {
  return (
    <section className="image-gallery">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/49ef339c3b4a76ea5f43e54d946ba587d868d64a"
        alt="Restaurant exterior"
        className="gallery-image"
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfa72273742d51dc89bb4d6f74ea59671735680b"
        alt="Restaurant interior"
        className="gallery-image"
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/565fe615403caa66fff47f23893047bc60dcb112"
        alt="Restaurant ambiance"
        className="gallery-image"
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f542733aa296472b3587991b95a1a2a97f46de8"
        alt="Restaurant evening"
        className="gallery-image"
      />
      <style jsx>{`
        .image-gallery {
          display: flex;
          gap: 26px;
          margin-bottom: 70px;
          width: 100%;
          justify-content: center;
        }
        .gallery-image {
          width: 312px;
          height: 194px;
          border-radius: 16px;
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .image-gallery {
            flex-wrap: wrap;
            gap: 20px;
          }
          .gallery-image {
            width: calc(50% - 10px);
          }
        }
        @media (max-width: 640px) {
          .image-gallery {
            flex-direction: column;
          }
          .gallery-image {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageGrid;
