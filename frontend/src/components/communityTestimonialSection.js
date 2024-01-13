import React from "react";

const communityTestimonialSection = () => {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-8">What People Say</h2>
      <div className="flex justify-center items-center space-x-4">
        {/* Testimonial 1 */}
        <div className="bg-white p-4 rounded shadow-md">
          <p>"Testimonial 1."</p>
          <p className="font-semibold mt-2">- John Doe</p>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-4 rounded shadow-md">
          <p>"Testimonial 2."</p>
          <p className="font-semibold mt-2">- Jane Doe</p>
        </div>
      </div>
    </section>
  );
};

export default communityTestimonialSection;
