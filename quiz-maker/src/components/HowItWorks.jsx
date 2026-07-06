const steps = [
  { number: "1", title: "Pick a Category", description: "Choose a topic that interests you from a range of quiz categories." },
  { number: "2", title: "Take the Quiz", description: "Answer questions within the time limit and track your progress." },
  { number: "3", title: "Get Instant Results", description: "See your score immediately, along with a breakdown of your answers." },
];

function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
        How It Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold mx-auto mb-4">
              {step.number}
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;