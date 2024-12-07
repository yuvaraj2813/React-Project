import React from 'react';
import image from '../../../images/image.png';
const AboutUs = () => {
    return (
        <div className='mt-20'>
            <div className='grid grid-cols-2 '>
                <div>
                    <img src={image} alt="Loading.." className='w-full h-auto max-w-[350px] mx-auto object-contain rounded-[20px]' />
                </div>
                <div>
                <h3 className='text-4xl font-bold text-[#0a2540]'>What We Do</h3>
                <p className='m-3 text-[#384a5b] text-left '>
                    We provide a seamless platform for donors—whether individuals, restaurants, or businesses—to share surplus food with receivers, such as local shelters, food banks, and individuals in need. By making food donations easy and accessible, we reduce food waste while ensuring that no one goes without.
                </p>
                </div>
            </div>

            <section>
                <header className='mb-5'>
                    <h1 className='text-2xl font-bold text-[#0a2540]'>Our Mission</h1>
                </header>
                <p className='m-3 text-[#384a5b]'>
                    At FeedingHands, we believe that no one should go hungry. Our mission is simple: to connect those with excess food to individuals and families who need it the most. We strive to build a community where everyone, regardless of their circumstances, can access nutritious meals and feel supported by a network of compassionate individuals.
                </p>
            </section>
            <section>
                <article>
                    <h5 className='text-lg font-medium'>Our platform allows donors to:</h5>
                    <ul>
                        <li><strong>Donate food easily:</strong> Simply upload food details, and our system connects you with local receivers.</li>
                        <li><strong>Track donations:</strong> Donors can keep track of the donations they’ve made and see the impact they are having in their community.</li>
                        <li><strong>Make a difference:</strong> Every meal donated helps nourish someone in need, contributing to a healthier, happier world.</li>
                    </ul>
                </article>
            </section>
        </div>
    );
}

export default AboutUs;
