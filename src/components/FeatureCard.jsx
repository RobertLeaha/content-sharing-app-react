export default function FeatureCard({
  icon,
  title,
  description,
  onClick = null,
}) {
  const CardComponent = onClick ? "button" : "div";

  return (
    <CardComponent
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow ${
        onClick ? "cursor-pointer hover:bg-sky-50" : ""
      }`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-sky-900 mb-3">{title}</h3>
      <p className="text-sky-700 leading-relaxed">{description}</p>
    </CardComponent>
  );
}
