import Card from "../../ui/Card";
import { MdFolderOpen, MdHistory, MdPeopleOutline } from "react-icons/md";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MdFolderOpen size={30} />,
      title: "Smart Workspaces",
      desc: "Categorize your prompts into dedicated workspaces for different clients, projects, or AI models.",
    },
    {
      icon: <MdHistory size={30} />,
      title: "Version Control",
      desc: "Track every single iteration. Never lose a high-performing prompt variation again. Revert anytime.",
    },
    {
      icon: <MdPeopleOutline size={30} />,
      title: "Real-time Collaboration",
      desc: "Share workspaces with your team members, leave feedback, and build a unified prompt library.",
    },
  ];

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-grey-900)] sm:text-5xl">
          Everything you need to optimize AI workflows
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feat, i) => (
          <Card
            key={i}
            className="flex flex-col items-start text-left group cursor-default hover:border-[var(--color-brand-500)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
          >
            <div
              // هنا ضفنا اللون الأساسي، ولما يحصل هوفر بنعكس الألوان وبنكبر الأيقونة
              className="p-3 bg-[var(--color-grey-100)] text-[var(--color-brand-600)] rounded-xl mb-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[var(--color-brand-600)] group-hover:text-[var(--color-grey-0)] shadow-sm"
            >
              {feat.icon}
            </div>

            <h3 className="text-xl font-bold mb-3 text-[var(--color-grey-900)] transition-colors duration-300 ease-out group-hover:text-[var(--color-brand-600)]">
              {feat.title}
            </h3>

            <p className="text-[var(--color-grey-600)] leading-relaxed text-[15px]">
              {feat.desc}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
