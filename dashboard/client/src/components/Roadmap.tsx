import { motion } from "framer-motion";
import { SectionWrapper } from "./ui/section-wrapper";
import firstLinePath from "../assets/first-line.png";
import secondLinePath from "../assets/second-line.png";
import engageImage from "../assets/engage.png";
import entertainImage from "../assets/entertain.png";
import educateImage from "../assets/educate.png";

export function Roadmap() {
  return (
    <SectionWrapper id="roadmap" className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title section */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-2">THE ROADMAP</h2>
            <h3 className="text-6xl font-bold mb-6">
              INPHY<span className="text-primary">NITICS</span>
            </h3>
            <div className="border-b-4 border-dashed border-primary w-32"></div>
          </motion.div>
        </div>

        {/* Mobile view - stack cards vertically */}
        <div className="block md:hidden space-y-8">
          <motion.div
            className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-lg border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
              <img
                src={engageImage}
                alt="Student engaging with interactive physics interface"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/60 blur-[3px] transform -translate-y-1/2 -rotate-3"></div>
            </div>
            <div className="p-5">
              <h4 className="text-2xl font-bold mb-2 text-white">Engage</h4>
              <p className="text-gray-300">
                Get high-quality on-demand video interactive modules and dynamic content like 3D animations and vector graphics to help you rise through the learning process.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-lg border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
              <img
                src={entertainImage}
                alt="Student interacting with physics visualization"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute right-6 top-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-[6px]"></div>
            </div>
            <div className="p-5">
              <h4 className="text-2xl font-bold mb-2 text-white">Entertain</h4>
              <p className="text-gray-300">
                Enjoy learning physics through fun, gamified experiences that make complex concepts memorable and keep you motivated throughout your educational journey.
              </p>
            </div>

          </motion.div>

          <motion.div
            className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-lg border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
              <img
                src={educateImage}
                alt="Student with interactive learning materials"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/3 h-1/3 border border-blue-400/50 rounded-md absolute left-[15%] top-[30%] transform rotate-3"></div>
                <div className="w-1/4 h-1/4 border border-cyan-400/40 rounded-md absolute right-[20%] top-[20%] transform -rotate-6"></div>
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-2xl font-bold mb-2 text-white">Educate</h4>
              <p className="text-gray-300">
                Access comprehensive learning materials designed to simplify complex physics concepts through interactive and engaging content.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Desktop layout - exactly matching the mockup with PNG lines */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-x-8 gap-y-36 relative" style={{ minHeight: "900px" }}>
            {/* First row - empty left, Engage card right */}
            <div className="col-span-1"></div>

            {/* Top right - Engage card */}
            <div className="col-span-1">
              <motion.div
                className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-xl border border-gray-800"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-52 relative overflow-hidden rounded-t-xl">
                  <img
                    src={engageImage}
                    alt="Student engaging with interactive physics interface"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-white/60 blur-[3px] transform -translate-y-1/2 -rotate-3"></div>
                </div>
                <div className="p-5">
                  <h4 className="text-2xl font-bold mb-2 text-white">Engage</h4>
                  <p className="text-gray-300">
                    Get high-quality on-demand video interactive modules and dynamic content like 3D animations and vector graphics to help you rise through the learning process.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Second row - Entertain card left, empty right */}
            <div className="col-span-1">
              <motion.div
                className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-xl border border-gray-800"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-52 relative overflow-hidden rounded-t-xl">
                  <img
                    src={entertainImage}
                    alt="Student interacting with physics visualization"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute right-6 top-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-[6px]"></div>
                </div>
                <div className="p-5">
                  <h4 className="text-2xl font-bold mb-2 text-white">Entertain</h4>
                  <p className="text-gray-300">
                    Enjoy learning physics through fun, gamified experiences that make complex concepts memorable and keep you motivated throughout your educational journey.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-span-1"></div>

            {/* Third row - empty left, Educate card right */}
            <div className="col-span-1"></div>

            <div className="col-span-1">
              <motion.div
                className="bg-black bg-opacity-40 rounded-xl overflow-hidden shadow-xl border border-gray-800"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-52 relative overflow-hidden rounded-t-xl">
                  <img
                    src={educateImage}
                    alt="Student with interactive learning materials"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/3 h-1/3 border border-blue-400/50 rounded-md absolute left-[15%] top-[30%] transform rotate-3"></div>
                    <div className="w-1/4 h-1/4 border border-cyan-400/40 rounded-md absolute right-[20%] top-[20%] transform -rotate-6"></div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-2xl font-bold mb-2 text-white">Educate</h4>
                  <p className="text-gray-300">
                    Access comprehensive learning materials designed to simplify complex physics concepts through interactive and engaging content.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* First dotted line - connecting first to second card */}
            <img 
              src={firstLinePath} 
              alt=""
              className="absolute z-10 top-[50px] right-[50%] w-[400px]"
              draggable="false"
            />

            {/* Second dotted line - connecting second to third card */}
            <img 
              src={secondLinePath} 
              alt=""
              className="absolute z-10 top-[600px] left-[50%] w-[400px]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
