import React, { useState, useEffect, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  BookOpen, 
  Code, 
  User, 
  Moon, 
  Sun, 
  ExternalLink, 
  Download, 
  Search, 
  Filter, 
  Quote, 
  Check,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  ArrowRight
} from 'lucide-react';

/**
 * ==============================================================================
 * CONFIGURATION & DATA (The Single Source of Truth)
 * ==============================================================================
 */
const profile = {
  personal: {
    name: "Mahbub Hasan Shamim",
    role: "Researcher & Full-Stack Developer",
    tagline: "Bridging Medical Imaging, Computer Vision, and NLP with Deep Learning.",
    location: "Dhaka, Bangladesh",
    email: "shamim.mahbub.hasan@gmail.com",
    phone: "+880-1515-635955",
    website: "https://shamim17.ml",
    linkedin: "https://www.linkedin.com/in/mahbub-hasan-shamim-2747751a7",
    github: "", 
    scholar: "https://scholar.google.com/citations?user=m-SviBAAAAAJ&hl=en",
    scholarUserId: "m-SviBAAAAAJ",
    highlights: [
      "Heliyon (Elsevier) Author",
      "Springer Nature (LNNS) Contributor",
      "Medical Imaging & NLP Focus"
    ]
  },
  assets: {
    cvPdfUrl: "", // Leave empty to route "Download CV" to the CV tab
    avatarUrl: `${import.meta.env.BASE_URL}avatar.jpg`
  },
  integrations: {
    metricsEndpoint: "" 
  },
  research: {
    interests: [
      "Computer Vision", "Medical Imaging", "Deep Learning", "NLP", 
      "Transfer Learning", "Segmentation", "Explainable AI"
    ],
    tools: [
      "Python", "PyTorch", "TensorFlow", "Keras", "YOLOv5/v7", 
      "OpenCV", "Scikit-learn", "Pandas", "NumPy"
    ],
    metrics: {
      citations: 23,
      hIndex: 2,
      i10Index: 1
    }
  },
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "East West University",
      location: "Dhaka",
      period: "May 2017 - Jan 2023",
      // score field removed to ensure CGPA is never shown
      details: "Applied ML/DL experience in medical imaging and NLP."
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      institution: "Dhaka Imperial College",
      period: "2013 - 2015"
    }
  ],
  experience: [
    {
      role: "Software Support Engineer",
      org: "N.R. Groups of Companies",
      period: "Sep 2023 - Present",
      description: "Providing end-user support, troubleshooting software defects, and coordinating fixes for improved system reliability."
    },
    {
      role: "Research Assistant",
      org: "East West University",
      period: "May 2023 - Aug 2023",
      description: "Supported senior researchers with data collection, analysis, and manuscript preparation for publication."
    },
    {
      role: "AI Trainee",
      org: "AND Diginet",
      period: "May 2023 - Aug 2023",
      description: "Explored AI/ML models through applied projects and supported model implementation."
    }
  ],
  projects: [
    {
      title: "Healthcare Chatbot",
      description: "A bilingual (Bangla & English) chatbot using TF-IDF and Linear SVC for disease prediction based on symptoms.",
      tags: ["NLP", "TF-IDF", "Linear SVC"],
      link: "#"
    },
    {
      title: "Emotion Detection from Video",
      description: "Video frame analysis for emotion recognition using feature extraction and fusion techniques.",
      tags: ["Computer Vision", "Video Analysis", "Fusion"],
      link: "#"
    },
    {
      title: "Real-time Fabric Fault Detection",
      description: "Automated fault detection pipeline using YOLOv5/v7 and Transformer-based approaches with extensive data augmentation.",
      tags: ["YOLO", "Transformers", "Industrial Automation"],
      link: "#"
    },
    {
      title: "Microcontroller Car Parking System",
      description: "Smart parking solution using Arduino Uno, IR sensors, and gas detectors.",
      tags: ["IoT", "Arduino", "Embedded Systems"],
      link: "#"
    }
  ],
  publications: [
    {
      id: "submitted-hippocampus",
      title: "Hippocampus Segmentation Using Deep Learning Techniques",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Neural Computing and Applications",
      year: 2025,
      type: "Under Review", 
      doi: "", 
      tags: ["Segmentation", "Brain MRI", "Medical Imaging"],
      contribution: "Developed a modified U-Net architecture.",
      keyResult: "Improved Dice coefficient on standard MRI datasets."
    },
    {
      id: "heliyon-2023",
      title: "Sickle cell disease classification using deep learning",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Heliyon (Elsevier)",
      year: 2023,
      type: "Journal",
      doi: "10.1016/j.heliyon.2023.e22203",
      tags: ["Medical Imaging", "Deep Learning", "Classification"],
      contribution: "Designed the CNN architecture and handled data preprocessing.",
      keyResult: "Achieved high accuracy in distinguishing sickle cells from healthy cells."
    },
    {
      id: "springer-2025",
      title: "Malaria Cell Detection Using Deep Learning Architectures",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Springer LNNS",
      year: 2025,
      type: "Conference",
      doi: "10.1007/978-3-031-73324-6_4",
      tags: ["Object Detection", "Malaria", "Medical AI"],
      contribution: "Implemented detection models and comparative analysis.",
      keyResult: "Robust detection performance on microscopic blood smear images."
    },
    {
      id: "springer-2024-solar",
      title: "Development of a Nano-Coating-Based Solution for Surface Dirt Removal on Solar Panels Using Deep Learning",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Springer LNNS",
      year: 2024,
      type: "Conference",
      doi: "10.1007/978-3-031-73321-5_1",
      tags: ["Sustainability", "Deep Learning", "Smart Systems"],
      contribution: "Developed the vision system for dirt quantification.",
      keyResult: "Automated cleaning trigger based on dirt density analysis."
    },
    {
      id: "springer-2024-water",
      title: "Machine Learning Model to Define Water Potability Considering Distinctive Chemical Contaminants",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Springer LNNS",
      year: 2024,
      type: "Conference",
      doi: "10.1007/978-3-031-73318-5_3",
      tags: ["Environmental AI", "Machine Learning", "Prediction"],
      contribution: "Feature engineering of chemical contaminants.",
      keyResult: "High precision in predicting potability from chemical metrics."
    },
    {
      id: "springer-2024-bio",
      title: "Detecting Biodegradable and Non-biodegradable Image Using CNN and Deep Learning",
      authors: ["Mahbub Hasan Shamim", "et al."],
      venue: "Springer LNNS",
      year: 2024,
      type: "Conference",
      doi: "10.1007/978-3-031-73318-5_4",
      tags: ["Classification", "Waste Management", "CNN"],
      contribution: "Built the classification pipeline.",
      keyResult: "Efficient sorting of waste types via image analysis."
    }
  ]
};

