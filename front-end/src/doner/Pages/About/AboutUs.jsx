

import React from "react";
import image from "../../../images/image.png";
import image2 from "../../../images/mission.webp";
import image3 from "../../../images/vision.png";
import image4 from "../../../images/goal.png";
import developer from '../../../images/yuvaraj_photo.jpg';

const AboutUs = () => {
  return (
    <div className="px-4 py-8">
      {/* Main section with image and text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="flex justify-center">
          <img
            src={image}
            alt="What We Do"
            className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-contain rounded-[10px]"
          />
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-3xl lg:text-4xl font-bold text-[#0a2540]">
            What We Do
          </h3>
          <p className="mt-4 text-[#384a5b]">
            At FeedingHands, we believe that no one should go hungry. Our
            mission is simple: to connect those with excess food to individuals
            and families who need it the most. We strive to build a community
            where everyone, regardless of their circumstances, can access
            nutritious meals and feel supported by a network of compassionate
            individuals.
          </p>
        </div>
      </div>

      {/* Mission, Vision, Goal section */}
      <div className="flex flex-wrap justify-center items-start gap-8">
        {/* Mission */}
        <div className="p-6 border-2 border-blue-500 shadow-md shadow-black rounded-[10px] w-[90%] sm:w-[350px] text-center">
          <div className="flex justify-center mb-4">
            <img
              src={image3}
              alt="Mission"
              className="w-[80px] h-[90px] object-contain"
            />
          </div>
          <h3 className="text-3xl font-bold text-[#0a2540]">Our Mission</h3>
          <p className="mt-4 text-[#384a5b]">
            We provide a seamless platform for donors—whether individuals,
            restaurants, or businesses—to share surplus food with receivers,
            such as local shelters, food banks, and individuals in need. By
            making food donations easy and accessible, we reduce food waste
            while ensuring that no one goes without.
          </p>
        </div>

        {/* Vision */}
        <div className="p-6 border-2 border-blue-500 shadow-md shadow-black rounded-[10px] w-[90%] sm:w-[350px] text-center">
          <div className="flex justify-center mb-4">
            <img
              src={image2}
              alt="Vision"
              className="w-[80px] h-[90px] object-contain"
            />
          </div>
          <h3 className="text-3xl font-bold text-[#0a2540]">Our Vision</h3>
          <p className="mt-4 text-[#384a5b]">
            A world where no one goes hungry, and all surplus food finds a
            meaningful purpose. We envision a connected community where
            individuals and organizations work together to eliminate food
            waste, empower vulnerable populations, and promote a sustainable
            future for everyone.
          </p>
        </div>

        {/* Goal */}
        <div className="p-6 border-2 border-blue-500 shadow-md shadow-black rounded-[10px] w-[90%] sm:w-[350px] text-center">
          <div className="flex justify-center mb-4">
            <img
              src={image4}
              alt="Goal"
              className="w-[80px] h-[90px] object-contain"
            />
          </div>
          <h3 className="text-3xl font-bold text-[#0a2540]">Our Goal</h3>
          <p className="mt-4 text-[#384a5b]">
            Our goal is to reduce food waste by creating a seamless platform that connects surplus food to those in need, fostering community collaboration and support. By empowering individuals, businesses, and organizations, we aim to enhance food accessibility, particularly in underserved areas.
          </p>
        </div>
      </div>



      <div className="min-h-screen flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-7xl">

          {/* About the Developer Section */}
          <div className="container mx-auto p-6 mt-12">
            <h1 className="text-3xl font-bold text-center mb-6">About the Developer</h1>
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              {/* Profile Picture */}
              <div className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] mb-6  ml-20 mr-20 md:mb-0">
                <img
                  src={developer}
                  alt="Yuvaraj"
                  className="w-full h-full object-cover rounded-full border-4 border-blue-500"
                />
              </div>

              {/* About Information */}
              <div className="text-center md:text-left md:w-[500px]">
                <h2 className="text-2xl font-semibold mb-4">Yuvaraj T</h2>
                <p className="mb-4 text-[#384a5b]">
                  Hello, I am Yuvaraj, currently pursuing my studies at M.Kumarasamy College of Engineering. I am the developer of this FoodingHands, built using React and Firebase technologies.
                  <br />
                  I created this platform with a vision to help reduce food wastage and provide assistance to those in need. By connecting food donors with receivers, this platform aims to make a positive impact on society. It's my small step towards solving the hunger problem, using technology to bring people together for a good cause.
                </p>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/yuvaraj-t-b2b54a282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Connect with me on LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AboutUs;
