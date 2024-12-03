import React from 'react'
import image1 from "../../../images/donate2.jpg"
const BodyContent = () => {

    return (
        <div className="bg-[#0284c7]">
        <div className="py-5">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-4">"Fight Hunger, Share Love."</h1>
              <p className="text-lg mb-4">
                Food donation is a simple yet powerful way to combat hunger and reduce food waste. By donating surplus food, you are not only helping to feed those in need but also contributing to a more sustainable and compassionate society. Whether it's cooked meals, packaged food, or fresh ingredients, every donation makes a significant difference. Donating food helps ensure that it reaches people who are struggling with food insecurity, while also preventing good food from being wasted. With just a few clicks, you can share your excess food with others, making a positive impact in your community and beyond.
              </p>
            </div>
            <div className="md:w-1/2 text-center">
              <div className="rounded-md overflow-hidden">
                <img
                  src={image1}
                  alt="donate"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{ width: '10cm', height: '10cm' }}
                />
              </div>
            </div>
          </div>
          <br /><br />
        </div>
        
        <div className="flex justify-center items-center py-5">
          <h2 className="text-2xl font-semibold text-center">Key Features of a Food Donation Platform</h2>
        </div>
        
        <br /><br />
        <div className="py-10">
          <div className="flex space-x-4 justify-center">
            <div className="w-[400px] h-[150px] p-5 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">"Every Meal Matters."</h4>
              <p className="text-justify">"Your small contribution can light up someone's life. Donate today and make a difference!"</p>
            </div>
            <div className="w-[400px] h-[150px] p-5 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">"Every Meal Matters."</h4>
              <p className="text-justify">"Your small contribution can light up someone's life. Donate today and make a difference!"</p>
            </div>
          </div>
        </div>
      </div>
      
    );
}

export default BodyContent