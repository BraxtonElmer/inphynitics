import { motion } from "framer-motion";
import { SectionWrapper } from "./ui/section-wrapper";
import videocallImage from "../assets/videocall.png";

export function StudentExperience() {
  return (
    <SectionWrapper id="experience" className="py-20 bg-gray-50 rounded-t-[50px] text-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
            What Students Experience?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Learning designed to spark curiosity, not confusion.
          </p>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="w-full relative overflow-hidden">
              <img 
                src={videocallImage}
                alt="Interactive space educational interface" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* <div className="absolute bottom-4 left-4 bg-white rounded-lg p-1 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=100&h=100" 
                alt="Student engaged in learning" 
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button className="bg-red-500 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3h5m0 0v5m0-5l-6 6M3 16v5m0 0h5m-5 0l6-6" />
                </svg>
              </button>
              <button className="bg-primary hover:bg-secondary w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div> */}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Concept Clarity",
            "Real-World Scenario",
            "Active Engagement"
          ].map((title, index) => (
            <motion.div
              key={title}
              className="bg-white rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
