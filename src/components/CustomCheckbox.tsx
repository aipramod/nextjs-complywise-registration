"use client";

import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomCheckboxProps {
  name: string;
  label: React.ReactNode;
  required?: boolean;
}

const CustomCheckbox = ({ name, label, required = false }: CustomCheckboxProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const isChecked = watch(name);
  const errorMessage = errors[name]?.message?.toString() || "";
  const hasError = !!errorMessage;

  // Handle checkbox click manually because register() doesn't work directly with Shadcn Checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setValue(name, checked, { shouldValidate: true });
  };

  return (
    <div className="relative mb-6">
      <div className="flex items-start space-x-3">
        <Checkbox
          id={name}
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className={`${hasError ? 'border-red-500' : 'border-zinc-700'} bg-zinc-900/50`}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor={name}
            className="text-sm font-medium leading-none text-zinc-300 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center text-red-400 text-xs gap-1 mt-1"
              >
                <FaExclamationCircle size={12} />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hidden input for react-hook-form registration */}
      <input 
        type="hidden" 
        {...register(name)}
        value={isChecked ? "true" : "false"}
      />
    </div>
  );
};

export default CustomCheckbox; 