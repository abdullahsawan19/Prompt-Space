const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} PromptSpace. All rights reserved.</p>
      <div className="mt-2 text-sm space-x-4">
        <a href="/about" className="hover:text-blue-600">
          About
        </a>
        <a href="/terms" className="hover:text-blue-600">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};
export default Footer;
