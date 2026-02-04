import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

// Icon components as simple SVG elements
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function Home() {
  const features = [
    {
      icon: <PlusIcon className="w-8 h-8 text-[#6b6ef2]" />,
      title: "Quick Task Creation",
      description: "Add tasks in seconds with our intuitive interface. No complex forms or overwhelming options."
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-[#6b6ef2]" />,
      title: "Smart Prioritization",
      description: "Automatically organize tasks by deadline and importance. Never miss what matters most."
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-[#6b6ef2]" />,
      title: "Team Collaboration",
      description: "Share tasks and projects with your team without the complexity of enterprise tools."
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-[#6b6ef2]" />,
      title: "Productivity Insights",
      description: "Get meaningful analytics about your productivity patterns and task completion rates."
    }
  ]

  const steps = [
    {
      step: "01",
      title: "Create Your Tasks",
      description: "Simply add your tasks with titles, descriptions, and due dates. Our clean interface makes it effortless."
    },
    {
      step: "02",
      title: "Organize & Prioritize",
      description: "Let TaskFlow automatically prioritize your tasks or customize the order to match your workflow."
    },
    {
      step: "03",
      title: "Track & Complete",
      description: "Mark tasks as complete and watch your productivity soar with real-time progress tracking."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechStart",
      content: "TaskFlow transformed how our small team manages daily tasks. It's simple yet powerful enough for our needs.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Freelance Designer",
      company: "Independent",
      content: "Finally, a task tracker that doesn't overwhelm me with features I don't need. Perfect for staying focused.",
      rating: 5
    },
    {
      name: "Jennifer Park",
      role: "Operations Director",
      company: "GrowthCorp",
      content: "The team collaboration features are exactly what we needed - powerful but not complicated.",
      rating: 5
    }
  ]

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 50 tasks",
        "Basic task management",
        "Mobile app access",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Ideal for power users and small teams",
      features: [
        "Unlimited tasks",
        "Team collaboration",
        "Advanced analytics",
        "Priority support",
        "Custom categories",
        "Task templates"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per month",
      description: "For growing teams that need more",
      features: [
        "Everything in Pro",
        "Advanced team management",
        "Custom integrations",
        "Dedicated support",
        "Advanced reporting",
        "API access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6b6ef2] to-[#9333ea] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Simple Task Tracking
              <span className="block text-yellow-300">That Actually Works</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-100 sm:text-xl">
              Stop getting lost in complex project management tools. TaskFlow gives you exactly what you need to stay organized and productive - nothing more, nothing less.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#6b6ef2] transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#6b6ef2]"
              >
                Login
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-200">No credit card required • Free forever plan available</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features designed for simplicity and effectiveness
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6b6ef2]/10">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How TaskFlow Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get started in minutes with our intuitive workflow
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6b6ef2] text-2xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="mt-8 hidden lg:block">
                    <ArrowRightIcon className="mx-auto h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by thousands of users
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our users are saying about TaskFlow
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600">{testimonial.content}</p>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-2xl bg-white p-8 shadow-lg ${
                  tier.popular ? 'ring-2 ring-[#6b6ef2]' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#6b6ef2] px-4 py-2 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="ml-2 text-gray-600">/{tier.period}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{tier.description}</p>
                </div>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#6b6ef2]" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/signup"
                    className={`block w-full rounded-lg px-6 py-3 text-center font-semibold transition-all duration-200 ${
                      tier.popular
                        ? 'bg-[#6b6ef2] text-white hover:bg-[#5a5ed6]'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6b6ef2] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to simplify your task management?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join thousands of users who have transformed their productivity with TaskFlow
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#6b6ef2] transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
              >
                Start Your Free Trial Today
              </Link>
            </div>
            <p className="mt-4 text-sm text-indigo-200">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}