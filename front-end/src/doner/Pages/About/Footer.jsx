// // Footer.js
// import React from "react";
// import { Link} from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6 mt-12">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//         {/* Company Info */}
//         <div className="text-center md:text-left">
//           <h3 className="text-lg font-semibold">Food Donation App</h3>
//           <p className="text-sm mt-2">
//             A platform to connect food donors and receivers. Your contributions
//             make a difference!
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div className="flex space-x-6 text-sm">
//         <Link to="/aboutus" className="hover:text-blue-400">
//             About Us
//           </Link>
//           <Link to="/contactus" className="hover:text-blue-400">
//             Contact Us
//           </Link>
//           <a href="/" className="hover:text-blue-400">
//             Privacy Policy
//           </a>
//           <a href="/" className="hover:text-blue-400">
//             Terms of Service
//           </a>
//         </div>

//         {/* Social Media */}
//         <div className="flex space-x-4 text-xl">
//           <a href="https://facebook.com" className="hover:text-blue-400">
//             <i className="fab fa-facebook"></i>
//           </a>
//           <a href="https://twitter.com" className="hover:text-blue-400">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="https://instagram.com" className="hover:text-blue-400">
//             <i className="fab fa-instagram"></i>
//           </a>
//         </div>

//         {/* Newsletter Subscription */}
//         <div className="mt-4">
//           <input
//             type="email"
//             placeholder="Enter your email for updates"
//             className="p-2 rounded-l-md border-none focus:outline-none"
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
//             Subscribe
//           </button>
//         </div>
//       </div>

//       {/* Legal and Copyright */}
//       <div className="text-center mt-4 text-sm text-gray-400">
//         <p>&copy; 2024 Food Donation App. All rights reserved.</p>
//         <p>Made with ❤️ for a better world.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-16">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Company Info */}
                <div className="text-center md:text-left md:w-1/2 px-6 py-4">
                    <h3 className="text-2xl font-semibold mb-4">Food Donation App</h3>
                    <p className="text-lg mt-2 max-w-md mx-auto md:mx-0">
                        A platform to connect food donors and receivers. Your contributions
                        make a difference!
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col md:flex-row md:w-1/2 md:space-x-8 text-lg text-center md:text-right px-6 py-4">
                    <Link to="/aboutus" className="hover:text-blue-400 mb-2 md:mb-0">
                        About Us
                    </Link>
                    <Link to="/contactus" className="hover:text-blue-400 mb-2 md:mb-0">
                        Contact Us
                    </Link>
                    <a href="/" className="hover:text-blue-400 mb-2 md:mb-0">
                        Privacy Policy
                    </a>
                    <a href="/" className="hover:text-blue-400 mb-2 md:mb-0">
                        Terms of Service
                    </a>
                </div>
            </div>

            {/* Legal and Copyright */}
            <div className="text-center  text-lg text-gray-400 px-6 py-4">
                <p>&copy; 2024 Food Donation App. All rights reserved.</p>
                <p>Made with ❤️ for a better world.</p>
            </div>
        </footer>
    );
};

export default Footer;
