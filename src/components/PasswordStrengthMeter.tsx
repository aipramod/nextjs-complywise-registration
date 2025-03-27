"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { FaCheck, FaTimes } from "react-icons/fa";

interface PasswordStrengthMeterProps {
  password: string;
}

interface Criteria {
  label: string;
  met: boolean;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState("Too weak");
  const [color, setColor] = useState("bg-red-500");
  const [textColor, setTextColor] = useState("text-red-500");
  const [criteria, setCriteria] = useState<Criteria[]>([
    { label: "At least 8 characters", met: false },
    { label: "At least one uppercase letter", met: false },
    { label: "At least one lowercase letter", met: false },
    { label: "At least one number", met: false },
    { label: "At least one special character", met: false },
  ]);

  useEffect(() => {
    const calculateStrength = () => {
      // Copy the criteria
      const newCriteria = [...criteria];

      // Check each criteria
      newCriteria[0].met = password.length >= 8;
      newCriteria[1].met = /[A-Z]/.test(password);
      newCriteria[2].met = /[a-z]/.test(password);
      newCriteria[3].met = /[0-9]/.test(password);
      newCriteria[4].met = /[^A-Za-z0-9]/.test(password);

      setCriteria(newCriteria);

      // Count met criteria
      const metCount = newCriteria.filter((criterion) => criterion.met).length;

      // Update strength
      let newStrength = 0;
      let newLabel = "Too weak";
      let newColor = "bg-red-500";
      let newTextColor = "text-red-500";

      if (password.length === 0) {
        newStrength = 0;
        newLabel = "Too weak";
        newColor = "bg-red-500";
        newTextColor = "text-red-500";
      } else if (metCount === 1) {
        newStrength = 20;
        newLabel = "Too weak";
        newColor = "bg-red-500";
        newTextColor = "text-red-500";
      } else if (metCount === 2) {
        newStrength = 40;
        newLabel = "Weak";
        newColor = "bg-orange-500";
        newTextColor = "text-orange-500";
      } else if (metCount === 3) {
        newStrength = 60;
        newLabel = "Medium";
        newColor = "bg-yellow-500";
        newTextColor = "text-yellow-500";
      } else if (metCount === 4) {
        newStrength = 80;
        newLabel = "Strong";
        newColor = "bg-lime-500";
        newTextColor = "text-lime-500";
      } else if (metCount === 5) {
        newStrength = 100;
        newLabel = "Very Strong";
        newColor = "bg-green-500";
        newTextColor = "text-green-500";
      }

      setStrength(newStrength);
      setLabel(newLabel);
      setColor(newColor);
      setTextColor(newTextColor);
    };

    calculateStrength();
  }, [password, criteria]);

  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-zinc-300">
          Password strength:
        </span>
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
      </div>
      
      <Progress 
        value={strength} 
        className="h-2 bg-zinc-800"
        indicatorClassName={color}
      />

      <div className="pt-2">
        <p className="text-xs font-medium text-zinc-300 mb-2">Password must have:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {criteria.map((criterion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              {criterion.met ? (
                <FaCheck className="text-green-500 text-xs" />
              ) : (
                <FaTimes className="text-zinc-500 text-xs" />
              )}
              <span className={`text-xs ${criterion.met ? "text-zinc-200" : "text-zinc-500"}`}>
                {criterion.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter; 