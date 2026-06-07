const Footer = () => {
  return (
    <footer className="py-8 bg-[var(--color-grey-50)] border-t border-[var(--color-grey-200)] text-center text-[var(--color-grey-500)]">
      <p>&copy; {new Date().getFullYear()} PromptSpace. All rights reserved.</p>
    </footer>
  );
};
export default Footer;
