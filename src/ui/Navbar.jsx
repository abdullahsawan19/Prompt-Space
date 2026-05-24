import { Link } from "react-router-dom";

const Navbar = ({
  logoText = "PromptSpace",
  logoPath = "/",
  links = [], // لينكات النص (اختيارية)
  rightActions = null, // الزراير اللي على اليمين (اختيارية)
  leftActions = null, // أي أيقونات على الشمال (اختيارية)
  className = "", // أي كلاسات إضافية
}) => {
  return (
    <nav
      className={`z-40 w-full border-b border-[var(--color-grey-100)] bg-[var(--color-grey-0)]/95 backdrop-blur-md ${className}`}
    >
      {/* غيرنا الارتفاع لـ h-16 للموبايل و h-20 للديسكتوب عشان يناسب كل الحالات */}
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* الجزء الأيسر: اللوجو + أي أيقونات إضافية */}
        <div className="flex items-center gap-3">
          {leftActions}
          <Link
            to={logoPath}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-shrink-0 items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-black text-[var(--color-brand-600)]">
              {logoText}
            </span>
          </Link>
        </div>

        {/* الجزء الأوسط: اللينكات (بتختفي في الموبايل) */}
        {links.length > 0 && (
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-[15px] font-semibold text-[var(--color-grey-600)] transition-colors duration-200 hover:text-[var(--color-brand-600)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* الجزء الأيمن: زراير تسجيل الدخول أو الثيم أو قائمة الموبايل */}
        <div className="flex items-center gap-3 md:gap-5">{rightActions}</div>
      </div>
    </nav>
  );
};

export default Navbar;
