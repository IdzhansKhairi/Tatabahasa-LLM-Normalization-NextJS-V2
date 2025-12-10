"use client"

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="position-relative">
      {/* Floating Navigation Button */}
      <Link
        href="/normalize"
        className="btn position-fixed shadow-lg d-flex align-items-center gap-2"
        style={{
          top: '20px',
          right: '20px',
          zIndex: 1050,
          borderRadius: '50px',
          padding: '12px 24px',
          fontWeight: '600',
          backgroundColor: '#f5c065',
          border: 'none',
          color: '#2c3e50'
        }}
      >
        <i className="bi bi-pencil-square"></i>
        Try It Now
      </Link>

      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center" style={{
        background: 'linear-gradient(135deg, #e8d5b7 0%, #f5e6d3 100%)',
        color: '#2c3e50'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="mb-3">
                <span className="badge px-3 py-2" style={{
                  fontSize: '0.9rem',
                  backgroundColor: '#e63946',
                  color: 'white'
                }}>
                  Final Year Project
                </span>
              </div>
              <h1 className="fw-bold mb-4" style={{
                lineHeight: '1.2',
                fontSize: '3.5rem',
                color: '#2d6a4f'
              }}>
                Malay Language Text Normalization
              </h1>
              <p className="lead mb-4" style={{
                fontSize: '1.2rem',
                color: '#495057'
              }}>
                A research project exploring AI-powered normalization of informal Malay text
                using Large Language Models through JamAI Base platform.
              </p>
              <div className="p-4 bg-white rounded-4 shadow-sm" style={{ display: 'inline-block' }}>
                <div className="d-flex gap-3 flex-wrap">
                  <Link
                    href="/normalize"
                    className="btn btn-lg px-4 py-3 fw-semibold"
                    style={{
                      backgroundColor: '#f5c065',
                      border: 'none',
                      color: '#2c3e50'
                    }}
                  >
                    <i className="bi bi-play-circle me-2"></i>
                    Try the Demo
                  </Link>
                  <a
                    href="https://github.com/IdzhansKhairi/Tatabahasa-LLM-Normalization-NextJS-V2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg px-4 py-3 fw-semibold"
                    style={{
                      backgroundColor: '#2d6a4f',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-github me-2"></i>
                    View on GitHub
                  </a>
                </div>
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
                  <i className="bi bi-lightbulb" style={{ fontSize: '3rem', color: '#f5c065' }}></i>
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
                  <i className="bi bi-bar-chart" style={{ fontSize: '3rem', color: '#2d6a4f' }}></i>
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
                  <i className="bi bi-boxes" style={{ fontSize: '3rem', color: '#e63946' }}></i>
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
                  <i className="bi bi-card-list" style={{ fontSize: '3rem', color: '#f5c065' }}></i>
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
      <section className="py-5" style={{ background: '#2d6a4f', color: 'white' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">Technology Stack</h2>
              <p className="lead mb-4">
                This project utilizes the JamAI Base platform, which provides access to various Large Language Models.
              </p>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#f5c065' }}></i>
                  Current Model: ELLM Qwen3
                </h5>
                <p className="text-white-50">
                  Using the 30B-A3B parameter model (version 2507) available on the free tier
                </p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#f5c065' }}></i>
                  Scalable Architecture
                </h5>
                <p className="text-white-50">
                  Designed to work with different LLM models based on JamAI Base tier upgrades
                </p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#f5c065' }}></i>
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
                    <i className="bi bi-journal-text me-2" style={{ color: '#2d6a4f' }}></i>
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
                    <i className="bi bi-people me-2" style={{ color: '#f5c065' }}></i>
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
                    <i className="bi bi-book me-2" style={{ color: '#e63946' }}></i>
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
                    <i className="bi bi-chat-square-dots me-2" style={{ color: '#2d6a4f' }}></i>
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
      <section className="py-5" style={{ background: '#6d4c41', color: 'white' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Acknowledgments</h2>
            <p className="lead" style={{ opacity: 0.9 }}>
              This project would not be possible without the invaluable support of:
            </p>
          </div>
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-person-badge mb-3" style={{ fontSize: '3rem', color: '#f5c065' }}></i>
                  <h5 className="fw-bold mb-3">Associate Prof. Dr. Norisma Binti Idris</h5>
                  <p className="text-white-50 small mb-2">
                    <em>FYP Supervisor - Dean of FSKTM</em>
                  </p>
                  <p className="text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>
                    For her invaluable support, guidance, and encouragement throughout FYP1 and FYP2. Her insights and advice have been instrumental in shaping this project and ensuring its success.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-mortarboard mb-3" style={{ fontSize: '3rem', color: '#3dac7aff' }}></i>
                  <h5 className="fw-bold mb-3">Associate Prof. Dr. Salinah Binti Ja'afar</h5>
                  <p className="text-white-50 small mb-2">
                    <em>Academy of Malay Studies</em>
                  </p>
                  <p className="text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>
                    For her expertise and assistance in validating the project output. Her contributions have been vital in enabling the Confusion Matrix analysis to evaluate the application's performance.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 h-100">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-palette mb-3" style={{ fontSize: '3rem', color: '#e63946' }}></i>
                  <h5 className="fw-bold mb-3">Chia Poosanisa</h5>
                  <p className="text-white-50 small mb-2">
                    <em>UI/UX Designer</em>
                  </p>
                  <p className="text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>
                    For her creative input and support in advising on the UI design and designing the Tatabahasa logo. Her efforts have truly enriched the aesthetic and functional aspects of the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row g-4 mb-5">
            <div className="col-12">
              <div className="card bg-white bg-opacity-10 border-0">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-building mb-3" style={{ fontSize: '2.5rem', color: '#f5c065' }}></i>
                  <h5 className="fw-bold mb-3">JamAI Base</h5>
                  <p className="text-white-50 mb-0">
                    For providing the platform and access to powerful LLM models that made this research possible
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="text-center mt-5">
            <Link
              href="/normalize"
              className="btn btn-lg px-5 py-3 fw-semibold"
              style={{
                backgroundColor: '#f5c065',
                border: 'none',
                color: '#2c3e50'
              }}
            >
              <i className="bi bi-play-circle me-2"></i>
              Try the Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white-50 bg-secondary">
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