/**
 * ==============================================================================
 * UTILITIES
 * ==============================================================================
 */

const isUnderReview = (pub) => {
  const t = (pub.type || '').toLowerCase();
  const v = (pub.venue || '').toLowerCase();
  const statusKeywords = ['review', 'submitted', 'submission'];
  return statusKeywords.some(keyword => t.includes(keyword) || v.includes(keyword));
};

const openSafe = (url) => {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * ==============================================================================
 * UI COMPONENTS
 * ==============================================================================
 */

const Button = ({ children, variant = "primary", size = "md", className = "", type = "button", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  const variants = {
    primary: "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
    link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
  };
  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 py-2 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10"
  };

  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
    outline: "text-slate-950 dark:text-slate-50 border-slate-200 border"
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * ==============================================================================
 * PAGE SECTIONS
 * ==============================================================================
 */

const Home = ({ setActiveTab, metrics }) => {
  const handleDownloadCV = () => {
    if (profile.assets.cvPdfUrl) {
      openSafe(profile.assets.cvPdfUrl);
    } else {
      setActiveTab('cv');
    }
  };

  const featuredPubs = useMemo(() => {
    return [...profile.publications]
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
      .slice(0, 3);
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-slate-200/50 dark:bg-slate-800/30 blur-3xl"></div>

        <div className="grid md:grid-cols-12 gap-8 relative z-10">
          <div className="md:col-span-8 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
               <div className="flex flex-wrap gap-2">
                {profile.personal.highlights.map((highlight, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm">
                    <Check className="mr-1 h-3 w-3 text-green-600 dark:text-green-400" /> {highlight}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {profile.personal.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {profile.personal.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setActiveTab('contact')}>
                Get in Touch
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setActiveTab('publications')}>
                View Publications
              </Button>
              <Button variant="outline" size="lg" onClick={() => openSafe(profile.personal.scholar)}>
                Google Scholar <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-12">
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{metrics.citations}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Citations</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{profile.publications.length}+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Papers</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{profile.projects.length}+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Projects</div>
               </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center">
             <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-slate-200/50 shadow-xl dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-20 w-20 rounded-full flex-shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-700 dark:text-slate-300 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                     {profile.assets.avatarUrl ? (
                       <img src={profile.assets.avatarUrl} alt={profile.personal.name} className="h-full w-full object-cover" loading="lazy" />
                     ) : (
                       profile.personal.name.charAt(0)
                     )}
                   </div>
                   <div>
                      <div className="font-bold text-lg">{profile.personal.role}</div>
                      <div className="text-sm text-slate-500 flex items-center">
                         <MapPin className="h-3 w-3 mr-1" /> {profile.personal.location}
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                   <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = `mailto:${profile.personal.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> {profile.personal.email}
                   </Button>
                   <Button variant="outline" className="w-full justify-start" onClick={() => openSafe(profile.personal.linkedin)}>
                      <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile
                   </Button>
                   <Button variant="ghost" className="w-full justify-between group" onClick={handleDownloadCV}>
                      Download CV <Download className="h-4 w-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                   </Button>
                </div>
             </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
         <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Research Focus Areas</h2>
         <div className="flex flex-wrap gap-3">
            {profile.research.interests.map((interest, i) => (
               <div key={i} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  {interest}
               </div>
            ))}
         </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Publications</h2>
          <Button variant="ghost" className="group" onClick={() => setActiveTab('publications')}>
             View All Works <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPubs.map((pub) => {
            const isSubmitted = isUnderReview(pub);
            return (
              <Card key={pub.id} className="group relative flex flex-col p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-slate-50 dark:bg-slate-900">{pub.venue}</Badge>
                  <span className="text-sm font-mono text-slate-500">{pub.year}</span>
                </div>

                <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pub.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-grow">
                  {pub.keyResult}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                      {isSubmitted ? 'Under Review' : 'Published'}
                  </span>
                  {!isSubmitted ? (
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white hover:underline">
                        Read Paper <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                  ) : (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-md">Pending</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const Research = ({ metrics }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Research Profile</h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
        My research focuses on the intersection of Medical Imaging, Deep Learning, and Computer Vision. 
        I aim to develop explainable and robust AI models that can assist in automated disease diagnosis 
        and environmental sustainability.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
      <Card className="p-8 space-y-6">
        <h3 className="text-xl font-bold flex items-center">
          <Award className="mr-3 h-6 w-6 text-slate-700 dark:text-slate-300" />
          Research Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.research.interests.map(interest => (
            <Badge key={interest} variant="secondary" className="text-sm py-1.5 px-4">
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <h3 className="text-xl font-bold flex items-center">
          <Code className="mr-3 h-6 w-6 text-slate-700 dark:text-slate-300" />
          Tools & Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.research.tools.map(tool => (
            <Badge key={tool} variant="outline" className="text-sm py-1.5 px-4">
              {tool}
            </Badge>
          ))}
        </div>
      </Card>
    </div>

    <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
      <h3 className="text-xl font-bold mb-8">Impact Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:w-2/3">
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{metrics.citations}</div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total Citations</div>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="text-4xl font-extrabold text-slate-900 dark:text-white">{metrics.hIndex}</div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">h-index</div>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="text-4xl font-extrabold text-slate-900 dark:text-white">{metrics.i10Index}</div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">i10-index</div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4">*Metrics source: {profile.integrations.metricsEndpoint ? 'Live' : 'Manual'}. Verified on Google Scholar.</p>
    </div>
  </div>
);

const Publications = () => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [copiedId, setCopiedId] = useState(null);

  const filteredPubs = useMemo(() => {
    return profile.publications
      .filter(p => 
        p.title.toLowerCase().includes(filter.toLowerCase()) || 
        p.venue.toLowerCase().includes(filter.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
      )
      .sort((a, b) => sortOrder === 'newest' ? b.year - a.year : a.year - b.year);
  }, [filter, sortOrder]);

  const submittedPubs = useMemo(() => filteredPubs.filter(isUnderReview), [filteredPubs]);
  const publishedPubs = useMemo(() => filteredPubs.filter(p => !isUnderReview(p)), [filteredPubs]);

  const copyCitation = (pub) => {
    const text = `${pub.authors[0]}, et al. (${pub.year}). "${pub.title}". ${pub.venue}. ${pub.doi ? `DOI: ${pub.doi}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const PublicationCard = ({ pub }) => {
    const isSubmitted = isUnderReview(pub);
    return (
      <Card key={pub.id} className="p-6 transition-all hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 text-sm">
              <span className="font-mono font-bold text-slate-900 dark:text-white">{pub.year}</span>
              <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{pub.venue}</span>
              <Badge 
                variant="secondary" 
                className={`text-[10px] uppercase tracking-wide ${isSubmitted ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200" : ""}`}
              >
                {isSubmitted ? "Under Review" : pub.type}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pub.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm italic">
              {pub.authors.join(", ")}
            </p>

            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800/60">
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-1.5">My Contribution</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{pub.contribution}</p>
                </div>
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-1.5">Key Result</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{pub.keyResult}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {pub.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs text-slate-500 border-slate-200">{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="flex md:flex-col gap-3 mt-6 md:mt-0 md:min-w-[160px] md:justify-start">
            {!isSubmitted ? (
              <Button size="sm" variant="outline" className="w-full" onClick={() => openSafe(`https://doi.org/${pub.doi}`)}>
                View DOI <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="w-full opacity-50 cursor-not-allowed">
                No Link Available
              </Button>
            )}
            <Button 
              size="sm" 
              variant={copiedId === pub.id ? "primary" : "ghost"} 
              className={`w-full justify-center md:justify-start transition-all ${copiedId === pub.id ? 'bg-green-600 hover:bg-green-700 border-transparent text-white' : ''}`}
              onClick={() => copyCitation(pub)}
            >
              {copiedId === pub.id ? (
                  <>
                    <Check className="mr-2 h-3 w-3" /> Copied
                  </>
              ) : (
                  <>
                    <Quote className="mr-2 h-3 w-3" /> Cite Paper
                  </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">Publications</h2>
           <p className="text-slate-500 mt-1">A collection of my published research works and conference proceedings.</p>
        </div>
        <Button variant="outline" onClick={() => openSafe(profile.personal.scholar)}>
           <ExternalLink className="mr-2 h-4 w-4" /> Google Scholar Profile
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search papers, venues, or topics..." 
            className="w-full rounded-md border-0 bg-white shadow-sm pl-10 py-2 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-900 dark:bg-slate-950 dark:ring-slate-800 dark:focus:ring-slate-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="relative min-w-[180px]">
           <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
           <select 
             className="w-full rounded-md border-0 bg-white shadow-sm pl-10 pr-8 py-2 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-900 dark:bg-slate-950 dark:ring-slate-800 dark:focus:ring-slate-600 appearance-none cursor-pointer"
             value={sortOrder}
             onChange={(e) => setSortOrder(e.target.value)}
           >
             <option value="newest">Newest First</option>
             <option value="oldest">Oldest First</option>
           </select>
        </div>
      </div>

      <div className="space-y-10">
        {submittedPubs.length > 0 && (
          <div className="space-y-4 animate-in slide-in-from-left-2 duration-500">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Under Review / Submitted</h3>
             {submittedPubs.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
          </div>
        )}

        <div className="space-y-4">
           {submittedPubs.length > 0 && <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Published Works</h3>}
           {publishedPubs.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
        </div>

        {filteredPubs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 border border-dashed border-slate-200 rounded-lg">
            <Search className="h-8 w-8 mb-4 text-slate-300" />
            <p className="text-lg font-medium">No publications found</p>
            <p className="text-sm">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Selected Projects</h2>
      <p className="text-slate-500 max-w-2xl">
         A showcase of technical projects spanning NLP, Computer Vision, and Embedded Systems.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      {profile.projects.map((project, idx) => (
        <Card key={idx} className="flex flex-col p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg group">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
               <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
               <Code className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const CV = () => (
  <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
    <div className="flex justify-between items-center border-b pb-8 border-slate-200 dark:border-slate-800">
       <div>
         <h2 className="text-3xl font-bold">Curriculum Vitae</h2>
         <p className="text-slate-500 mt-2">Academic and professional background.</p>
       </div>
       <Button onClick={() => window.print()}>
         <Download className="mr-2 h-4 w-4" /> Save as PDF
       </Button>
    </div>

    <section className="space-y-8">
      <h3 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
          <GraduationCap className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </div>
        Education
      </h3>
      <div className="space-y-8 pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
        {profile.education.map((edu, idx) => (
          <div key={idx} className="pl-8 relative group">
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-950 group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors"></div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{edu.degree}</h4>
              <span className="text-sm font-mono font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded">{edu.period}</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{edu.institution}</div>
            {edu.details && <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg italic border border-slate-100 dark:border-slate-800">{edu.details}</p>}
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-8">
      <h3 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
          <Briefcase className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </div>
        Experience
      </h3>
      <div className="space-y-10 pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
        {profile.experience.map((exp, idx) => (
          <div key={idx} className="pl-8 relative group">
             <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-950 group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors"></div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{exp.role}</h4>
              <span className="text-sm font-mono font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded">{exp.period}</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-medium mb-3">{exp.org}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
          <Code className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </div>
        Technical Skills
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <strong className="block mb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Machine Learning & CV</strong>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">CNNs, Transformers, YOLOv5/v7, Segmentation, Object Detection, PyTorch, TensorFlow</p>
        </Card>
        <Card className="p-6">
          <strong className="block mb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Development & Embedded</strong>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">Python, PHP, MySQL, HTML/CSS, Arduino, Embedded Systems</p>
        </Card>
      </div>
    </section>
  </div>
);

const Contact = () => (
  <div className="max-w-xl mx-auto space-y-10 animate-in fade-in duration-500 text-center py-8">
    <div className="space-y-4">
      <h2 className="text-4xl font-extrabold tracking-tight">Get In Touch</h2>
      <p className="text-lg text-slate-500 dark:text-slate-400">
        Open to research collaborations, academic opportunities, and technical consulting.
      </p>
    </div>

    <Card className="p-8 space-y-8 shadow-lg">
      <div className="flex flex-col gap-4">
        <Button size="lg" className="w-full text-base" onClick={() => window.location.href = `mailto:${profile.personal.email}`}>
          <Mail className="mr-3 h-5 w-5" /> Send Email
        </Button>
        <Button variant="outline" size="lg" className="w-full text-base" onClick={() => openSafe(profile.personal.linkedin)}>
          <Linkedin className="mr-3 h-5 w-5" /> Connect on LinkedIn
        </Button>
      </div>

      <div className="text-sm text-slate-500 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <p className="flex items-center justify-center gap-2">
           <MapPin className="h-4 w-4" /> {profile.personal.location}
        </p>
        <p className="font-mono text-slate-400">{profile.personal.email}</p>
      </div>
    </Card>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState(null);

  useEffect(() => {
    if (!profile.integrations.metricsEndpoint) return;

    const fetchMetrics = async () => {
      try {
        const res = await fetch(profile.integrations.metricsEndpoint);
        if (res.ok) {
          const data = await res.json();
          setLiveMetrics(data);
        }
      } catch (error) {
        console.error("Failed to fetch live metrics, falling back to static.", error);
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, 21600000);
    return () => clearInterval(intervalId);
  }, []);

  const metrics = liveMetrics || profile.research.metrics;

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'cv', label: 'CV', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className={`min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 ${isDark ? 'dark' : ''}`}>
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-all">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight cursor-pointer" onClick={() => setActiveTab('home')}>
             <div className="h-9 w-9 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-md dark:bg-white dark:text-slate-900 overflow-hidden">
               {profile.assets.avatarUrl ? (
                 <img src={profile.assets.avatarUrl} alt={profile.personal.name} className="h-full w-full object-cover" loading="lazy" />
               ) : (
                 profile.personal.name.charAt(0)
               )}
             </div>
             <span className="hidden sm:inline-block">Mahbub H. Shamim</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Button 
                key={item.id} 
                variant={activeTab === item.id ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={activeTab === item.id ? 'font-semibold' : 'text-slate-600 dark:text-slate-400'}
              >
                {item.label}
              </Button>
            ))}
            <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2 shadow-lg absolute w-full z-50">
            {navItems.map(item => (
              <Button 
                key={item.id} 
                variant={activeTab === item.id ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 md:px-8 py-10 min-h-[calc(100vh-140px)] max-w-6xl">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} metrics={metrics} />}
        {activeTab === 'research' && <Research metrics={metrics} />}
        {activeTab === 'publications' && <Publications />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'cv' && <CV />}
        {activeTab === 'contact' && <Contact />}
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-4">
             <span className="font-semibold text-slate-900 dark:text-slate-200">© {new Date().getFullYear()} Mahbub Hasan Shamim</span>
             <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
             <span>Academic Portfolio</span>
          </div>

          <div className="flex gap-6">
            {profile.personal.github && (
               <a href={profile.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors flex items-center gap-2">
                 <Github className="h-4 w-4" /> GitHub
               </a>
            )}
            <a href={profile.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors flex items-center gap-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={profile.personal.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Scholar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
