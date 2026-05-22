import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section - Full screen image */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div> {/* Overlay */}
        </div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Master Your Prompts with{" "}
            <span className="text-blue-500">PromptSpace</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            The ultimate workspace to organize, iterate, and collaborate on your
            AI prompts with your team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* 2. About & Benefits Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 dark:text-white">
          Why PromptSpace?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">
              Organized Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stop losing your best prompts in chat logs. Keep everything in one
              structured place.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">
              Version Control
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track iterations and revert to previous prompt versions with ease.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your prompt library with your team and streamline your AI
              workflows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
