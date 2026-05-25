import { DEFAULT_SPACING } from "@/consts/styleConsts";
import { twMerge } from "tailwind-merge";

function Header() {
  return (
    <header
      className="bg-white/20 sticky top-0 backdrop-blur-sm w-full z-50"
    >
      <div className={twMerge("flex items-center space-x-3 py-6", DEFAULT_SPACING)}>
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <h1 className="font-bold tracking-wider uppercase text-black">
            My Trading Dashboard
        </h1>
      </div>
    </header>
  );
}

export default Header;
