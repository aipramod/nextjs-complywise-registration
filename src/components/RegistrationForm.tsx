"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaIndustry, FaUsers, FaCheck } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import custom components
import FormInput from "./FormInput";
import CustomCheckbox from "./CustomCheckbox";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import StepIndicator from "./StepIndicator";

// Step names
const steps = ["Account Info", "Company Details", "Review"];

// Define validation schemas with Zod
const schema1 = z.object({
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

const schema2 = z.object({
  companyName: z.string().min(1, { message: "Please enter your company name" }),
  industry: z.string().min(1, { message: "Please select your industry" }),
  companySize: z.string().min(1, { message: "Please select your company size" }),
});

const schema3 = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue" }),
  }),
});

// Create merged schemas for each step
const getSchemaForStep = (step: number) => {
  switch (step) {
    case 0:
      return schema1;
    case 1:
      return schema1.merge(schema2);
    case 2:
      return schema1.merge(schema2).merge(schema3);
    default:
      return schema1;
  }
};

// Animation variants
const fadeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

type FormValues = z.infer<ReturnType<typeof getSchemaForStep>>;

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize form with React Hook Form and Zod
  const methods = useForm<FormValues>({
    resolver: zodResolver(getSchemaForStep(currentStep)),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      industry: "",
      companySize: "",
      termsAccepted: false,
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = methods;

  // Get password value for strength meter
  const password = watch("password");

  // Handle step navigation
  const goToNextStep = async () => {
    const isStepValid = await trigger();
    
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setShowSuccess(true);
  };

  // Industry options
  const industries = [
    { value: "", label: "Select Industry", disabled: true },
    { value: "finance", label: "Finance & Banking" },
    { value: "healthcare", label: "Healthcare" },
    { value: "technology", label: "Technology" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "other", label: "Other" },
  ];

  // Company size options
  const companySizes = [
    { value: "", label: "Company Size", disabled: true },
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501+", label: "501+ employees" },
  ];

  return (
    <div className="w-full max-w-md px-4">
      <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-xl shadow-xl overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-center text-2xl font-bold text-white mb-2">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Join thousands of companies managing compliance with ease
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Step Indicator */}
          {!showSuccess && <StepIndicator steps={steps} currentStep={currentStep} />}

          {/* Form Provider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  /* Success Message */
                  <motion.div
                    key="success"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1,
                          }}
                        >
                          <FaCheck className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-xl text-white font-bold mb-2">
                      Registration Successful!
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Thank you for creating an account with ComplyWise.
                    </p>
                    <p className="text-zinc-400 mb-8">
                      We've sent a verification email to your inbox. Please verify
                      your email to continue.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      size="lg"
                      onClick={() => window.location.href = "/"}
                    >
                      Go to Login
                    </Button>
                  </motion.div>
                ) : currentStep === 0 ? (
                  /* Step 1: Account Information */
                  <motion.div
                    key="step1"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <FormInput
                      name="fullName"
                      label="Full Name"
                      icon={FaUser}
                      required
                    />

                    <FormInput
                      name="email"
                      label="Email Address"
                      type="email"
                      icon={FaEnvelope}
                      required
                    />

                    <FormInput
                      name="password"
                      label="Create Password"
                      type="password"
                      icon={FaLock}
                      required
                    />

                    {/* Password Strength Meter */}
                    <PasswordStrengthMeter password={password} />

                    <div className="flex justify-end mt-8">
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={goToNextStep}
                        disabled={!isValid}
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                ) : currentStep === 1 ? (
                  /* Step 2: Company Information */
                  <motion.div
                    key="step2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <FormInput
                      name="companyName"
                      label="Company Name"
                      icon={FaBuilding}
                      required
                    />

                    <div className="flex flex-col space-y-1 mb-6">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                          <FaIndustry size={18} />
                        </div>
                        <select
                          {...methods.register("industry")}
                          className="w-full h-14 pl-10 pt-4 bg-zinc-900/50 border border-zinc-700 rounded-md text-white focus:border-indigo-500 focus:outline-none focus:ring-0 appearance-none"
                        >
                          {industries.map((industry) => (
                            <option
                              key={industry.value}
                              value={industry.value}
                              disabled={industry.disabled}
                            >
                              {industry.label}
                            </option>
                          ))}
                        </select>
                        <label
                          className="absolute left-10 top-2 text-xs text-zinc-500 transition-all pointer-events-none"
                        >
                          Industry*
                        </label>
                      </div>
                      {errors.industry && (
                        <span className="text-red-400 text-xs ml-1">
                          {errors.industry.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col space-y-1 mb-6">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                          <FaUsers size={18} />
                        </div>
                        <select
                          {...methods.register("companySize")}
                          className="w-full h-14 pl-10 pt-4 bg-zinc-900/50 border border-zinc-700 rounded-md text-white focus:border-indigo-500 focus:outline-none focus:ring-0 appearance-none"
                        >
                          {companySizes.map((size) => (
                            <option
                              key={size.value}
                              value={size.value}
                              disabled={size.disabled}
                            >
                              {size.label}
                            </option>
                          ))}
                        </select>
                        <label
                          className="absolute left-10 top-2 text-xs text-zinc-500 transition-all pointer-events-none"
                        >
                          Company Size*
                        </label>
                      </div>
                      {errors.companySize && (
                        <span className="text-red-400 text-xs ml-1">
                          {errors.companySize.message}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        onClick={goToPrevStep}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={goToNextStep}
                        disabled={!isValid}
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  /* Step 3: Review Information */
                  <motion.div
                    key="step3"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h3 className="text-zinc-300 font-medium mb-2 text-sm">
                        Account Information
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Name:</span>
                          <span className="text-white font-medium">
                            {watch("fullName")}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Email:</span>
                          <span className="text-white font-medium">
                            {watch("email")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h3 className="text-zinc-300 font-medium mb-2 text-sm">
                        Company Information
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Company:</span>
                          <span className="text-white font-medium">
                            {watch("companyName")}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Industry:</span>
                          <span className="text-white font-medium">
                            {industries.find(
                              (i) => i.value === watch("industry")
                            )?.label || ""}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Size:</span>
                          <span className="text-white font-medium">
                            {companySizes.find(
                              (s) => s.value === watch("companySize")
                            )?.label || ""}
                          </span>
                        </p>
                      </div>
                    </div>

                    <CustomCheckbox
                      name="termsAccepted"
                      required
                      label={
                        <span className="text-zinc-300">
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-indigo-400 hover:text-indigo-300 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Terms & Conditions would open here");
                            }}
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-indigo-400 hover:text-indigo-300 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Privacy Policy would open here");
                            }}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      }
                    />

                    <div className="flex justify-between mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        onClick={goToPrevStep}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        disabled={!isValid}
                      >
                        Complete Registration
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm; 