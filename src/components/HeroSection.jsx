export default function HeroSection({
  title,
  subtitle,
  description = null,
  primaryButton = null,
  secondaryButton = null,
  bgGradient = "from-sky-600 to-blue-600",
}) {
  return (
    <div className={`bg-gradient-to-r ${bgGradient} text-white py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        {subtitle && (
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-8">
            {description}
          </p>
        )}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton}
            {secondaryButton}
          </div>
        )}
      </div>
    </div>
  );
}
