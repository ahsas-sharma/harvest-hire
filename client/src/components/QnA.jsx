import React from "react";

const QnA = () => {
  const questionsAndAnswers = [
    {
      question: "How long can I rent the equipment for?",
      answer:
        "You can rent the equipment for any duration ranging from one day to several weeks. Just select your preferred rental period during the booking process, and the pricing will adjust accordingly.",
    },
    {
      question: "Is delivery and pickup included in the rental cost?",
      answer:
        "Yes, delivery and pickup are included within a 50 km radius of our depot. For locations beyond this range, an additional transportation fee will be applied based on the distance.",
    },
    {
      question:
        "What happens if the equipment breaks down during the rental period?",
      answer:
        "If the equipment malfunctions, contact our support team immediately. We offer 24/7 technical assistance and will either guide you through troubleshooting or provide a replacement within 24 hours, depending on the situation.",
    },
    {
      question: "Do I need to clean the equipment before returning it?",
      answer:
        "Yes, the equipment should be returned in the same condition as it was received. A cleaning fee may be charged if the equipment is returned dirty or not properly maintained during the rental period.",
    },
    {
      question:
        "Can I extend the rental period if I need the equipment longer than expected?",
      answer:
        "Absolutely! If you need to extend the rental period, simply contact us at least 24 hours before your original return date, and we will adjust the rental terms and pricing accordingly, based on availability.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>
      <ul className="space-y-4">
        {questionsAndAnswers.map((qa, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">{qa.question}</h3>
            <p className="mt-2 text-gray-700">{qa.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QnA;
