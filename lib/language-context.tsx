"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    // Navbar
    "nav.services": "Services",
    "nav.products": "Products",
    "nav.portfolio": "Portfolio",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",
    
    // Hero
    "hero.badge": "Software Development Agency",
    "hero.title1": "We Build",
    "hero.title2": "Digital",
    "hero.title3": "Solutions",
    "hero.slogan": "Freeze Your Worries, Let Us Handle It",
    "hero.description": "From web and mobile apps to AI-powered systems and scalable cloud infrastructure — we transform your vision into reality.",
    "hero.cta1": "Start Your Project",
    "hero.cta2": "View Our Work",
    
    // Stats
    "stats.projects": "Projects Delivered",
    "stats.clients": "Happy Clients",
    "stats.experience": "Years Experience",
    "stats.support": "Support",
    
    // Services
    "services.badge": "What We Do",
    "services.title": "End-to-End Digital Services",
    "services.description": "From concept to deployment, we handle every aspect of your digital transformation journey.",
    "services.web.title": "Web Development",
    "services.web.description": "Custom web applications built with React, Next.js, and modern frameworks. Scalable, secure, and blazing fast.",
    "services.mobile.title": "Mobile Apps",
    "services.mobile.description": "Native and cross-platform mobile applications for iOS and Android that users love.",
    "services.uiux.title": "UI/UX Design",
    "services.uiux.description": "Human-centered design that converts. From wireframes to pixel-perfect interfaces.",
    "services.cloud.title": "Cloud & DevOps",
    "services.cloud.description": "AWS, Azure, GCP infrastructure with CI/CD pipelines. Scale without worry.",
    "services.ai.title": "AI & Machine Learning",
    "services.ai.description": "Custom AI solutions, chatbots, and predictive analytics to automate your business.",
    "services.branding.title": "Branding & Identity",
    "services.branding.description": "Complete brand identity design including logos, guidelines, and visual systems that make you stand out.",
    
    // Products
    "products.badge": "Our Products",
    "products.title": "Ready-to-Deploy Solutions",
    "products.description": "Beyond custom development, we offer battle-tested SaaS products you can start using today.",
    "products.requestDemo": "Request Demo",
    "products.learnMore": "Learn More",
    "products.platform.badge": "Flagship Product",
    "products.platform.name": "ICE Platform",
    "products.platform.description": "Our all-in-one business management platform — ERP, CRM, HR, and analytics in one powerful dashboard. Built for modern enterprises.",
    "products.platform.feature1": "Real-time analytics dashboard",
    "products.platform.feature2": "Multi-tenant architecture",
    "products.platform.feature3": "API-first & integrations-ready",
    "products.platform.feature4": "Arabic & English support",
    "products.platform.version": "v3.0 — Enterprise Ready",
    "products.delivery.badge": "Mobile",
    "products.delivery.name": "ICE Delivery",
    "products.delivery.description": "A full-featured last-mile delivery management system with live tracking, driver app, and merchant portal.",
    "products.delivery.feature1": "Live GPS tracking",
    "products.delivery.feature2": "Driver & merchant apps",
    "products.delivery.feature3": "Automated dispatching",
    "products.assistant.badge": "AI Powered",
    "products.assistant.name": "ICE Assistant",
    "products.assistant.description": "An Arabic-first AI assistant for businesses — customer support automation, lead qualification, and smart scheduling.",
    "products.assistant.feature1": "Arabic NLP engine",
    "products.assistant.feature2": "Omnichannel support",
    "products.assistant.feature3": "CRM integration",
    
    // Portfolio
    "portfolio.badge": "Our Work",
    "portfolio.title": "Projects We're Proud Of",
    "portfolio.description": "A selection of projects that showcase our expertise and commitment to excellence.",
    "portfolio.viewProject": "View Project",
    "portfolio.pharmacy": "ICE Pharmacy",
    "portfolio.pharmacy.description": "Complete pharmacy management system with inventory, prescriptions, and delivery integration.",
    "portfolio.cafe": "ICE Cafe",
    "portfolio.cafe.description": "Modern coffee shop app with ordering, loyalty programs, and location-based services.",
    "portfolio.health": "ICE Health",
    "portfolio.health.description": "Telemedicine platform connecting patients with doctors for virtual consultations.",
    "portfolio.finance": "ICE Finance",
    "portfolio.finance.description": "Fintech solution for personal finance management and investment tracking.",
    "portfolio.academy": "ICE Academy",
    "portfolio.academy.description": "E-learning platform with video courses, quizzes, and certification system.",
    "portfolio.logistics": "ICE Logistics",
    "portfolio.logistics.description": "Fleet management and logistics optimization platform for enterprises.",
    
    // Process
    "process.badge": "How We Work",
    "process.title": "Our Development Process",
    "process.description": "A proven methodology that ensures project success from day one.",
    "process.step1.title": "Discovery",
    "process.step1.description": "We dive deep into your business goals, target audience, and technical requirements.",
    "process.step2.title": "Design",
    "process.step2.description": "Creating intuitive user experiences and stunning visual designs.",
    "process.step3.title": "Development",
    "process.step3.description": "Building robust, scalable solutions using cutting-edge technologies.",
    "process.step4.title": "Launch & Support",
    "process.step4.description": "Seamless deployment with ongoing maintenance and support.",
    
    // Tech Stack
    "tech.badge": "Technologies",
    "tech.title": "Our Tech Stack",
    "tech.description": "We use the latest and most reliable technologies to build your solutions.",
    
    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "What Our Clients Say",
    "testimonials.description": "Don't just take our word for it — hear from our satisfied clients.",
    
    // Contact
    "contact.badge": "Get In Touch",
    "contact.title": "Ready to Start Your Project?",
    "contact.description": "Let's discuss how we can help transform your business with technology.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.company": "Company Name",
    "contact.form.budget": "Project Budget",
    "contact.form.budgetPlaceholder": "Select budget range",
    "contact.form.budget1": "Less than $5,000",
    "contact.form.budget2": "$5,000 - $15,000",
    "contact.form.budget3": "$15,000 - $50,000",
    "contact.form.budget4": "$50,000+",
    "contact.form.message": "Project Details",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.submit": "Send Message",
    "contact.form.submitting": "Sending...",
    "contact.info.title": "Contact Information",
    "contact.info.description": "Prefer to reach out directly? Here's how you can contact us.",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    "contact.info.location": "Location",
    "contact.info.hours": "Working Hours",
    "contact.info.hoursValue": "Sun - Thu: 9AM - 6PM",
    
    // Footer
    "footer.description": "Transforming businesses through innovative software solutions. Let's build something amazing together.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.blog": "Blog",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved.",
    "footer.slogan": "Freeze Your Worries, Let Us Handle It",
  },
  ar: {
    // Navbar
    "nav.services": "الخدمات",
    "nav.products": "المنتجات",
    "nav.portfolio": "أعمالنا",
    "nav.process": "منهجيتنا",
    "nav.contact": "تواصل معنا",
    "nav.getStarted": "ابدأ الآن",
    
    // Hero
    "hero.badge": "وكالة تطوير برمجيات",
    "hero.title1": "نبني",
    "hero.title2": "حلول",
    "hero.title3": "رقمية",
    "hero.slogan": "جمّد همومك، واترك الأمر لنا",
    "hero.description": "من تطبيقات الويب والموبايل إلى أنظمة الذكاء الاصطناعي والبنية التحتية السحابية القابلة للتوسع — نحول رؤيتك إلى واقع.",
    "hero.cta1": "ابدأ مشروعك",
    "hero.cta2": "شاهد أعمالنا",
    
    // Stats
    "stats.projects": "مشروع منجز",
    "stats.clients": "عميل سعيد",
    "stats.experience": "سنوات خبرة",
    "stats.support": "دعم متواصل",
    
    // Services
    "services.badge": "ماذا نقدم",
    "services.title": "خدمات رقمية شاملة",
    "services.description": "من الفكرة إلى الإطلاق، نتولى كل جانب من رحلة التحول الرقمي الخاصة بك.",
    "services.web.title": "تطوير الويب",
    "services.web.description": "تطبيقات ويب مخصصة مبنية بـ React و Next.js وأحدث الأطر. قابلة للتوسع وآمنة وسريعة للغاية.",
    "services.mobile.title": "تطبيقات الموبايل",
    "services.mobile.description": "تطبيقات موبايل أصلية ومتعددة المنصات لـ iOS و Android يحبها المستخدمون.",
    "services.uiux.title": "تصميم UI/UX",
    "services.uiux.description": "تصميم يركز على المستخدم ويحقق النتائج. من الـ Wireframes إلى واجهات مثالية البكسل.",
    "services.cloud.title": "السحابة و DevOps",
    "services.cloud.description": "بنية تحتية AWS و Azure و GCP مع خطوط CI/CD. توسع بدون قلق.",
    "services.ai.title": "الذكاء الاصطناعي",
    "services.ai.description": "حلول ذكاء اصطناعي مخصصة وروبوتات دردشة وتحليلات تنبؤية لأتمتة عملك.",
    "services.branding.title": "الهوية البصرية",
    "services.branding.description": "تصميم هوية بصرية كاملة تشمل الشعارات والدلائل الإرشادية والأنظمة البصرية التي تميزك.",
    
    // Products
    "products.badge": "منتجاتنا",
    "products.title": "حلول جاهزة للاستخدام",
    "products.description": "بالإضافة للتطوير المخصص، نقدم منتجات SaaS مجربة يمكنك البدء باستخدامها اليوم.",
    "products.requestDemo": "اطلب عرض توضيحي",
    "products.learnMore": "اعرف المزيد",
    "products.platform.badge": "المنتج الرئيسي",
    "products.platform.name": "ICE Platform",
    "products.platform.description": "منصتنا الشاملة لإدارة الأعمال — ERP و CRM و HR والتحليلات في لوحة تحكم واحدة قوية. مصممة للمؤسسات الحديثة.",
    "products.platform.feature1": "لوحة تحليلات في الوقت الحقيقي",
    "products.platform.feature2": "بنية متعددة المستأجرين",
    "products.platform.feature3": "API-first وجاهزة للتكامل",
    "products.platform.feature4": "دعم العربية والإنجليزية",
    "products.platform.version": "v3.0 — جاهز للمؤسسات",
    "products.delivery.badge": "موبايل",
    "products.delivery.name": "ICE Delivery",
    "products.delivery.description": "نظام إدارة توصيل متكامل مع تتبع مباشر وتطبيق للسائقين وبوابة للتجار.",
    "products.delivery.feature1": "تتبع GPS مباشر",
    "products.delivery.feature2": "تطبيقات للسائقين والتجار",
    "products.delivery.feature3": "توزيع آلي",
    "products.assistant.badge": "مدعوم بالذكاء الاصطناعي",
    "products.assistant.name": "ICE Assistant",
    "products.assistant.description": "مساعد ذكاء اصطناعي بالعربية للأعمال — أتمتة دعم العملاء وتأهيل العملاء المحتملين والجدولة الذكية.",
    "products.assistant.feature1": "محرك NLP عربي",
    "products.assistant.feature2": "دعم متعدد القنوات",
    "products.assistant.feature3": "تكامل مع CRM",
    
    // Portfolio
    "portfolio.badge": "أعمالنا",
    "portfolio.title": "مشاريع نفتخر بها",
    "portfolio.description": "مجموعة مختارة من المشاريع التي تُظهر خبرتنا والتزامنا بالتميز.",
    "portfolio.viewProject": "عرض المشروع",
    "portfolio.pharmacy": "ICE Pharmacy",
    "portfolio.pharmacy.description": "نظام إدارة صيدليات متكامل مع المخزون والوصفات الطبية وتكامل التوصيل.",
    "portfolio.cafe": "ICE Cafe",
    "portfolio.cafe.description": "تطبيق مقهى عصري مع الطلب وبرامج الولاء والخدمات المعتمدة على الموقع.",
    "portfolio.health": "ICE Health",
    "portfolio.health.description": "منصة طب عن بعد تربط المرضى بالأطباء للاستشارات الافتراضية.",
    "portfolio.finance": "ICE Finance",
    "portfolio.finance.description": "حل تقني مالي لإدارة الأموال الشخصية وتتبع الاستثمارات.",
    "portfolio.academy": "ICE Academy",
    "portfolio.academy.description": "منصة تعليم إلكتروني مع دورات فيديو واختبارات ونظام شهادات.",
    "portfolio.logistics": "ICE Logistics",
    "portfolio.logistics.description": "منصة إدارة الأساطيل وتحسين اللوجستيات للمؤسسات.",
    
    // Process
    "process.badge": "كيف نعمل",
    "process.title": "منهجية التطوير لدينا",
    "process.description": "منهجية مثبتة تضمن نجاح المشروع من اليوم الأول.",
    "process.step1.title": "الاكتشاف",
    "process.step1.description": "نغوص عميقاً في أهداف عملك والجمهور المستهدف والمتطلبات التقنية.",
    "process.step2.title": "التصميم",
    "process.step2.description": "إنشاء تجارب مستخدم بديهية وتصاميم بصرية مذهلة.",
    "process.step3.title": "التطوير",
    "process.step3.description": "بناء حلول قوية وقابلة للتوسع باستخدام أحدث التقنيات.",
    "process.step4.title": "الإطلاق والدعم",
    "process.step4.description": "نشر سلس مع صيانة ودعم مستمر.",
    
    // Tech Stack
    "tech.badge": "التقنيات",
    "tech.title": "مجموعة تقنياتنا",
    "tech.description": "نستخدم أحدث وأكثر التقنيات موثوقية لبناء حلولك.",
    
    // Testimonials
    "testimonials.badge": "آراء العملاء",
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.description": "لا تأخذ كلامنا فقط — اسمع من عملائنا الراضين.",
    
    // Contact
    "contact.badge": "تواصل معنا",
    "contact.title": "مستعد لبدء مشروعك؟",
    "contact.description": "دعنا نناقش كيف يمكننا المساعدة في تحويل عملك بالتكنولوجيا.",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.company": "اسم الشركة",
    "contact.form.budget": "ميزانية المشروع",
    "contact.form.budgetPlaceholder": "اختر نطاق الميزانية",
    "contact.form.budget1": "أقل من 5,000$",
    "contact.form.budget2": "5,000$ - 15,000$",
    "contact.form.budget3": "15,000$ - 50,000$",
    "contact.form.budget4": "50,000$+",
    "contact.form.message": "تفاصيل المشروع",
    "contact.form.messagePlaceholder": "أخبرنا عن مشروعك...",
    "contact.form.submit": "أرسل الرسالة",
    "contact.form.submitting": "جاري الإرسال...",
    "contact.info.title": "معلومات الاتصال",
    "contact.info.description": "تفضل التواصل مباشرة؟ إليك كيف يمكنك الاتصال بنا.",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.phone": "الهاتف",
    "contact.info.location": "الموقع",
    "contact.info.hours": "ساعات العمل",
    "contact.info.hoursValue": "الأحد - الخميس: 9ص - 6م",
    
    // Footer
    "footer.description": "نحول الأعمال من خلال حلول برمجية مبتكرة. دعنا نبني شيئاً مذهلاً معاً.",
    "footer.services": "الخدمات",
    "footer.company": "الشركة",
    "footer.about": "من نحن",
    "footer.careers": "الوظائف",
    "footer.blog": "المدونة",
    "footer.legal": "قانوني",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.slogan": "جمّد همومك، واترك الأمر لنا",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
