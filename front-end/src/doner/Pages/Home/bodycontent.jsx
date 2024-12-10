
import React from 'react';
import donateimage from "../../../images/donateimage.jpeg";
import donate2 from "../../../images/donate3.webp";
import donate3 from '../../../images/donate2.jpg';

const BodyContent = () => {
  return (
    <div className=""> {/* Adjust padding to account for fixed NavBar */}
      {/* Hero Image */}
      <div className="py-5">
        <img
          src={donateimage}
          alt="Loading..."
          className="w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[800px] object-cover"
        />
      </div>

      {/* Title */}
      <div>
        <p className="font-indira text-2xl sm:text-3xl md:text-4xl text-center text-[#0a2540]">
          "Fight Hunger, Share Love."
        </p>
      </div>

      {/* Info Section */}
      <div className="m-4 sm:mx-10 sm:p-10 mt-3 bg-[#B8D6D7] rounded-lg border-2 border-blue-500">
        <p className="text-justify text-[#384a5b]">
          Food donation is a simple yet powerful way to combat hunger and reduce food waste. By donating surplus food, you are not only helping to feed those in need but also contributing to a more sustainable and compassionate society. Whether it's cooked meals, packaged food, or fresh ingredients, every donation makes a significant difference. Donating food helps ensure that it reaches people who are struggling with food insecurity, while also preventing good food from being wasted. With just a few clicks, you can share your excess food with others, making a positive impact in your community and beyond.
        </p>
      </div>

      {/* Why Donate Section */}
      <div className="mt-10 grid gap-10 md:grid-cols-2 items-center">
        <div className="p-5 rounded-lg mx-4 md:ml-40 border border-blue-500 shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">Why Donate Food?</h3>
          <p className="text-justify text-[#384a5b]">
            Every day, millions of people face food insecurity, while perfectly good food goes to waste. By donating your surplus food, you’re helping to bridge this gap and bring hope to those in need. Together, we can create a community where everyone has access to nutritious meals.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={donate2}
            alt="Loading..."
            className="w-full h-auto max-w-[350px] object-contain rounded-lg"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-10 grid gap-10 md:grid-cols-2 items-center">
        <div className="flex justify-center">
          <img
            src={donate3}
            alt="Loading..."
            className="w-full h-auto max-w-[350px] object-contain rounded-lg"
          />
        </div>
        <div className="p-5 rounded-lg mx-4 md:mr-40 border border-blue-500 shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">How It Works?</h3>
          <p className="text-justify text-[#0a2540]">"It’s Simple to Make an Impact"</p>
          <ol className="list-decimal mt-2 pl-6 space-y-2 text-justify text-[#384a5b]">
            <li>Step 1: Gather surplus or non-perishable food.</li>
            <li>Step 2: Schedule a pickup or drop-off at our nearest center.</li>
            <li>Step 3: See your donation distributed to those in need.</li>
          </ol>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="m-4 sm:mx-10 sm:p-10">
        <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">Why Choose Us?</h3>
        <p className="text-[#0a2540]">"Trusted Partners in Ending Hunger"</p>
        <ol className="list-decimal mt-2 pl-6 space-y-2 text-justify text-[#384a5b]">
          <li>Transparency: Every donation is tracked, ensuring it reaches the people who need it.</li>
          <li>Convenience: We make it easy to donate, whether you're an individual or a business.</li>
          <li>Sustainability: Together, we reduce food waste and promote environmental responsibility.</li>
        </ol>
      </div>
    </div>
  );
};

export default BodyContent;
