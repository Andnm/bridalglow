import React, { useState } from "react";
import wedding_1 from "../../assets/images/wedding_1.png";
import wedding_2 from "../../assets/images/wedding_2.png";
import wedding_3 from "../../assets/images/wedding_3.png";
import styling_1 from "../../assets/images/styling_1.png";
import styling_2 from "../../assets/images/styling_2.png";
import styling_3 from "../../assets/images/styling_3.png";
import vr_1 from "../../assets/images/vr_1.png";
import vr_2 from "../../assets/images/vr_2.png";
import vr_3 from "../../assets/images/vr_3.png";
import flora from "../../assets/images/flora.png";
import hilton from "../../assets/images/hilton.png";
import muong_thanh from "../../assets/images/muong_thanh.png";
import s from "../../assets/images/s.png";
import willow from "../../assets/images/willow.png";
import { Carousel } from "antd";
import { feedback_carousel } from "../../utils/constants";
import { motion } from "framer-motion";
import { fadeIn, slideInLeft, slideInRight, slideUp } from "../../utils/common";

function Home() {
  const logoHoverVariants = {
    hover: {
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };


  return (
    <div className="home-page">
      <div className="relative">
        <motion.section
          className="banner-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        />

        <motion.div
          className="welcome-section absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] light-yellow-background text-center py-4 px-16 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={slideUp}
        >
          <motion.h1
            className="hurricane-font text-7xl text-black"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to Wedding Dream!
          </motion.h1>
          <motion.p className="my-3 inria-serif-font" variants={fadeIn}>
            Imagine walking down the aisle or standing at the altar before the
            big day – with our Virtual Reality (VR) experience, you can! We
            offer an innovative, immersive VR experience that lets you preview
            your entire wedding, from venue setup to the smallest details,
            giving you full confidence that everything will be perfect. Explore,
            customize, and feel your dream day come to life before it happens.
            Let us bring your vision to reality with cutting-edge technology and
            expert planning for an unforgettable wedding experience.
          </motion.p>

          <motion.div
            className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg"
            style={{ backgroundColor: "#9A3939" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Chat
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-50"></div>

      {/* our services */}
      <motion.div
        className="text-center container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={slideUp}
      >
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
        <motion.div
          className="flex flex-row gap-8 justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="playfair-display-font text-3xl text-black font-medium w-40"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
            }}
          >
            Wedding Planning
          </motion.p>

          <motion.p
            className="playfair-display-font text-3xl text-black font-bold"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.3 } },
            }}
          >
            *
          </motion.p>

          <motion.p
            className="playfair-display-font text-3xl text-black font-medium w-40"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.4 } },
            }}
          >
            Styling & Decoration
          </motion.p>

          <motion.p
            className="playfair-display-font text-3xl text-black font-bold"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.3 } },
            }}
          >
            *
          </motion.p>

          <motion.p
            className="playfair-display-font text-3xl text-black font-medium w-40"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.4 } },
            }}
          >
            VR Experience
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="mt-20"></div>

      {/* wedding planning home */}
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <div className="ml-12 pb-20 w-fit">
            <h2 className="playfair-display-font text-5xl text-black font-medium w-fit">
              Wedding <br />
              Planning
            </h2>
            <motion.p
              className="inria-serif-font w-110 font-thin mt-3"
              variants={fadeIn}
            >
              Our wedding planning service brings your dream day to life with
              expert care. From concept to execution, we handle every detail,
              ensuring a flawless and unforgettable celebration, so you can
              relax and enjoy your big day.
            </motion.p>
          </div>

          <motion.img
            src={wedding_1}
            loading="lazy"
            alt="wedding_1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
        >
          <motion.img
            src={wedding_2}
            loading="lazy"
            alt="wedding_2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={wedding_3}
            loading="lazy"
            alt="wedding_3"
            className="mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      <div className="mt-20"></div>

      {/* styling home */}
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <motion.img
            src={styling_1}
            loading="lazy"
            alt="styling_1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={styling_2}
            loading="lazy"
            alt="styling_2"
            className="mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
        >
          <div className="ml-12 pb-20 w-fit">
            <h2 className="playfair-display-font text-5xl text-black font-medium w-fit">
              Styling &
              <br />
              Decoration
            </h2>
            <motion.p
              className="inria-serif-font w-110 font-thin mt-3"
              variants={fadeIn}
            >
              Our styling decoration service transforms your wedding venue into
              a beautiful, personalized space. From elegant designs to unique
              themes, we handle every detail to match your vision, creating a
              stunning and memorable atmosphere for your special day.
            </motion.p>
          </div>

          <motion.img
            src={styling_3}
            loading="lazy"
            alt="styling_3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* vr  */}
      <div className="mt-20"></div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-2 gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <div className="ml-12 pb-20 w-fit">
            <h2 className="playfair-display-font text-5xl text-black font-medium w-fit">
              VR <br />
              Experience
            </h2>
            <motion.p
              className="inria-serif-font w-110 font-thin mt-3"
              variants={fadeIn}
            >
              Our VR experience lets you preview your wedding day in a fully
              immersive virtual setting. Walk through your venue, see your
              décor, and make real-time adjustments before the big day. It’s a
              stress-free way to visualize and perfect every detail, ensuring
              your wedding is exactly as you imagined.
            </motion.p>
          </div>

          <img src={vr_1} loading="lazy" alt="vr_1" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
        >
          <motion.img
            src={vr_2}
            loading="lazy"
            alt="vr_2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={vr_3}
            loading="lazy"
            alt="vr_3"
            className="mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* our feedback */}
      <div className="mt-20"></div>

      <motion.div
        className="max-w-[1000px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Carousel
          dots={true}
          speed={400}
          slidesToShow={2}
          slidesToScroll={1}
          infinite={feedback_carousel.length > 2}
          className="my-6"
          autoplay
          autoplaySpeed={3000}
          dotStyle={{
            activeDot: { backgroundColor: "#9A3939" },
            inactiveDot: { backgroundColor: "#F5C5C5" },
          }}
        >
          {feedback_carousel.map((feedback) => (
            <div
              className="text-center flex justify-center items-center"
              key={feedback.id}
            >
              <h3 className="w-[400px] inria-serif-font text-black">
                {feedback.author}
              </h3>
              <p className=" w-[400px] inria-serif-font text-black mt-5">
                {feedback.des}
              </p>
            </div>
          ))}
        </Carousel>
      </motion.div>

      <div className="flex justify-center">
        <div
          className="cursor-pointer w-fit px-8 py-3 rounded-sm my-20"
          style={{ backgroundColor: "#9A3939" }}
        >
          <p className="playfair-display-font text-xl font-thin text-white">
            View Our Feedback
          </p>
        </div>
      </div>

      {/* we have work with */}
      <div className="mt-15"></div>
      <motion.div
        className="light-yellow-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-[1000px] mx-auto py-6">
          <motion.h1
            className="uppercase inria-serif-font text-2xl text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            WE HAVE WORK WITH...
          </motion.h1>

          <motion.div
            className="grid grid-cols-5 gap-4 mt-10 mb-10"
            variants={containerVariants}
          >
            <motion.img
              src={muong_thanh}
              alt="muong_thanh"
              loading="lazy"
              variants={logoHoverVariants}
            />
            <motion.img
              src={hilton}
              alt="hilton"
              loading="lazy"
              variants={logoHoverVariants}
            />
            <motion.img
              src={s}
              alt="s"
              loading="lazy"
              variants={logoHoverVariants}
            />
            <motion.img
              src={willow}
              alt="willow"
              loading="lazy"
              variants={logoHoverVariants}
            />
            <motion.img
              src={flora}
              alt="flora"
              loading="lazy"
              variants={logoHoverVariants}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* let's chat */}
      <div className="mt-20"></div>

      <motion.div
        className="flex justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
      >
        <div className="welcome-section w-[900px] light-yellow-background text-center py-10 px-16 shadow-lg">
          <motion.h1
            className="hurricane-font text-9xl text-black"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Looking
          </motion.h1>
          <p className="my-7 inria-serif-font font-semibold">
            for a professional team to take care of your wedding?
          </p>
          <motion.div
            className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg"
            style={{ backgroundColor: "#9A3939" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Chat
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-20"></div>
    </div>
  );
}

export default Home;
