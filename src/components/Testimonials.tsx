import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-5 h-5 fill-current" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<StarHalf key={i} className="w-5 h-5 fill-current" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5" />);
      }
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl font-bold text-center text-rustic-900 mb-16 fade-in-section is-visible">Voice of the Guest</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((review, index) => (
            <div key={review.id} className={`bg-rustic-50 p-8 rounded-sm shadow-sm fade-in-section is-visible border border-rustic-100 h-full flex flex-col delay-${index * 100}`}>
              <div className="flex text-embers-500 mb-4">
                {renderStars(review.rating)}
              </div>
              <p className="text-rustic-600 italic mb-6 flex-grow">"{review.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rustic-300 rounded-full flex items-center justify-center text-white font-serif font-bold">
                  {review.authorInitials}
                </div>
                <span className="ml-3 font-bold text-rustic-900">{review.authorName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
