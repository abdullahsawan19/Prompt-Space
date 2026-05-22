import Button from "../../ui/Button";

const BottomCTA = () => {
  return (
    <section className="my-24 max-w-7xl mx-auto px-6">
      <div className="p-12 md:p-20 rounded-3xl bg-[var(--color-brand-600)] text-[#fff] text-center shadow-[var(--shadow-lg)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg text-[var(--color-grey-100)] mb-10 font-medium opacity-90">
            Join hundreds of builders optimizing their AI workflows. Sign up
            now, no credit card required.
          </p>
          <Button
            to="/register"
            size="lg"
            className="bg-[var(--color-grey-0)] text-[var(--color-brand-600)] hover:bg-[var(--color-grey-100)] shadow-[var(--shadow-md)]"
          >
            Get Started For Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
