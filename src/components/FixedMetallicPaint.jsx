import { useEffect, useRef, useState } from "react";

const defaultParams = {
  patternScale: 2,
  refraction: 0.015,
  edge: 1,
  patternBlur: 0.005,
  liquid: 0.07,
  speed: 0.3,
};

export default function FixedMetallicPaint({ imageData, params = defaultParams }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setError("Canvas 2D not supported");
      return;
    }

    // Set canvas size
    const size = Math.min(500, Math.min(window.innerWidth, window.innerHeight) * 0.8);
    canvas.width = size;
    canvas.height = size;

    // Simple metallic effect using canvas 2D
    const drawMetallicEffect = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for metallic effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#e8e8e8');
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, '#c0c0c0');
      
      // Draw background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image with metallic overlay
      if (imageData && imageData.data) {
        const imgCanvas = document.createElement('canvas');
        imgCanvas.width = imageData.width;
        imgCanvas.height = imageData.height;
        const imgCtx = imgCanvas.getContext('2d');
        imgCtx.putImageData(imageData, 0, 0);
        
        // Draw image centered and scaled
        const scale = Math.min(canvas.width / imageData.width, canvas.height / imageData.height) * 0.8;
        const x = (canvas.width - imageData.width * scale) / 2;
        const y = (canvas.height - imageData.height * scale) / 2;
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(imgCanvas, x, y, imageData.width * scale, imageData.height * scale);
        
        // Add metallic shine
        ctx.globalCompositeOperation = 'overlay';
        const shineGradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shineGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    drawMetallicEffect();
    
    // Animation loop
    let animationId;
    const animate = () => {
      drawMetallicEffect();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [imageData, params]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="block w-full h-full object-contain"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  );
}
