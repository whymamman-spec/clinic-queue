function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-slate-500">
          © {currentYear} ClinicQueue. All rights reserved.
        </p>

        <p className="text-xs text-slate-400 mt-2">
          Helping Nigerian clinics reduce waiting time.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
