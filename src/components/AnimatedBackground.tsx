"use client";

import { motion } from "framer-motion";

// Particles component with proper typing
const Particles = () => {
  // Generate 20 particles with random properties
  const particles = Array.from({ length: 20 }).map((_, index) => {
    const size = Math.floor(Math.random() * 4) + 2; // Random size between 2-6px
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    const animationDuration = Math.random() * 20 + 15; // Random duration as number
    const animationDelay = Math.random() * 10; // Random delay as number
    
    return (
      <motion.div
        key={index}
        className="absolute rounded-full bg-white/30 pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top,
          left,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: animationDuration,
          delay: animationDelay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles}
    </div>
  );
};

// Animated blobs component
const AnimatedBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute top-0 -right-20 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
      />
    </div>
  );
};

// Grid background component
const GridBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="h-full w-full pointer-events-none"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundPosition: "center center",
          transformStyle: "preserve-3d"
        }}
        animate={{
          backgroundSize: ["40px 40px", "45px 45px", "40px 40px"],
          opacity: [0.15, 0.25, 0.15],
          rotateX: [5, 2, 5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-900">
        <GridBackground />
        <AnimatedBlobs />
        <Particles />
      </div>
    </div>
  );
};

export default AnimatedBackground; 