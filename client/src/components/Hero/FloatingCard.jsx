function FloatingCard({
  icon,
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`absolute z-20 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl px-5 py-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          {icon}
        </div>

        <div>
          <h4 className="font-bold text-gray-900">
            {title}
          </h4>

          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FloatingCard;