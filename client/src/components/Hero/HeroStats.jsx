function HeroStats() {
  const stats = [
    {
      number: "20K+",
      label: "Happy Customers",
    },
    {
      number: "500+",
      label: "Daily Orders",
    },
    {
      number: "4.9★",
      label: "Customer Rating",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap gap-10">
      {stats.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold text-gray-900">
            {item.number}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;