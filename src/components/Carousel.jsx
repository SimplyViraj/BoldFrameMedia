import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const products = [
  {
    id: 0,
    type: "intro",
    title: "In with the new.",
    subtitle: "The accessories you love.\nIn a fresh mix of colours.",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-case-blue?wid=400&hei=400", 
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-pink?wid=400&hei=400"
    ]
  },
  {
    id: 1,
    title: "iPhone 16 Pro Max Silicone Case with MagSafe – Peony",
    price: "₹4900.00",
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT4Y3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1692826923000",
  
  },
  {
    id: 2,
    title: "iPhone 16 Clear Case with MagSafe",
    price: "₹4900.00",
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MRXT3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1692826922000",

  },
  {
    id: 3,
    title: "iPhone 16e Silicone Case – Lake Green",
    price: "₹3900.00",
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU773?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1692826921000",

  },
  {
    id: 4,
    title: "iPhone 16e Silicone Case – Lake Green",
    price: "₹3900.00",
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU773?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1692826921000",

  },
   {
    id: 5,
    title: "iPhone 16e Silicone Case – Lake Green",
    price: "₹3900.00",
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU773?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1692826921000",
    
  },
];

export default function Carousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight">
          Branding & Visual Design.{" "}
          <span className="font-normal text-gray-500">
            Essentials that pair perfectly with your favourite devices.
          </span>
        </h2>

        {/* Carousel wrapper */}
        <div className="relative mt-8">
          {/* Left button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar"
          >
            {products.map((product) =>
              product.type === "intro" ? (
                // Intro card
                <div
                  key={product.id}
                  className="min-w-[320px] max-w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line mt-2 text-sm">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-20 h-20 rounded-xl object-contain"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Product card
                <div
                  key={product.id}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full rounded-t-2xl object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      MRP {product.price} (Incl. of all taxes)
                    </p>  
                  </div>
                </div>
              )
            )}
          </div>

          {/* Right button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
