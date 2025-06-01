import React from 'react';
import Navbar from '@/components/Navbar';

const About = () => {

  return (
    <div className="min-h-screen">
        <Navbar />
      <div className="container mx-auto py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-10 text-4xl font-bold text-design-purple">
            About Country Explorer
          </h1>
          
          <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-3xl font-semibold mb-6">Welcome to Country Explorer!</h2>
            <p className="mb-6 text-lg leading-relaxed">
              Welcome to Country Explorer, your passport to discovering the diverse and fascinating nations that make up our world!
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to provide a clean, engaging, and easy-to-use platform for anyone curious to learn more about different countries. Whether you're a student, a traveler planning your next adventure, or just someone with a thirst for knowledge, Country Explorer is here to help you navigate the globe from the comfort of your screen.
            </p>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
            <ul className="space-y-4 text-lg leading-relaxed">
              <li>
                <strong>Comprehensive Country Data:</strong> Dive into details for countries from around the world. Each country page provides information such as its capital city, continent, official languages, currency, and even its national emoji.
              </li>
              <li>
                <strong>Easy Navigation:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Browse:</strong> Scroll through an extensive list of countries.</li>
                  <li><strong>Search:</strong> Quickly find any country by typing its name into the search bar.</li>
                  <li><strong>Filter:</strong> Narrow down your exploration by filtering countries by continent.</li>
                </ul>
              </li>
              <li>
                <strong>Detailed Country Pages:</strong> Click on any country to see a dedicated page with more in-depth information, helping you get a better understanding of what makes each nation unique.
              </li>
              <li>
                <strong>Customizable Viewing Experience:</strong> Tailor the website's appearance to your preference with our theme switcher. Choose between light, dark, or system default themes for optimal viewing comfort.
              </li>
            </ul>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-3xl font-semibold mb-6">Our Data Source</h2>
            <p className="text-lg leading-relaxed">
              All the information you see on Country Explorer is sourced from the Countries Trevor Blades API, ensuring you get a wide range of data points for each listed entity.
            </p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-md p-8 text-center">
            <p className="text-xl leading-relaxed">
              We hope you enjoy your journey with Country Explorer!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;