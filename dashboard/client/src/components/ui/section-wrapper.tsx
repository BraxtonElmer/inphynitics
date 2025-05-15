import { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface SectionWrapperProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function SectionWrapper({
  children,
  className = "",
  as: Component = "section",
  ...props
}: SectionWrapperProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Component
      ref={ref}
      className={className}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
