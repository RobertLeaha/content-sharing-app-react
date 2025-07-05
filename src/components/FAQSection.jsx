export default function FAQSection({ items, title = "Întrebări frecvente" }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-sky-900 text-center mb-12">
        {title}
      </h2>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-sky-200 pb-6 last:border-b-0 last:pb-0"
            >
              <h3 className="text-lg font-semibold text-sky-900 mb-3">
                {item.question}
              </h3>
              <p className="text-sky-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
