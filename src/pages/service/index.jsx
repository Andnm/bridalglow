import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "../../utils/common";
import { handleActionNotSupport } from "../../utils/helpers";
import WeddingPlanning from "../../components/services/WeddingPlanning";
import StylingDecoration from "../../components/services/StylingDecoration";
import OurServices from "../../components/services/OurServices";

const Services = () => {
  const [selectedService, setSelectedService] = useState("our-services");
  const [scrollToSection, setScrollToSection] = useState(false);

  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setScrollToSection(true);
    setTimeout(() => setScrollToSection(false), 500);
  };

  return (
    <div className="services-page">
      <div className="relative">
        <motion.section
          className="banner-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        />

        <motion.div
          className="welcome-section absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] light-yellow-background text-center py-4 px-16 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
        >
          <motion.h1
            className="hurricane-font text-7xl text-black cursor-pointer"
            onClick={() => setSelectedService("our-services")}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Services
          </motion.h1>
          <motion.p className="my-3 inria-serif-font mb-10" variants={fadeIn}>
            As one of the firstpremiumand professional wedding planners based in
            Vietnam, Wedding Dream specializes in full wedding consultancy,
            design, planning and execution.
          </motion.p>
        </motion.div>
      </div>

      <div className="mt-40"></div>

      <div className="grid grid-cols-3 w-[1000px] mx-auto">
        <motion.div
          className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg transition duration-300 ease-in-out hover:bg-[#7a2d2d] hover:scale-105"
          style={{ backgroundColor: "#9A3939" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          onClick={() => handleServiceClick("wedding")}
        >
          <p className="playfair-display-font">WEDDING PLANNING</p>
        </motion.div>
        <motion.div
          className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg transition duration-300 ease-in-out hover:bg-[#7a2d2d] hover:scale-105"
          style={{ backgroundColor: "#9A3939" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          onClick={() => handleServiceClick("styling")}
        >
          <p className="playfair-display-font">STYLING & DECORATION</p>
        </motion.div>
        <motion.div
          className="text-white w-fit px-6 py-3 rounded-md cursor-pointer mx-auto shadow-lg transition duration-300 ease-in-out hover:bg-[#7a2d2d] hover:scale-105"
          style={{ backgroundColor: "#9A3939" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          onClick={handleActionNotSupport}
        >
          <p className="playfair-display-font">VR EXPERIENCE</p>
        </motion.div>
      </div>

      <div className="mt-10" />

      {selectedService === "our-services" && <OurServices />}
      {selectedService === "wedding" && (
        <WeddingPlanning scrollTo={scrollToSection} />
      )}
      {selectedService === "styling" && (
        <StylingDecoration scrollTo={scrollToSection} />
      )}
      <div className="mt-10" />
    </div>
  );
};

export default Services;
