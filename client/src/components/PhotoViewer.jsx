import { useState } from "react";

function PhotoPreview({ imgUrl, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center py-10 bg-gray-900">
      <span
        onClick={onClose}
        className="text-white absolute top-5 right-5 text-3xl cursor-pointer"
      >
        x
      </span>
      <img
        src={imgUrl}
        alt="Preview"
        className="max-w-full max-h-full rounded-md"
      />
    </div>
  );
}

function PhotoViewer({ imgUrl, index }) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <img
        key={index}
        src={imgUrl}
        alt={`Tour Photo ${index + 1}`}
        className="w-25 h-auto mt-2 rounded-md object-cover mx-2 cursor-pointer"
        onClick={() => setShowPreview(true)}
      />

      <PhotoPreview
        imgUrl={imgUrl}
        show={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}

export default PhotoViewer;
