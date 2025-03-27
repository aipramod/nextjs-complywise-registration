"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: IconType;
  required?: boolean;
  validation?: Record<string, any>;
}

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder = "",
  icon: Icon,
  required = false,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  
  const [isFocused, setIsFocused] = useState(false);

  const errorMessage = errors[name]?.message?.toString() || "";
  const hasError = !!errorMessage;

  return (
    <div className="relative mb-6">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        
        <div 
          className={cn(
            "relative border rounded-md transition-all duration-200 bg-zinc-900/50 backdrop-blur-sm",
            hasError ? "border-red-500" : (isFocused ? "border-indigo-500" : "border-zinc-700"),
            Icon ? "pl-10" : "pl-3"
          )}
        >
          <Input
            {...register(name)}
            id={name}
            type={type}
            placeholder=" "
            className={cn(
              "border-0 bg-transparent text-zinc-100 pt-5 pb-2 px-3 w-full transition-all shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              hasError ? "placeholder:text-red-300" : "placeholder:text-zinc-500"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Label
            htmlFor={name}
            className={cn(
              "absolute left-0 top-0 px-3 pt-2 text-xs transition-all pointer-events-none",
              Icon ? "left-10" : "left-3",
              hasError 
                ? "text-red-400" 
                : (isFocused ? "text-indigo-400" : "text-zinc-500")
            )}
          >
            {label}{required && "*"}
          </Label>
        </div>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center text-red-400 text-xs mt-1 ml-1 gap-1 absolute"
          >
            <FaExclamationCircle size={12} />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput; 