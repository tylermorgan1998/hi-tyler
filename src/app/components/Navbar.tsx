export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#18191b]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#a259ff] to-[#7b61ff] rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white">T</span>
          </div>
          <span className="text-white">Tyler</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-[#b3b3b3] hover:text-white transition-colors">
            Work
          </a>
          <a href="#about" className="text-[#b3b3b3] hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="text-[#b3b3b3] hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
      <button className="bg-[#a259ff] text-white px-5 py-2 rounded-lg hover:bg-[#8e4ddb] transition-colors shadow-lg">
        Get in touch
      </button>
    </nav>
  );
}