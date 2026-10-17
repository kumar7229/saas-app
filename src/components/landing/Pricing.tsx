import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Free Freemium',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started and building daily practice habits.',
      features: [
        '5 AI Practice Sessions / day',
        'Web Speech API Transcription',
        'Grammar & Vocabulary Analysis',
        'Fluency Score out of 10',
        'Basic Progress Dashboard',
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
    },
    {
      name: 'Pro Speaker',
      price: '$12',
      period: 'per month',
      description: 'For serious learners aiming for rapid fluency and exam prep.',
      features: [
        'Unlimited AI Practice Sessions',
        'Advanced Gemini 1.5 Analysis',
        'Detailed Pronunciation Guide',
        'Full Session History & PDF Export',
        'Custom AI Topic Generator',
        'Daily Streak & Leaderboards',
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary' as const,
    },
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 mb-3">
            Flexible Freemium Model
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Simple, Transparent Pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col justify-between p-8 ${
                plan.popular ? 'border-2 border-indigo-500 glow-shadow dark:bg-slate-900/90' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-glow text-white text-xs font-bold tracking-wider uppercase shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feat, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link href="/practice">
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
