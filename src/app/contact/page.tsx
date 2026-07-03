"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import PageHeader from "@/components/PageHeader";
import { businessInfo } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const subjects = ["Residential", "Commercial", "Architecture", "Turnkey", "Other"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="glass p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10">
      <div className="gold-bg w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-poppins mb-1">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-charcoal font-poppins font-medium hover:text-gold transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-charcoal font-poppins font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-80px" });

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s+\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg font-poppins text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300";
  const labelClass = "block text-sm font-poppins font-medium text-charcoal mb-2";
  const errorClass = "text-red-500 text-xs font-poppins mt-1";

  return (
    <main>
      <PageHeader
        title="Contact Us"
        subtitle="Let's Start a Conversation About Your Dream Space"
      />

      <SectionWrapper className="section-padding bg-offwhite">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                variants={itemVariants}
                className="font-playfair text-3xl md:text-4xl text-charcoal mb-2"
              >
                Send Us a Message
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-500 font-poppins mb-8"
              >
                We&apos;d love to hear from you. Drop us a message and we&apos;ll
                get back to you within 24 hours.
              </motion.p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
                >
                  <span className="text-green-600">
                    <CheckCircleIcon />
                  </span>
                  <p className="text-green-700 font-poppins text-sm">
                    Thank you! Your message has been sent successfully. We&apos;ll
                    get back to you shortly.
                  </p>
                </motion.div>
              )}

              <motion.form
                variants={containerVariants}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className={labelClass}>
                    Subject <span className="text-gold">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none bg-white cursor-pointer`}
                  >
                    <option value="">Select a service</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className={errorClass}>{errors.subject}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className={errorClass}>{errors.message}</p>
                  )}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={submitting}
                  className="gold-bg text-white font-poppins font-semibold px-8 py-3.5 rounded-lg w-full hover-luxury disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 text-base"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.form>
            </motion.div>

            <div ref={infoRef}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="font-playfair text-3xl md:text-4xl text-charcoal mb-2">
                  Get in Touch
                </h2>
                <p className="text-gray-500 font-poppins mb-8">
                  We&apos;re here to bring your vision to life
                </p>

                <div className="space-y-4 mb-8">
                  <InfoCard
                    icon={<PhoneIcon />}
                    label="Phone"
                    value={businessInfo.phone}
                    href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}
                  />
                  <InfoCard
                    icon={<MailIcon />}
                    label="Email"
                    value={businessInfo.email}
                    href={`mailto:${businessInfo.email}`}
                  />
                  <InfoCard
                    icon={<MapPinIcon />}
                    label="Address"
                    value={businessInfo.address.full}
                  />
                  <InfoCard
                    icon={<ClockIcon />}
                    label="Business Hours"
                    value="Mon - Sat: 9:00 AM - 7:00 PM"
                  />
                </div>

                <div className="glass p-6 rounded-xl">
                  <h3 className="font-playfair text-xl text-charcoal mb-4">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href={businessInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href={businessInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href={businessInfo.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <section className="w-full">
        <iframe
          src={businessInfo.mapSrc}
          width="100%"
          height="450"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Centurio Design Studio Location"
        />
      </section>
    </main>
  );
}
