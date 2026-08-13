import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { GoogleBusinessSection } from './components/GoogleBusinessSection';
import { ServicesSection } from './components/ServicesSection';
import { FaqSection } from './components/FaqSection';
import { VirtualConsultationModal } from './components/VirtualConsultationModal';
import { SeoAssistantPanel } from './components/SeoAssistantPanel';
import { CloudinaryMediaManager } from './components/CloudinaryMediaManager';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { SpecialistSection } from './components/SpecialistSection';
import { BeforeAfterCase } from './types';

export default function App() {
  const [seoPanelOpen, setSeoPanelOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [cloudinaryOpen, setCloudinaryOpen] = useState(false);
  const [customCases, setCustomCases] = useState<BeforeAfterCase[]>([]);

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCase = (newCase: BeforeAfterCase) => {
    setCustomCases((prev) => [newCase, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E2B27] font-sans flex flex-col selection:bg-[#BFA181] selection:text-[#FAF7F2]">
      {/* Top Navbar with Google profile link, Cloudinary & SEO trigger */}
      <Navbar
        onOpenSeoPanel={() => setSeoPanelOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenCloudinary={() => setCloudinaryOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-grow">
        {/* Hero Section with interactive Before/After comparison */}
        <HeroSection
          onOpenQuiz={() => setQuizOpen(true)}
          onExploreGallery={() => handleNavigateSection('galeria')}
        />

        {/* Filterable Before/After Gallery with Sliders, Cloudinary Streaming & Detail Modals */}
        <BeforeAfterGallery
          onOpenCloudinary={() => setCloudinaryOpen(true)}
          customCases={customCases}
        />

        {/* Janet's Certificate & Specialist Presentation */}
        <SpecialistSection />

        {/* Google Business Profile & Rating (5.0 Stars & Reviews) */}
        <GoogleBusinessSection />

        {/* Services & Pricing Menu */}
        <ServicesSection />

        {/* FAQ Accordion for SEO Keywords */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp contact button */}
      <WhatsAppFloatingButton />

      {/* Online Hair Quiz Consultation Modal */}
      <VirtualConsultationModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />

      {/* SEO & Google Indexing Management Panel */}
      <SeoAssistantPanel
        isOpen={seoPanelOpen}
        onClose={() => setSeoPanelOpen(false)}
      />

      {/* Cloudinary Media Manager Modal */}
      <CloudinaryMediaManager
        isOpen={cloudinaryOpen}
        onClose={() => setCloudinaryOpen(false)}
        onAddCaseToGallery={handleAddCase}
      />
    </div>
  );
}

