import { DEFAULT_SPACING } from "@/consts/styleConsts";
import { twMerge } from "tailwind-merge";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";

function Header() {
  return (
    <header
      className="bg-card/60 sticky top-0 backdrop-blur-sm w-full z-50 border-b border-border"
    >
      <div
        className={twMerge(
          "flex items-center justify-between py-5",
          DEFAULT_SPACING,
        )}
      >
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <h1 className="font-bold tracking-wider uppercase text-foreground">
            My Trading Dashboard
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
