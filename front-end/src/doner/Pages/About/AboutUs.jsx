// import React from 'react';
// import image from '../../../images/image.png';
// const AboutUs = () => {
//     return (
//         <div className=''>

//             <div className='grid grid-cols-2 items-center'>
//                 <div className='justify-self-center '>
//                     <img src={image} alt="Loading.." className='w-[500px] h-[500px] m mt-5 object-contain rounded-[10px]' />
//                 </div>
//                 <div className='w-[500px]'>
//                     <h3 className='text-4xl font-bold text-[#0a2540]'>What We Do</h3>
//                     <p className='m-3 text-[#384a5b] text-left '>
//                         At FeedingHands, we believe that no one should go hungry. Our mission is simple: to connect those with excess food to individuals and families who need it the most. We strive to build a community where everyone, regardless of their circumstances, can access nutritious meals and feel supported by a network of compassionate individuals.</p>
//                 </div>
//             </div>
//             <div className=' flex'>
//                 <div className='m-10 p-5 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-[400px] w-[300px]'>

//                     <h3 className='text-4xl font-bold text-[#0a2540]'>Our Mission</h3>
//                     <p className='m-3 text-[#384a5b] text-left '>
//                         We provide a seamless platform for donors—whether individuals, restaurants, or businesses—to share surplus food with receivers, such as local shelters, food banks, and individuals in need. By making food donations easy and accessible, we reduce food waste while ensuring that no one goes without.
//                     </p>

//                 </div>
//                 <div className='m-10 p-5 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-[400px] w-[300px]'>

//                     <h3 className='text-4xl font-bold text-[#0a2540]'>Our Vision</h3>
//                     <p className='m-3 text-[#384a5b] text-left '>
//                         A world where no one goes hungry, and all surplus food finds a meaningful purpose. We envision a connected community where individuals and organizations work together to eliminate food waste, empower vulnerable populations, and promote a sustainable future for everyone.


//                     </p>

//                 </div>

//                 <div className='m-10 p-5 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-[400px] w-[300px]'>
//                     <h3 className='text-4xl font-bold text-[#0a2540]'>Goal</h3>
//                     <p className='m-3 text-[#384a5b] text-left '>
//                         A world where no one goes hungry, and all surplus food finds a meaningful purpose. We envision a connected community where individuals and organizations work together to eliminate food waste, empower vulnerable populations, and promote a sustainable future for everyone.
//                     </p>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default AboutUs;



// import React from "react";
// import image from "../../../images/image.png";
// import image2 from "../../../images/mission.webp";
// import image3 from "../../../images/vision.png";
// import image4 from "../../../images/goal.png";

// const AboutUs = () => {
//   return (
//     <div className="px-4 py-8">
//       {/* Main section with image and text */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
//         <div className="flex justify-center rounded-]">
//           <img
//             src={image}
//             alt="Loading.."
//             className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-contain rounded-[10px]"
//           />
//         </div>
//         <div className="text-center lg:text-left lg:w-[500px]">
//           <h3 className="text-3xl lg:text-4xl font-bold text-[#0a2540]">
//             What We Do
//           </h3>
//           <p className="mt-4 text-[#384a5b]">
//             At FeedingHands, we believe that no one should go hungry. Our mission is simple: to connect those with excess food to individuals and families who need it the most. We strive to build a community where everyone, regardless of their circumstances, can access nutritious meals and feel supported by a network of compassionate individuals.
//           </p>
//         </div>
//       </div>

//       {/* Mission, Vision, Goal section */}
//       <div className="flex flex-col lg:flex-row justify-center items-center mt-12 space-y-8 lg:space-y-0 lg:space-x-8">
//         {/* Mission */}
//         <div className="p-6 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-auto w-[90%] lg:w-[300px] text-center">
//         <img
//             src={image3}
//             alt="Loading.."
//             className="w-[100px] h-[100px]"
//           />
//           <h3 className="text-3xl lg:text-4xl font-bold text-[#0a2540]">
//             Our Mission
//           </h3>
//           <p className="mt-4 text-[#384a5b]">
//             We provide a seamless platform for donors—whether individuals, restaurants, or businesses—to share surplus food with receivers, such as local shelters, food banks, and individuals in need. By making food donations easy and accessible, we reduce food waste while ensuring that no one goes without.
//           </p>
//         </div>

//         {/* Vision */}
//         <div className="p-6 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-auto w-[90%] lg:w-[300px] text-center">
//         <img
//             src={image2}
//             alt="Loading.."
//             className="w-[100px] h-[100px]"
//           />
//           <h3 className="text-3xl lg:text-4xl font-bold text-[#0a2540]">
//             Our Vision
//           </h3>
//           <p className="mt-4 text-[#384a5b]">
//             A world where no one goes hungry, and all surplus food finds a meaningful purpose. We envision a connected community where individuals and organizations work together to eliminate food waste, empower vulnerable populations, and promote a sustainable future for everyone.
//           </p>
//         </div>

//         {/* Goal */}
//         <div className="p-6 border-2 border-blue-800 shadow-md shadow-black rounded-[10px] h-auto w-[90%] lg:w-[300px] text-center">
//         <img
//             src={image4}
//             alt="Loading.."
//             className="w-[100px] h-[100px]"
//           />
//           <h3 className="text-3xl lg:text-4xl font-bold text-[#0a2540]">Goal</h3>
//           <p className="mt-4 text-[#384a5b]">
//             A world where no one goes hungry, and all surplus food finds a meaningful purpose. We envision a connected community where individuals and organizations work together to eliminate food waste, empower vulnerable populations, and promote a sustainable future for everyone.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


import React from "react";
import image from "../../../images/image.png";
import image2 from "../../../images/mission.webp";
import image3 from "../../../images/vision.png";
import image4 from "../../../images/goal.png";

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
    </div>
  );
};

export default AboutUs;
