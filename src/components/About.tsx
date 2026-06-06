import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-rustic-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 fade-in-section is-visible">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-embers-600 z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative z-10 w-full h-[500px] shadow-2xl overflow-hidden rounded-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Chef plating food carefully" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transform transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 fade-in-section is-visible">
            <h4 className="text-embers-600 font-bold uppercase tracking-widest text-sm mb-3 flex items-center">
              <span className="w-8 h-px bg-embers-600 mr-3"></span>Our Philosophy
            </h4>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-8 leading-tight">
              Simple Ingredients, <br />Complex Flavors.
            </h2>
            <p className="text-rustic-700 text-lg leading-relaxed mb-6">
              At The Rustic Spoon, we believe that the best food begins with the best ingredients. We partner directly with local farmers in the valley to bring you produce picked at the peak of freshness.
            </p>
            <p className="text-rustic-700 text-lg leading-relaxed mb-10">
              Our wood-fired oven is the heart of our kitchen, infusing meats and vegetables with a subtle smokiness that you can&apos;t get anywhere else. Join us for a meal that feels like home.
            </p>
            <div className="flex items-center gap-6 border-l-4 border-embers-500 pl-6 bg-rustic-100/50 py-4">
              <div className="text-center">
                <p className="font-serif text-3xl text-embers-600 font-bold">10+</p>
                <p className="text-xs uppercase tracking-wider text-rustic-500">Years Serving</p>
              </div>
              <div className="h-10 w-px bg-rustic-300"></div>
              <div>
                <p className="font-serif text-xl font-bold text-rustic-900">Marco Rossi</p>
                <p className="text-sm text-rustic-500 uppercase tracking-wider">Executive Chef</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
