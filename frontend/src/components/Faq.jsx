import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'What is this platform?',
      answer:
        'This platform allows users to create, manage, and donate to various fundraising campaigns.',
    },
    {
      question: 'How can I create a campaign?',
      answer:
        'You can create a campaign by signing up or logging in, and then accessing the campaign creation form from the dashboard.',
    },
    {
      question: 'How do I donate to a campaign?',
      answer:
        'Simply click on a campaign, enter your desired donation amount, and proceed with the payment.',
    },
    {
      question: 'Is my donation secure?',
      answer:
        'Yes, we use secure payment gateways to ensure your donation information is safely processed.',
    },
    {
      question: 'Can I track the progress of my donations?',
      answer:
        'Yes, you can track the progress of your donation and view how the funds are being used through the campaign page.',
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>

        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full px-4 py-2 text-lg font-semibold text-left text-gray-800 border border-gray-300 rounded-md focus:outline-none hover:bg-gray-100"
            >
              {faq.question}
            </button>

            {activeIndex === index && (
              <div className="p-4 mt-2 text-gray-600 border-l-4 border-blue-500">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
