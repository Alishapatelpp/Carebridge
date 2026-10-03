function FeatureCard({ title, description, icon, darkMode }) {
  return (
    <div
      className={`rounded-2xl shadow-md p-6 transition duration-300 hover:shadow-xl ${
        darkMode
          ? "bg-slate-800"
          : "bg-white"
      }`}
    >
      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3
        className={`text-xl font-semibold mb-2 ${
          darkMode
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`${
          darkMode
            ? "text-slate-300"
            : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;