import React from 'react'
import donateimage from "../../../images/donateimage.jpeg";
import donate2 from "../../../images/donate3.webp";
import donate3 from '../../../images/donate2.jpg';
const BodyContent = () => {

  return (
    <div className=''>
      <div className="py-5 mt-2 mb-5">
        <img
          src={donateimage}
          alt="Loading.."
          className="h-[300px] sm:h-[500px] md:h-[700px] lg:h-[800px] w-full object-cover"
        />
      </div>
      <div>
        <p className='font-indira text-4xl text-center text-[#0a2540]'>"Fight Hunger, Share Love."</p>
      </div>

      <div className=' ml-10 mr-10 p-10 mt-3 bg-[#B8D6D7] rounded-[10px] border-2 border-blue-500'>
        <p>
          Food donation is a simple yet powerful way to combat hunger and reduce food waste. By donating surplus food, you are not only helping to feed those in need but also contributing to a more sustainable and compassionate society. Whether it's cooked meals, packaged food, or fresh ingredients, every donation makes a significant difference. Donating food helps ensure that it reaches people who are struggling with food insecurity, while also preventing good food from being wasted. With just a few clicks, you can share your excess food with others, making a positive impact in your community and beyond.
        </p>
      </div>

      <div className=' mt-10 grid gap-20 grid-cols-1 md:grid-cols-2 items-center'>
        <div className="w-[500px] h-[200px] p-5 rounded-[20px] ml-40 border border-blue-500 shadow-2xl shadow-grey-950  transform transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">Why Donate Food?</h3>
          <p className="text-justify  text-[#384a5b]" >Every day, millions of people face food insecurity, while perfectly good food goes to waste. By donating your surplus food, you’re helping to bridge this gap and bring hope to those in need. Together, we can create a community where everyone has access to nutritious meals.</p>
        </div>
        <div className=' mr-40 mb-5'>
          <img src={donate2} alt="Loadin..." className='w-full h-auto max-w-[350px] mx-auto object-contain rounded-[20px]' />
        </div>
      </div>

      <div className='mt-10 grid gap-20 p-5 grid-cols-1 md:grid-cols-2 items-center'>
        <div className='mb-5'>
          <img src={donate3} alt="Loadin..." className='w-full h-auto max-w-[350px] mx-auto object-contain rounded-[20px]' />
        </div>
        <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">How It Works?</h3>
          <p className="text-justify text-[#0a2540]">"It’s Simple to Make an Impact"</p>
          <ol className="list-decimal mt-2 pl-6 space-y-2 text-justify text-[#384a5b]">
            <li>Step 1: Gather surplus or non-perishable food.</li>
            <li>Step 2: Schedule a pickup or drop-off at our nearest center.</li>
            <li>Step 3: See your donation distributed to those in need.</li>
          </ol>
        </div>
      </div>

      <div className=' ml-10 p-10 '>
        <h3 className="text-xl font-semibold mb-2 text-[#0a2540]">Why Choose Us??</h3>
        <p className="text-justify text-[#0a2540] ">"Trusted Partners in Ending Hunger"</p>
        <ol className="list-decimal mt-2 pl-6 space-y-2 text-justify text-[#384a5b]">
          <li>Transparency: Every donation is tracked, ensuring it reaches the people who need it.</li>
          <li>Convenience: We make it easy to donate, whether you're an individual or a business.</li>
          <li>Sustainability: Together, we reduce food waste and promote environmental responsibility.</li>
        </ol>
      </div>

      <div>
        <h1 className='font-indira text-4xl text-center'>Feedbacks from Receivers</h1>
      </div>

      <div className="flex justify-center items-center overflow-x-auto space-x-6 py-5">


        <div className="relative overflow-x-auto w-full px-6 py-4">
          <div className="flex transition-all duration-300 scroll-smooth">
            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"When I was struggling to put food on the table, [Your Organization's Name] was there for me. The meals I received helped me and my children during our toughest times. Thank you to everyone who donates—you’ve changed our lives."</p>
              <h3 className="text-xl font-semibold mb-2">— Maria R., Food Recipient</h3>
            </div>

            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"I never expected to find such kindness. The food donations not only filled my stomach but gave me hope. Knowing that people care enough to share what they have means everything to me."</p>
              <h3 className="text-xl font-semibold mb-2">— John T., Shelter Resident</h3>
            </div>

            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"These donations mean more than just meals. They bring dignity, relief, and the feeling that someone is looking out for you. Thank you for helping me get through my hardest days."</p>
              <h3 className="text-xl font-semibold mb-2">— Samantha L., Single Mother</h3>
            </div>

            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"When I was struggling to put food on the table, [Your Organization's Name] was there for me. The meals I received helped me and my children during our toughest times. Thank you to everyone who donates—you’ve changed our lives."</p>
              <h3 className="text-xl font-semibold mb-2">— Maria R., Food Recipient</h3>
            </div>

            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"I never expected to find such kindness. The food donations not only filled my stomach but gave me hope. Knowing that people care enough to share what they have means everything to me."</p>
              <h3 className="text-xl font-semibold mb-2">— John T., Shelter Resident</h3>
            </div>

            <div className="w-[500px] h-[200px] p-5 rounded-[20px] border border-blue-500 shadow-2xl shadow-grey-950 flex-shrink-0">
              <p className="text-justify">"These donations mean more than just meals. They bring dignity, relief, and the feeling that someone is looking out for you. Thank you for helping me get through my hardest days."</p>
              <h3 className="text-xl font-semibold mb-2">— Samantha L., Single Mother</h3>
            </div>
          </div>
        </div>




      </div>







    </div>

  );
}

export default BodyContent