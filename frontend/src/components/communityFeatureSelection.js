import React from "react";

const communityFeatureSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-4 bg-white rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 1</h3>
        <p>Description of Feature 1.</p>
      </div>

      {/* Feature 2 */}
      <div className="p-4 bg-white rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 2</h3>
        <p>Description of Feature 2.</p>
      </div>

      {/* Feature 3 */}
      <div className="p-4 bg-white rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 3</h3>
        <p>Description of Feature 3.</p>
      </div>
    </section>
  );
};

export default communityFeatureSection;
