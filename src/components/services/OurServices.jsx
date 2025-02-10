import React from "react";
import wedding_planning from "../../assets/images/wedding_planning.png";
import styling_decoring from "../../assets/images/styling_decoring.png";
import vr_experience from "../../assets/images/vr_experience.png";

const OurServices = () => {
  return (
    <>
      <div className="grid grid-cols-2 w-[900px] gap-10 mx-auto">
        <div className="flex flex-col justify-center">
          <h2 className="playfair-display-font text-4xl text-black font-medium w-fit">
            Wedding <br />
            Planning
          </h2>
          <p className="inria-serif-font font-thin mt-12">
            Our vision is to revolutionize wedding planning by combining
            creativity, innovation, and technology. We strive to set a new
            standard in the industry, offering couples an unforgettable,
            seamless experience through expert planning, personalized décor, and
            immersive VR previews. Our goal is to make every wedding as unique
            and special as the love it celebrates.
          </p>
          <p className="inria-serif-font font-thin mt-6">
            Our work is developed on the balance of dreams and reality. We pride
            ourselves in our personal approach towards weddings and how closely
            we work with our couples. More than delivering a service, we build a
            strong connection between the wedding planner and the couple to
            understand their needs, dreams and vision for their love
            celebration.
          </p>
        </div>

        <img src={wedding_planning} alt="wedding-planning" loading="lazy" />
      </div>

      <div className="mt-10"></div>

      <div className="grid grid-cols-2 w-[900px] gap-10 mx-auto">
        <img src={styling_decoring} alt="wedding-planning" loading="lazy" />

        <div className="flex flex-col justify-center">
          <h2 className="playfair-display-font text-4xl text-black font-medium w-fit">
            Styling& <br />
            Decoration
          </h2>
          <p className="inria-serif-font font-thin mt-12">
            We are a team of talented, ambitious planners who are passionate
            about helping couples create their weddings. Each member of the team
            is a unique personality but shares the same mindset, vision and
            professionalism.
          </p>
          <p className="inria-serif-font font-thin mt-6">
            At Wedding Dream, we perceive a wedding as a party of emotions,
            tasteful decoration, captivating activities and unforgettable
            moments. We are all driven by the joy of standing behind one’s most
            blissful day, creating lifetime moments and doing the magic of
            turning one’s dream into reality. Being a wedding planner allows us
            to fulfill our passion.
          </p>
        </div>
      </div>

      <div className="mt-10"></div>

      <div className="grid grid-cols-2 w-[900px] gap-10 mx-auto">
        <div className="flex flex-col justify-center">
          <h2 className="playfair-display-font text-4xl text-black font-medium w-fit">
            VR <br />
            Experience
          </h2>
          <p className="inria-serif-font font-thin mt-12">
            We have a big dream of exploring more beautiful destinations in
            Vietnam to hold weddings and to promote Vietnam as one of the best
            destinations for weddings in South East Asia. Being recognized as
            the most well-known name in planning destination weddings in
            Vietnam, over the past decade, we have carried out numerous amazing
            weddings.
          </p>
          <p className="inria-serif-font font-thin mt-6">
            At Wedding Dream, we perceive a wedding as a party of emotions,
            tasteful decoration, captivating activities and unforgettable
            moments. We are all driven by the joy of standing behind one’s most
            blissful day, creating lifetime moments and doing the magic of
            turning one’s dream into reality. Being a wedding planner allows us
            to fulfill our passion.
          </p>
        </div>

        <img src={vr_experience} alt="vr_experience" loading="lazy" />
      </div>
    </>
  );
};

export default OurServices;
