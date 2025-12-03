import { useState } from 'react';
import SEO from '../components/SEO';

// =====================================================
// WEB3FORMS SETUP (Free & No Email Verification Required)
// =====================================================
// 1. Go to https://web3forms.com
// 2. Enter Marie's email: heirloomandcophotos@gmail.com
// 3. Click "Create Access Key" - they'll email the key
// 4. Replace the access_key below with the one from email
// =====================================================

const WEB3FORMS_ACCESS_KEY = 'e0b06e84-c8ae-4b82-b9fa-7420b6c9e2e8'; // Replace with key from web3forms.com

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    date: '',
    location: '',
    message: '',
    howFound: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Prepare form data for Web3Forms
      const submitData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Inquiry from ${formData.name} - ${formData.sessionType}`,
        from_name: 'Heirloom & Co. Website',
        // Form fields
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone || 'Not provided',
        'Session Type': formData.sessionType,
        'Preferred Date': formData.date || 'Not specified',
        'Location/Venue': formData.location || 'Not specified',
        Message: formData.message,
        'How They Found You': formData.howFound || 'Not specified',
        // Reply-to so Marie can reply directly
        replyto: formData.email,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          sessionType: '',
          date: '',
          location: '',
          message: '',
          howFound: ''
        });
      } else {
        console.error('Form submission failed:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Success state
  if (status === 'success') {
    return (
      <>
        <SEO title="Contact" url="/contact" />
        <main className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center">
          <div className="max-w-md text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl text-charcoal mb-4 font-serif">Message Sent!</h2>
            <p className="text-stone-600 font-sans mb-8">
              Thank you for reaching out! I'll get back to you within 24-48 hours.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="btn-secondary"
            >
              Send Another Message
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Contact"
        description="Book your photography session with Heirloom & Co. Photography. Wedding, engagement, and family photography in Cullman, Huntsville, and North Alabama."
        url="/contact"
        keywords="book wedding photographer Alabama, Cullman photographer contact, North Alabama photography inquiry"
      />
      
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                Contact
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-charcoal font-serif font-light mb-4">
                Let's Create Together
              </h1>
              <p className="text-stone-600 max-w-xl mx-auto text-lg font-serif">
                I'd love to hear about your vision! Fill out the form below and I'll be in touch within 24-48 hours.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-elegant"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-elegant"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-elegant"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Session Type *
                    </label>
                    <select
                      name="sessionType"
                      required
                      value={formData.sessionType}
                      onChange={handleChange}
                      className="input-elegant"
                    >
                      <option value="">Select a session type</option>
                      <option value="Full Wedding Day">Full Wedding Day</option>
                      <option value="Half Wedding Day">Half Wedding Day</option>
                      <option value="Elopement">Elopement</option>
                      <option value="Engagement/Couples">Engagement/Couples</option>
                      <option value="Family Session">Family Session</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Newborn">Newborn</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="input-elegant"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                      Location/Venue
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-elegant"
                      placeholder="City, venue, or undecided"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                    Tell me about your session *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input-elegant resize-none"
                    placeholder="Share your vision, ask questions, or tell me what makes your love story unique..."
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-stone-500 mb-2 font-sans">
                    How did you find me?
                  </label>
                  <select
                    name="howFound"
                    value={formData.howFound}
                    onChange={handleChange}
                    className="input-elegant"
                  >
                    <option value="">Select an option</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Friend/Family Referral">Friend/Family Referral</option>
                    <option value="WeddingWire">WeddingWire</option>
                    <option value="The Knot">The Knot</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans">
                    Something went wrong. Please try again or email me directly at{' '}
                    <a href="mailto:heirloomandcophotos@gmail.com" className="underline">
                      heirloomandcophotos@gmail.com
                    </a>
                  </div>
                )}

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <div className="spinner w-4 h-4 mr-2 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Direct Contact */}
            <div className="mt-12 text-center">
              <p className="text-stone-500 mb-4 font-sans text-sm">
                Prefer to reach out directly?
              </p>
              <a 
                href="mailto:heirloomandcophotos@gmail.com"
                className="text-charcoal hover:text-stone-600 transition-colors text-lg font-serif underline"
              >
                heirloomandcophotos@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}