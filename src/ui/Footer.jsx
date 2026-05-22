const Footer = () => {
  return (
    <footer className="py-8 bg-[var(--color-grey-50)] border-t border-[var(--color-grey-200)] text-center text-[var(--color-grey-500)]">
      <p>&copy; {new Date().getFullYear()} PromptSpace. All rights reserved.</p>
      <div className="mt-2 text-sm space-x-4">
        <a
          href="/about"
          className="hover:text-[var(--color-brand-600)] transition-colors"
        >
          About
        </a>
        <a
          href="/terms"
          className="hover:text-[var(--color-brand-600)] transition-colors"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
};
export default Footer;
