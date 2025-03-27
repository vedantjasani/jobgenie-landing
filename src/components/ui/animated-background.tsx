
import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Animated floating elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-jobfix-100/20 to-jobfix-300/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [Math.random() * 20, -Math.random() * 20],
            x: [Math.random() * 20, -Math.random() * 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Gradient Blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-jobfix-100/30 rounded-full filter blur-[80px] opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-jobfix-200/20 rounded-full filter blur-[100px] opacity-60"></div>
      <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-jobfix-300/20 rounded-full filter blur-[70px] opacity-50"></div>
    </div>
  );
};

export default AnimatedBackground;
