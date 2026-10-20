export const plans = {
  weekly: { id: 'weekly', name: 'Weekly Follow-Up', duration: '1 month', price: 2500, description: 'Personalized training and nutrition with weekly check-ins.', features: ['Custom training and nutrition plan', 'Weekly progress check-ins', 'WhatsApp support'] },
  daily: { id: 'daily', name: 'Daily Follow-Up', duration: '3 months', price: 3600, description: 'Personalized coaching with daily check-ins and priority support.', features: ['Custom training and nutrition plan', 'Daily progress check-ins', 'Priority WhatsApp support', 'Meal plan adjustments'] },
} as const;

export const testimonials = [
  { quote: 'الحمد لله النظام بتاع حضرتك عامل معايا فرق كبير في جسمي والأوزان بتاعتي بتطور بسرعه', name: 'Omar E.', result: 'Lost 15 kg in 12 weeks' },
  { quote: 'انا مبسوط جدا اول مره احس بالصدر العالي عندي واول مره العب صدر محسش ب كتافي', name: 'Mostafa G.', result: 'Gained lean muscle in 8 weeks' },
  { quote: 'The progressive overload program was a game changer. I started feeling every exercise in the right muscle and saw growth within weeks.', name: 'Karim N.', result: 'Body recomposition in 3 months' },
  { quote: 'والله مهما اقول مش هقولك بس كل شويه هيبان اكتر ده من اسبوع واحد الفرق ابتدى يبان', name: 'Ahmed S.', result: 'Full body transformation' },
  { quote: "The weekly check-ins kept me accountable. I never felt alone in the process. Now I'm in the best shape of my life.", name: 'Youssef K.', result: 'Lost 20 kg in 16 weeks' },
];

export const steps = [
  ['01', 'Free consultation', 'We discuss your goals, lifestyle, and current fitness level to understand where you are and what you want to achieve.'],
  ['02', 'Custom plan', 'You receive a personalized training and nutrition plan built specifically around your goals and circumstances.'],
  ['03', 'Weekly check-ins', 'We review your progress, adjust your plan, and help you stay accountable.'],
  ['04', 'Real results', 'Build stronger habits, improve performance, and work toward results that last.'],
];
