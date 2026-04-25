export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyDevLog. Built with Next.js & App Router.</p>
      <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#888'}}>
        Contact: your.email@example.com | GitHub: github.com/yourid
      </p>
    </footer>
  );
}
