function Footer() {
  return (
    <footer className="system-color2 text-color text-xs font-medium text-center p-md border-radius-md mt-lg shadow-card dark:shadow-none">
      <p className="mb-xs text-color-muted italic">
        “Small consistent steps beat short bursts of intensity.” 💡
      </p>
      <p className="tracking-normal">
        &copy; {new Date().getFullYear()} FocusFlow. Built by Niran with
        intention and zero distractions. ✨
      </p>
    </footer>
  );
}

export default Footer;
