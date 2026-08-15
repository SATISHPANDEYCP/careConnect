import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <div className="pt-12 text-center text-2xl text-[#707070]">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-12 grid items-center gap-10 md:grid-cols-[minmax(300px,480px)_minmax(0,1fr)] lg:gap-16">
        <img
          className="h-full max-h-[540px] w-full rounded-lg object-cover"
          src={assets.about_image}
          alt="CareConnect healthcare team with a patient"
        />
        <div className="flex max-w-3xl flex-col justify-center gap-6 text-sm leading-relaxed text-gray-600 sm:text-base">
          <p>
            Welcome to CareConnect, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At CareConnect, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            CareConnect is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you are booking your first appointment or managing
            ongoing care, CareConnect is here to support you every step of the
            way.
          </p>

          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at CareConnect is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="my-6 text-xl">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 md:grid-cols-3">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE: </b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
