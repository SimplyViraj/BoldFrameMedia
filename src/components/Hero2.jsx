import { useState, useEffect } from "react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import logo from "/assets/BFM Icon Red.svg";

export default function Hero2() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.svg", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }
    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {imageData && (
        <MetallicPaint
          imageData={imageData}
          params={{
            edge: 2,
            patternBlur: 0.005,
            patternScale: 2,
            refraction: 0.015,
            speed: 0.3,
            liquid: 0.07,
          }}
        />
      )}
    </div>
  );
}
