// src/components/home/TestimonialsSection.tsx
import React from 'react';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  previousRole?: string;
  company?: string;
  content: string;
  photoUrl?: string;
  rating: number;
};

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who have successfully navigated career transitions with AI Career Navigator.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {testimonial.photoUrl ? (
                    <img
                      src={testimonial.photoUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-lg font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.previousRole && (
                        <span className="line-through mr-1">{testimonial.previousRole}</span>
                      )}
                      <span>{testimonial.role}</span>
                      {testimonial.company && (
                        <span>, {testimonial.company}</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-${i < testimonial.rating ? 'yellow-400' : 'gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;