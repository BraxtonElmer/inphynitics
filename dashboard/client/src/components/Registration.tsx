import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionWrapper } from "./ui/section-wrapper";
import { apiRequest } from "@/lib/queryClient";

export function Registration() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      await apiRequest("POST", "/api/register", { email });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="signup" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto p-8 border border-gray-800 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Ready to dive into Inphynitics?
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Don't hesitate to leave us your email. We will contact you to discuss any questions you may have.
          </p>
          
          {success ? (
            <div className="text-center p-4 bg-green-900/30 rounded-lg mb-4 text-green-300">
              Thank you for registering! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-gray-800 text-white border-0 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none h-[50px]"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-secondary text-black font-semibold rounded-lg px-8 py-3 transition-colors h-[50px]"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </form>
          )}
          
          {error && (
            <div className="text-red-500 mt-2 text-center">
              {error}
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
