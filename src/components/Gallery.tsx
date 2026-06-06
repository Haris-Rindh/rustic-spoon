import React from 'react';
import Image from 'next/image';
import { galleryData } from '../data';

export default function Gallery() {
  return (
    <section id="gallery" className="py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {galleryData.map((src, index) => (
          <div key={index} className="relative group h-72 md:h-80 overflow-hidden cursor-pointer">
            <Image 
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white font-serif text-lg tracking-wider border-b border-white pb-1">View Dish</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
