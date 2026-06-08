import Card from "../../ui/Card";
import {
  MdWorkOutline,
  MdCode,
  MdCreate,
  MdCampaign,
  MdBrush,
  MdSchool,
} from "react-icons/md";

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: <MdWorkOutline size={26} />,
      role: "Freelancers",
      perk: "Keep your clients' custom prompts secure, organized, and ready for instant delivery.",
    },
    {
      icon: <MdCode size={26} />,
      role: "Software Engineers",
      perk: "Store repetitive system prompts, MERN stack context rules, and debugging templates safely.",
    },
    {
      icon: <MdCreate size={26} />,
      role: "Content Creators",
      perk: "Build custom automation structures for copywriting, scripting, and content ideation.",
    },
    {
      icon: <MdCampaign size={26} />,
      role: "Digital Marketers",
      perk: "Organize proven formulas for ad copy, SEO meta descriptions, and email campaigns.",
    },
    {
      icon: <MdBrush size={26} />,
      role: "AI Artists & Designers",
      perk: "Save complex Midjourney or DALL-E parameter strings and negative prompts.",
    },
    {
      icon: <MdSchool size={26} />,
      role: "Researchers & Students",
      perk: "Maintain strict prompt templates for academic summarizing and literature reviews.",
    },
  ];

  return (
    <section
      id="audience"
      className="pt-24 pb-12 md:pb-16 max-w-7xl mx-auto px-6 text-center"
    >
      <h2 className="text-4xl font-bold mb-4 text-[var(--color-grey-900)]">
        Tailored for Modern Creators
      </h2>
      <p className="text-[var(--color-grey-500)] mb-16 max-w-xl mx-auto">
        No matter your workflow, PromptSpace speeds up your AI interactions.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {audiences.map((aud, i) => (
          <Card
            key={i}
            className="group cursor-default hover:border-[var(--color-brand-500)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[var(--color-brand-600)] p-2.5 bg-[var(--color-grey-100)] rounded-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[var(--color-brand-600)] group-hover:text-[var(--color-grey-0)] shadow-sm">
                {aud.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-grey-900)] transition-colors duration-300 ease-out group-hover:text-[var(--color-brand-600)]">
                {aud.role}
              </h3>
            </div>
            <p className="text-left text-[var(--color-grey-600)] text-sm leading-relaxed">
              {aud.perk}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TargetAudienceSection;
