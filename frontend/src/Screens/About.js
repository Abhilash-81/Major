import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-gray-700 mb-4">
          Welcome to our platform! We are a passionate team dedicated to
          providing valuable resources and fostering a community for learning
          and skill sharing.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to empower individuals by offering a diverse range of
          courses and enabling collaboration among learners and educators.
        </p>
        <p className="text-gray-700">
          Join us on this journey of knowledge and growth!
        </p>
      </div>
    </div>
  );
};

export default About;
