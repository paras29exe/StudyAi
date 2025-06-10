'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/landing/Navbar'
import { BookOpen, Brain, Users, Shield, Upload, MessageSquare, Sparkles, ArrowRight, Check, Menu, X } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-black dark:to-blue-950/30 px-6 md:px-20 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.12),transparent_50%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center pt-16">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 dark:border-blue-800/50 mb-8 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Study Revolution
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 max-w-6xl leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Smart Study
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-4xl mb-12 text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          Transform your learning journey with AI-powered study tools. Upload content, engage in semantic conversations, 
          and generate personalized study materials with complete privacy control.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group text-lg">
            Start Learning Free
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-12 py-6 rounded-xl font-semibold transition-all duration-300 text-lg backdrop-blur-sm">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isReversed?: boolean;
  gradient: string;
}

const FeatureCard = ({ icon: Icon, title, description, isReversed = false, gradient }: FeatureProps) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
      <div className="flex-1 flex flex-col text-center lg:text-left justify-center items-center lg:items-start lg:justify-start space-y-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-xl  text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          <span className="text-lg">Explore feature</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className={`w-80 h-80 bg-gradient-to-br ${gradient} rounded-3xl shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-gray-700/20`}>
          <Icon className="w-32 h-32 text-white/80" />
        </div>
      </div>
    </div>
  );
};

const UploadFeature = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-purple-50/20 via-white to-pink-50/20 dark:from-purple-950/10 dark:via-gray-900 dark:to-pink-950/10 px-6 md:px-20">
      <div className="w-4/5 mx-auto">
        <FeatureCard
          icon={Upload}
          title="Upload & Vectorize Study Materials"
          description="Seamlessly upload PDFs or add online links. Our advanced AI converts your study materials into vectorized data, enabling lightning-fast semantic search and intelligent content interactions."
          gradient="from-blue-500 to-cyan-500"
        />
      </div>
    </section>
  );
};

const SemanticChat = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-purple-50/20 via-white to-pink-50/20 dark:from-purple-950/10 dark:via-gray-900 dark:to-pink-950/10 px-6 md:px-20">
      <div className="w-4/5 mx-auto">
        <FeatureCard
          icon={MessageSquare}
          title="Semantic Search via AI Chat"
          description="Engage with your study content through intelligent conversations. Ask complex questions, receive instant contextual answers, and explore your notes with unprecedented natural language understanding."
          isReversed={true}
          gradient="from-purple-500 to-pink-500"
        />
      </div>
    </section>
  );
};

const AiTools = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-green-50/20 via-white to-emerald-50/20 dark:from-green-950/10 dark:via-gray-900 dark:to-emerald-950/10 px-6 md:px-20">
      <div className="w-4/5 mx-auto">
        <FeatureCard
          icon={Brain}
          title="AI-Powered Study Tools"
          description="Generate personalized flashcards, comprehensive summaries, and challenging multiple-choice questions automatically. Our AI adapts to your learning style and creates content that maximizes retention."
          gradient="from-green-500 to-emerald-500"
        />
      </div>
    </section>
  );
};

const MultiplayerQuiz = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-orange-50/20 via-white to-red-50/20 dark:from-orange-950/10 dark:via-gray-900 dark:to-red-950/10 px-6 md:px-20">
      <div className="w-4/5 mx-auto">
        <FeatureCard
          icon={Users}
          title="Multiplayer Real-Time Quizzes"
          description="Transform learning into an engaging social experience. Challenge friends and classmates in real-time quizzes, track progress together, and foster collaborative learning in a competitive environment."
          isReversed={true}
          gradient="from-orange-500 to-red-500"
        />
      </div>
    </section>
  );
};

const PrivacyControl = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-indigo-50/20 via-white to-blue-50/20 dark:from-indigo-950/10 dark:via-gray-900 dark:to-blue-950/10 px-6 md:px-20">
      <div className="w-4/5 mx-auto">
        <FeatureCard
          icon={Shield}
          title="Complete Privacy & Control"
          description="Maintain absolute control over your data with your personal API keys. No shared resources, no hidden charges, no data compromise. Your learning materials and progress remain entirely private and secure."
          gradient="from-indigo-500 to-blue-500"
        />
      </div>
    </section>
  );
};

const CallToAction = () => {
  const features = [
    "AI-powered study tools",
    "Semantic search capabilities",
    "Real-time collaboration",
    "Complete privacy control"
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-blue-950 dark:to-purple-950 px-6 md:px-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      
      <div className="max-w-4/5 mx-auto text-center text-white relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Ready to revolutionize
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            your learning?
          </span>
        </h2>
        <p className="text-2xl mb-16 text-blue-100 leading-relaxed font-light">
          Join thousands of students who have transformed their study experience with our AI-powered platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center text-blue-100 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Check className="w-6 h-6 mr-3 text-green-400" />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button className="bg-gradient-to-r justify-self-center from-white to-blue-50 text-blue-900 hover:from-blue-50 hover:to-white px-12 py-6 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group">
          Start Your Free Trial
          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-6xl mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">StudyAI</span>
            </div>
            <p className="text-gray-400 text-lg">Empowering students with AI-driven learning tools</p>
          </div>
          <div className="text-gray-400">
            © {new Date().getFullYear()} StudyAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <UploadFeature />
      <SemanticChat />
      <AiTools />
      <MultiplayerQuiz />
      <PrivacyControl />
      <CallToAction />
      <Footer />
    </div>
  );
}