"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="relative">
              {index < currentStep ? (
                // Completed step
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-emerald-500 flex items-center justify-center z-10"
                >
                  <FaCheck className="text-emerald-500" />
                </motion.div>
              ) : index === currentStep ? (
                // Current step
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                  className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-indigo-500 flex items-center justify-center text-sm font-medium text-indigo-300 z-10"
                >
                  {index + 1}
                </motion.div>
              ) : (
                // Future step
                <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-500 z-10">
                  {index + 1}
                </div>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-16 sm:w-24 h-px relative mx-1">
                <div className="absolute inset-0 bg-zinc-700" />
                {index < currentStep && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="absolute inset-0 bg-emerald-500"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex items-start justify-center mt-2">
        {steps.map((step, index) => (
          <div
            key={`label-${index}`}
            className={`w-10 text-center mx-[34px] text-xs ${
              index <= currentStep
                ? "text-zinc-300 font-medium"
                : "text-zinc-500"
            }`}
            style={{ transform: "translateX(-50%)" }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator; 