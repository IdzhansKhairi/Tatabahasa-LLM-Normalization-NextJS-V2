"use client"

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="position-relative">
      {/* Floating Navigation Button */}
      <Link
        href="/normalize"
        className="btn btn-primary position-fixed shadow-lg d-flex align-items-center gap-2"
        style={{
          top: '20px',
          right: '20px',
          zIndex: 1050,
          borderRadius: '50px',
          padding: '12px 24px',
          fontWeight: '600'
        }}
      >
        <i className="bi bi-pencil-square"></i>
        Try It Now
      </Link>

      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center" style={{
        background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
        color: 'white'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="mb-3">
                <span className="badge bg-light text-primary px-3 py-2" style={{ fontSize: '0.9rem' }}>
                  Final Year Project
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                Malay Language Text Normalization
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
                A research project exploring AI-powered normalization of informal Malay text
                using Large Language Models through JamAI Base platform.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/normalize" className="btn btn-light btn-lg px-4 py-3">
                  <i className="bi bi-play-circle me-2"></i>
                  Try the Demo
                </Link>
                <a href="#about" className="btn btn-outline-light btn-lg px-4 py-3">
                  <i className="bi bi-book me-2"></i>
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="p-4 bg-white rounded-4 shadow-lg">
                <Image
                  src="/images/tatabahasa_logo.PNG"
                  alt="Tatabahasa Logo"
                  width={400}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">About This Project</h2>
            <p className="lead text-muted">
              Understanding the text normalization process
            </p>
          </div>
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <p className="mb-3">
                    This Final Year Project explores the application of Large Language Models (LLMs) in normalizing
                    informal Malay text into standardized, formal language. With the rise of social media and digital
                    communication, informal Malay text has become prevalent, making automated normalization increasingly valuable
                    for various applications.
                  </p>
                  <p className="mb-0">
                    The system leverages <strong>JamAI Base</strong> platform with the <strong>ELLM Qwen3 (30B-A3B, 2507)</strong> model,
                    though the architecture is designed to be flexible and can work with other LLM models available on the platform
                    depending on your tier subscription.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-chat-dots text-primary" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Step 1: Input</h5>
                  <p className="card-text text-muted">
                    Accepts informal Malay text containing slang, abbreviations, contractions, and colloquial expressions commonly found in social media and casual conversations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-cpu text-success" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Step 2: Processing</h5>
                  <p className="card-text text-muted">
                    The LLM analyzes the context and linguistic patterns to intelligently normalize the text while preserving the original meaning and intent.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-check-circle text-info" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Step 3: Output</h5>
                  <p className="card-text text-muted">
                    Generates standardized Malay text following formal grammar rules and vocabulary, suitable for academic or professional use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Key Features</h2>
            <p className="lead text-muted">
              What makes this system effective
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-lightbulb text-warning" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Context-Aware</h5>
                <p className="text-muted small">
                  LLM understands context to preserve meaning while normalizing informal expressions
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-bar-chart text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Detailed Analysis</h5>
                <p className="text-muted small">
                  Provides breakdown of informal features including slang, abbreviations, and typos
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-boxes text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Model Flexibility</h5>
                <p className="text-muted small">
                  Architecture supports different LLM models based on JamAI Base tier availability
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-card-list text-info" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Normalization Summary</h5>
                <p className="text-muted small">
                  Shows word-by-word changes with categories and reasoning for transparency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-5" style={{ background: '#2c3e50', color: 'white' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">Technology Stack</h2>
              <p className="lead mb-4">
                This project utilizes the JamAI Base platform, which provides access to various Large Language Models.
              </p>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Current Model: ELLM Qwen3
                </h5>
                <p className="text-white-50">
                  Using the 30B-A3B parameter model (version 2507) available on the free tier
                </p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Scalable Architecture
                </h5>
                <p className="text-white-50">
                  Designed to work with different LLM models based on JamAI Base tier upgrades
                </p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Next.js Framework
                </h5>
                <p className="text-white-50">
                  Built with modern web technologies for responsive and fast user experience
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white bg-opacity-10 p-5 rounded-4">
                <div className="text-center mb-4">
                  <i className="bi bi-cpu" style={{ fontSize: '5rem', opacity: 0.9 }}></i>
                </div>
                <h4 className="text-center mb-4">Current Configuration</h4>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-white border-opacity-25">
                  <span className="text-white-50">Platform:</span>
                  <span className="fw-bold">JamAI Base</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-white border-opacity-25">
                  <span className="text-white-50">LLM Model:</span>
                  <span className="fw-bold">ELLM Qwen3</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-white border-opacity-25">
                  <span className="text-white-50">Parameters:</span>
                  <span className="fw-bold">30B-A3B</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-white border-opacity-25">
                  <span className="text-white-50">Version:</span>
                  <span className="fw-bold">2507</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-white-50">Frontend:</span>
                  <span className="fw-bold">Next.js + Bootstrap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Potential Applications</h2>
            <p className="lead text-muted">
              Where text normalization can be valuable
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">
                    <i className="bi bi-journal-text text-primary me-2"></i>
                    Academic Research
                  </h5>
                  <p className="card-text text-muted">
                    Analyzing social media data and informal text corpora for linguistic research and Malay language studies.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">
                    <i className="bi bi-people text-success me-2"></i>
                    Content Moderation
                  </h5>
                  <p className="card-text text-muted">
                    Standardizing user-generated content for better analysis and automated processing systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">
                    <i className="bi bi-book text-warning me-2"></i>
                    Educational Tools
                  </h5>
                  <p className="card-text text-muted">
                    Helping students learn formal Malay writing by showing corrections and explanations of informal usage.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">
                    <i className="bi bi-chat-square-dots text-info me-2"></i>
                    NLP Preprocessing
                  </h5>
                  <p className="card-text text-muted">
                    Preparing informal Malay text for downstream natural language processing tasks and analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgments Section */}
      <section className="py-5" style={{ background: '#34495e', color: 'white' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Acknowledgments</h2>
            <p className="lead" style={{ opacity: 0.9 }}>
              This project would not be possible without the support of:
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-building text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="fw-bold mb-3">JamAI Base</h5>
                  <p className="text-white-50 mb-0">
                    For providing the platform and access to powerful LLM models that made this research possible
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-person-badge text-success mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="fw-bold mb-3">Project Supervisor</h5>
                  <p className="text-white-50 mb-0">
                    For guidance, insights, and continuous support throughout this Final Year Project
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-mortarboard text-info mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="fw-bold mb-3">University</h5>
                  <p className="text-white-50 mb-0">
                    For providing the opportunity and resources to conduct this research project
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link href="/normalize" className="btn btn-light btn-lg px-5 py-3">
              <i className="bi bi-play-circle me-2"></i>
              Try the Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                <i className="bi bi-mortarboard me-2"></i>
                Final Year Project - Tatabahasa (LLM Malay Text Normalization)
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                <i className="bi bi-code-slash me-2"></i>
                Built with Next.js & JamAI Base
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
