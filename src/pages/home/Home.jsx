import React, { useState } from "react";
import wedding_1 from "../../assets/images/wedding_1.png";
import wedding_2 from "../../assets/images/wedding_2.png";
import wedding_3 from "../../assets/images/wedding_3.png";

function Home() {
  return (
    <div className="home-page">
      <div className="relative">
        <section className="banner-section"></section>

        <div className="welcome-section absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] light-yellow-background text-center py-4 px-16 shadow-lg">
          <h1 className="hurricane-font text-7xl text-black">
            Welcome to Wedding Dream!
          </h1>
          <p className="my-3 inria-serif-font">
            Imagine walking down the aisle or standing at the altar before the
            big day – with our Virtual Reality (VR) experience, you can! We
            offer an innovative, immersive VR experience that lets you preview
            your entire wedding, from venue setup to the smallest details,
            giving you full confidence that everything will be perfect. Explore,
            customize, and feel your dream day come to life before it happens.
            Let us bring your vision to reality with cutting-edge technology and
            expert planning for an unforgettable wedding experience.
          </p>
          <div
            className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg"
            style={{ backgroundColor: "#9A3939" }}
          >
            Let's Chat
          </div>
        </div>
      </div>

      <div className="mt-50"></div>

      {/* our services */}
      <div className="text-center container">
        <h1 className="inria-serif-font text-3xl text-black font-semibold">
          OUR SERVICE
        </h1>
        <p className="inria-serif-font px-50 my-3">
          Our wedding planning and styling service brings your dream day to
          life. We handle everything from planning to décor, ensuring every
          detail reflects your vision. Whether classic or modern, we create
          beautifully styled weddings tailored to you, making your special day
          seamless and unforgettable.
        </p>
        <div className="flex flex-row gap-8 justify-center items-center">
          <p className="playfair-display-font text-3xl text-black font-medium w-40">
            Wedding Planning
          </p>
          <p className="playfair-display-font text-3xl text-black font-bold">
            *
          </p>
          <p className="playfair-display-font text-3xl text-black font-medium w-40">
            Styling & Decoration
          </p>
          <p className="playfair-display-font text-3xl text-black font-bold">
            *
          </p>
          <p className="playfair-display-font text-3xl text-black font-medium w-40">
            VR Experience
          </p>
        </div>
      </div>

      <div className="mt-50"></div>

      {/* wedding planning home */}
      <div className="container grid grid-cols-2">
        <div>
          <div>
            <h2 className="playfair-display-font">Wedding Planning</h2>
            <p className="inria-serif-font">
              Our wedding planning service brings your dream day to life with
              expert care. From concept to execution, we handle every detail,
              ensuring a flawless and unforgettable celebration, so you can
              relax and enjoy your big day.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
