import Image from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "./Rating";

const ProductCard = ({ product, index }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border-2 rounded-md group overflow-hidden"
    >
      <div className="relative w-full h-64">
        <Image
          priority={index === 0}
          src={product.image}
          alt={product.name}
          fill
          sizes="100%"
        />
      </div>
      <div className="p-6 bg-white">
        <p className="font-semibold text-lg">{product.name}</p>
        <Rating />
        <div className="mt-4 flex items-center justify-between space-x-2">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">{product.price}</p>
          </div>
          <button className="border rounded-lg py-1 px-4">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
