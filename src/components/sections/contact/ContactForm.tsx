import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isHuman: false,
    mentionedToby: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Check if user mentioned Toby
      if (name === 'message' && value.toLowerCase().includes('toby')) {
        setFormData((prev) => ({
          ...prev,
          mentionedToby: true,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // For demo purposes - replace with actual form handling
      // Options: Formspree, Netlify Forms, or your own backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          isHuman: false,
          mentionedToby: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Form Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-black mb-4">
            📨 Send a Message
          </h2>
          <p className="font-body text-text-muted">
            Fill out the form below and I'll get back to you soon!
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Your awesome name"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="form-textarea"
              placeholder="Tell me about your project, ask a question, or just say hi! 

💡 Pro tip: Mention my cat Toby for faster replies 🐾"
            />

            {/* Toby Easter Egg */}
            {formData.mentionedToby && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center">
                  🐾{' '}
                  <span className="ml-2">
                    Toby approves! You just unlocked 2x faster reply speed.
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Human Checkbox */}
          <div className="form-group">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isHuman"
                checked={formData.isHuman}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="font-body text-text-secondary">
                I'm a real person, not a bot writing "Hi dear, nice portfolio."
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              disabled={isSubmitting || !formData.isHuman}
              className={`contact-submit-btn ${
                !formData.isHuman ? 'disabled' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                <>
                  📬 Send Message
                  {formData.mentionedToby && <span className="ml-2">🚀</span>}
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="success-message">
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-display font-bold text-green-800 mb-1">
                Message sent successfully!
              </p>
              <p className="font-body text-sm text-green-600">
                {formData.mentionedToby
                  ? "Thanks for mentioning Toby! I'll reply extra fast 🐾"
                  : "I'll get back to you within a day!"}
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              <div className="text-2xl mb-2">😅</div>
              <p className="font-display font-bold text-red-800 mb-1">
                Oops! Something went wrong.
              </p>
              <p className="font-body text-sm text-red-600">
                Please try again or reach me directly via email below.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
