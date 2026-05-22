import Button from "../../ui/Button";

const HeroSection = () => {
  return (
    <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#000] opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
          Master Your Prompts with{" "}
          <span className="text-[var(--color-brand-500)]">PromptSpace</span>
        </h1>
        <p className="text-xl text-[#d1d5db] mb-10 max-w-2xl mx-auto font-medium">
          The ultimate cloud workspace to organize, test, and collaborate on
          your AI prompts with your team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/register" size="lg">
            Get Started Free
          </Button>
          <Button
            to="/login"
            variant="secondary"
            size="lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
            }}
            className="backdrop-blur-md hover:bg-white/20"
          >
            Explore Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
