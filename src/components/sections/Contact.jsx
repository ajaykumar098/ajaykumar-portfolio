import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuMessageCircle, LuInstagram, LuLinkedin, LuMail, LuGithub, LuPhone, LuSend } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { label: "WhatsApp", href: portfolioData.whatsapp, Icon: LuMessageCircle, aria: "Contact via WhatsApp" },
  { label: "Instagram", href: portfolioData.instagram, Icon: LuInstagram, aria: "Visit Instagram profile" },
  { label: "LinkedIn", href: portfolioData.linkedin, Icon: LuLinkedin, aria: "Visit LinkedIn profile" },
  { label: "Email", href: `https://mail.google.com/mail/?view=cm&to=${portfolioData.email}`, Icon: LuMail, aria: "Send email" },
  { label: "GitHub", href: portfolioData.github, Icon: LuGithub, aria: "Visit GitHub profile" },
  { label: "Phone", href: `tel:${portfolioData.phone.replace(/\s/g, "")}`, Icon: LuPhone, aria: "Call phone number" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onRefresh: (self) => {
              if (self.progress > 0 || self.scroll() > self.start) {
                gsap.set(cardRef.current, { opacity: 1, y: 0 });
              }
            },
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-shell scan-texture">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-subtitle">Contact</p>
          <h2 className="section-title">Let's Connect</h2>
        </div>
        <PlayButton narration={narrations.contact} />
      </div>

      <div className="relative max-w-3xl mx-auto w-full">
        <div ref={cardRef} className="p-8 md:p-12 rounded-2xl panel">
          <p className="text-center mb-8 opacity-80">
            Open to internships and full-time roles. Reach out — I'd love to hear from you!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {contactLinks.map(({ label, href, Icon, aria }) => (
              <a
                key={label}
                href={href}
                target={label === "Phone" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={aria}
                className="flex flex-col items-center gap-2 p-4 rounded-xl panel-stroke hover:bg-accent/10 hover:-translate-y-0.5 transition-all group"
              >
                <Icon size={24} className="text-accent dark:text-accent-light group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{label}</span>
                {label === "Email" && (
                  <span className="text-xs opacity-60 text-center break-all">{portfolioData.email}</span>
                )}
                {label === "Phone" && <span className="text-xs opacity-60">{portfolioData.phone}</span>}
              </a>
            ))}
          </div>

          <form
            action="https://formspree.io/f/mdarzkyy"
            method="POST"
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            {formStatus === 'success' && (
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-center">
                Message sent successfully!
              </div>
            )}
            {formStatus === 'error' && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-center">
                Something went wrong. Please try again.
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg panel-stroke bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full px-4 py-3 rounded-lg panel-stroke bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg panel-stroke bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <button type="submit" className="btn-primary w-full md:w-auto">
              <LuSend size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
