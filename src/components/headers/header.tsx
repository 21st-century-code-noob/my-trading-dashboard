function Header() {
  return (
    <header
      className="p-6 border-b border-border bg-background/30 sticky top-0 backdrop-blur-md w-full"
    >
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <h1 className="font-bold tracking-wider uppercase text-white">
            My Trading Dashboard
        </h1>
      </div>
    </header>
  );
}

export default Header;
