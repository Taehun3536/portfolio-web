import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/"><strong>Engineer Portfolio</strong></Link>
      </div>
      <div className="nav-links">
        <Link href="#hero">Home</Link>
        <Link href="#projects">Projects</Link>
      </div>
    </nav>
  );
}
