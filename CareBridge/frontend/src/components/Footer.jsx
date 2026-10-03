
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-400">
          CareBridge
        </h2>
 
        <p className="mt-3 text-slate-300">
          Connecting Patients, Pharmacies and Care
        </p>
 
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>
 
          <a href="#features" className="hover:text-blue-400">
            Features
          </a>
 
          <a href="#about" className="hover:text-blue-400">
            About
          </a>
        </div>
 
        <p className="mt-6 text-sm text-slate-400">
          © 2026 CareBridge. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
 
export default Footer;
 