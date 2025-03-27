import RegistrationForm from "@/components/RegistrationForm";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <RegistrationForm />
    </main>
  );
}
