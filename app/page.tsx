import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

// Create custom icon components to replace heroicons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function LandingPage() {
  const features = [
    {
      title: 'Smart Organization',
      description: 'Organize tasks with intuitive categories, priorities, and due dates without the complexity.',
      icon: '📋'
    },
    {
      title: 'Team Collaboration',
      description: 'Share projects with your team and track progress together in real-time.',
      icon: '👥'
    },
    {
      title: 'Progress Tracking',
      description: 'Visualize your productivity with clean dashboards and completion insights.',
      icon: '📊'
    },
    {
      title: 'Zero Learning Curve',
      description: 'Get started instantly with our intuitive interface designed for simplicity.',
      icon: '⚡'
    }
  ]

  const steps = [
    {
      step: '1',
      title: 'Create Your First Project',
      description: 'Set up a project and start adding tasks in seconds.'
    },
    {
      step: '2',
      title: 'Organize & Prioritize',
      description: 'Use categories and priorities to keep everything structured.'
    },
    {
      step: '3',
      title: 'Track & Complete',
      description: 'Monitor progress and celebrate completed goals.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      content: 'TaskFlow completely transformed how I manage client projects. No more scattered sticky notes!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Startup Founder',
      content: 'Finally, a task manager that my whole team actually uses. Simple yet powerful.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Thompson',
      role: 'Marketing Manager',
      content: 'The perfect balance of features without the overwhelm. Increased our team productivity by 40%.',
      avatar: '👩‍🚀'
    }
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 3 projects',
        'Unlimited tasks',
        'Basic categories',
        'Mobile app access'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For productive individuals and small teams',
      features: [
        'Unlimited projects',
        'Team collaboration',
        'Priority levels',
        'Progress analytics',
        'File attachments',
        'Email notifications'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29',
      period: 'per month',
      description: 'For growing teams that need advanced features',
      features: [
        'Everything in Pro',
        'Advanced reporting',
        'Custom integrations',
        'Priority support',
        'Admin controls',
        'SSO authentication'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simple Task Tracking
              <span className="block text-indigo-600">Without the Overwhelm</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              TaskFlow helps individuals and small teams achieve their goals through intuitive task management 
              that eliminates complexity and maximizes productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Started Free
              </Link>
              <Link 
                href="/login" 
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Login
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever plan</p>
          </div>
          
          {/* Hero Image/Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold mb-4">Your TaskFlow Dashboard</h3>
                  <p className="text-indigo-100">Clean, intuitive, and powerful task management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've carefully crafted features that help you stay organized without the complexity of enterprise tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No lengthy tutorials or complex setups. Start managing your tasks effectively in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Productive People
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 from 2,000+ users</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, no complicated tiers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-8 shadow-sm border-2 transition-shadow hover:shadow-lg ${
                  plan.popular ? 'border-indigo-600 relative' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup"
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of individuals and teams who've simplified their task management with TaskFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/demo"
              className="border-2 border-white text-white hover:bg-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Watch Demo
            </Link>
          </div>
          <p className="text-sm text-indigo-200 mt-4">Free forever plan • No credit card required</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}