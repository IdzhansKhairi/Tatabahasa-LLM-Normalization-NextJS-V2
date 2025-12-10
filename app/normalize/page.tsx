"use client"
import { useState } from "react";
import Image from "next/image";
import { Card, Input, Button, Space, Typography, Statistic, message, Divider } from "antd";
import { CopyOutlined, DeleteOutlined, FileTextOutlined, ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/charts";
import { Table } from 'antd';
import { Badge } from 'antd';
import "./normalize.css"

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import JamAI from "jamaibase";
import Link from "next/link";

const { TextArea } = Input;
const { Text } = Typography;

interface NormalizationChange {
    original_word: string;
    normalized_word: string;
    category: string;
    reason: string;
}

export default function NormalizePage() {
    const [originalText, setOriginalText] = useState("");
    const [normalizedText, setNormalizedText] = useState("");
    const [isNormalizing, setIsNormalizing] = useState(false);
    const [normalizationSummary, setNormalizationSummary] = useState<NormalizationChange[]>([]);

    // Normalization statistics
    const [stats, setStats] = useState({
        totalWords: 0,
        normalizedWords: 0,
        informalFeatures: 0,
        emojiCount: 0
    });

    // Informal features breakdown
    const [informalFeaturesData, setInformalFeaturesData] = useState<any>(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setOriginalText(text);
            message.success("Text pasted successfully!");
        } catch (err) {
            message.error("Failed to paste text. Please paste manually.");
        }
    };

    const handleClear = () => {
        setOriginalText("");
        setNormalizedText("");
        setNormalizationSummary([]);
        setInformalFeaturesData(null);
        setStats({
            totalWords: 0,
            normalizedWords: 0,
            informalFeatures: 0,
            emojiCount: 0
        });
        message.info("Text cleared");
    };

    const countEmojis = (text: string): number => {
        // Comprehensive emoji regex that handles compound emojis (with ZWJ, skin tones, etc.)
        // This matches complete emoji sequences including:
        // - Basic emojis
        // - Emojis with skin tone modifiers
        // - Emojis with ZWJ sequences (like family, professions)
        // - Flag emojis
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(\u200D(\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*/gu;
        const matches = text.match(emojiRegex);
        return matches ? matches.length : 0;
    };

    const handleCopyOriginal = () => {
        navigator.clipboard.writeText(originalText);
        message.success("Original text copied!");
    };

    const handleCopyNormalized = () => {
        navigator.clipboard.writeText(normalizedText);
        message.success("Normalized text copied!");
    };

    const handleNormalize = async () => {
        if (!originalText.trim()) {
            message.warning("Please enter text to normalize");
            return;
        }

        setIsNormalizing(true);

        try {
            // Call the API route to normalize text using JamAI Base
            const response = await fetch('/api/normalize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputText: originalText
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to normalize text');
            }

            // Log response for debugging
            // console.log('=== API Response ===');
            // console.log('Full Response:', JSON.stringify(data, null, 2));
            // console.log('Normalized Text:', data.normalizedText);
            // console.log('Debug Info:', data.debug);

            // Set the normalized text and summary from JamAI Base
            setNormalizedText(data.normalizedText);
            setNormalizationSummary(data.normalizationSummary || []);

            // Extract the first element if it's an array, otherwise use it directly
            const informalData = Array.isArray(data.informalFeaturesPercentage)
                ? data.informalFeaturesPercentage[0]
                : data.informalFeaturesPercentage;
            setInformalFeaturesData(informalData);

            // Diagnostic check
            if (!data.informalFeaturesPercentage) {
                console.warn('⚠️ Informal Features Percentage is NULL or UNDEFINED');
                console.log('Available columns in response:', data.debug?.firstRow?.columns ? Object.keys(data.debug.firstRow.columns) : 'No columns found');
            }

            // Show warning if no normalized text was returned
            if (!data.normalizedText) {
                console.warn('No normalized text returned. Debug info:', data.debug);
                message.warning('Normalization completed but no text was returned. Check console for details.');
            } else {
                message.success("Text normalized successfully!");
            }

            // Calculate statistics
            const originalWordCount = originalText.split(/\s+/).filter((word: string) => word.length > 0).length;
            const normalizedWordCount = data.normalizedText.split(/\s+/).filter((word: string) => word.length > 0).length;
            const informalFeaturesCount = data.normalizationSummary?.length || 0;
            const emojisCount = countEmojis(originalText);

            setStats({
                totalWords: originalWordCount,
                normalizedWords: normalizedWordCount,
                informalFeatures: informalFeaturesCount,
                emojiCount: emojisCount
            });

        } catch (error) {
            console.error('Normalization error:', error);
            message.error(error instanceof Error ? error.message : 'Failed to normalize text');
        } finally {
            setIsNormalizing(false);
        }
    };

    // Data for the donut chart
    const chartData = [
        {
            type: "Formal",
            value: stats.totalWords - stats.informalFeatures,
        },
        {
            type: "Informal",
            value: stats.informalFeatures,
        },
    ];

    const chartConfig = {
        data: chartData,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: "inner",
            offset: "-50%",
            content: "{value}",
            style: {
                textAlign: "center",
                fontSize: 14,
            },
        },
        interactions: [{ type: "element-selected" }, { type: "element-active" }],
        statistic: {
            title: false,
            content: {
                style: {
                    fontSize: "24px",
                    fontWeight: "bold",
                },
                content: stats.totalWords > 0
                    ? `${((stats.informalFeatures / stats.totalWords) * 100).toFixed(1)}%`
                    : "0%",
            },
        },
        color: ["#52c41a", "#ff4d4f"],
    };

    return (
        <div>
            <header className="px-3 py-2 border-bottom bg-white shadow-sm">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link href="/" className="text-decoration-none d-flex align-items-center">
                            <Image className="me-2" src="/images/tatabahasa_logo.PNG" alt="Tatabahasa Logo" width={80} height={40} />
                            <h5 className="medium p-0 m-0 text-dark"><strong>LLM Malay Text Normalization</strong></h5>
                        </Link>
                    </div>
                    <Link href="/" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Actual UI Looks */}
            <div className="background-body p-3" style={{ minHeight: "calc(100vh - 80px)", backgroundColor: "#f0f2f5" }}>
                <div className="container-fluid">
                    <div className="row align-items-stretch mb-4">
                        <div className="col-6 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header bg-original">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-file-text me-2"></i>
                                        <label><strong>Original Text</strong></label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex mb-3">
                                        <textarea
                                            className="form-control w-100 pe-4 border-0 shadow-none resize-none"
                                            placeholder="Enter or paste your text here..."
                                            style={{ minHeight: "300px" }}
                                            value={originalText}
                                            onChange={(e) => setOriginalText(e.target.value)}
                                        ></textarea>
                                        <div className="d-flex flex-column pt-2">
                                            <i
                                                className="bi bi-x-lg mb-3 fs-5"
                                                style={{ cursor: originalText ? 'pointer' : 'default', opacity: originalText ? 1 : 0.5 }}
                                                onClick={handleClear}
                                            ></i>
                                            <i
                                                className="bi bi-clipboard fs-5"
                                                style={{ cursor: 'pointer' }}
                                                onClick={handlePaste}
                                            ></i>
                                        </div>

                                    </div>
                                    <button
                                        className="btn custom-btn-color"
                                        onClick={handleNormalize}
                                        disabled={isNormalizing || !originalText.trim()}
                                    >
                                        <i className="bi bi-arrow-right me-2"></i>
                                        <span>{isNormalizing ? 'Normalizing...' : 'Normalize text'}</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="col-6 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header bg-normalized">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle me-2"></i>
                                        <label><strong>Normalized Text</strong></label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex mb-3">
                                        <textarea
                                            className="form-control w-100 pe-4 border-0 bg-white shadow-none resize-none"
                                            placeholder="Normalized text will appear here..."
                                            style={{ minHeight: "300px" }}
                                            value={normalizedText}
                                            disabled
                                        ></textarea>
                                        <div className="d-flex flex-column pt-2">
                                            <i
                                                className="bi bi-copy pt-2 mb-3 fs-5"
                                                style={{ cursor: normalizedText ? 'pointer' : 'default', opacity: normalizedText ? 1 : 0.5 }}
                                                onClick={handleCopyNormalized}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-table me-2"></i>
                                        <label>Normalization Summary</label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="p-3">
                                        <div className="row mb-4 align-items-stretch">
                                            <div className="col-8 d-flex flex-column">
                                                <div className="mb-3 flex-grow-1">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-file-text me-2"></i>
                                                        <h5 className="p-0 m-0"><strong>Original Text</strong></h5>
                                                    </div>
                                                    <div className="card p-3 border-l-original">
                                                        <div className="text-secondary">{originalText ? <i>"{originalText}"</i> : "Original text will be here..."}</div>
                                                    </div>

                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-check-circle me-2"></i>
                                                        <h5 className="p-0 m-0"><strong>Normalized Text</strong></h5>
                                                    </div>
                                                    <div className="card p-3 border-l-normalized">
                                                        <div className="text-secondary">{normalizedText ? <i>"{normalizedText}"</i> : "Normalized Malay text will be here..."}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <div className="card h-100 w-100">
                                                    <div className="row g-3 p-3">
                                                        <div className="col-6">
                                                            <Statistic
                                                                title="Original Words"
                                                                value={stats.totalWords}
                                                                prefix={<FileTextOutlined />}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <Statistic
                                                                title="Normalized Words"
                                                                value={stats.normalizedWords}
                                                                prefix={<CheckCircleOutlined />}
                                                                valueRender={(value) => <span style={{ color: "#3f8600" }}>{value}</span>}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <Statistic
                                                                title="Informal Features"
                                                                value={stats.informalFeatures}
                                                                valueRender={(value) => <span style={{ color: "#cf1322" }}>{value}</span>}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <Statistic
                                                                title="Emoji Count"
                                                                value={stats.emojiCount}
                                                                valueRender={(value) => <span style={{ color: "#faad14" }}>{value}</span>}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <Table
                                                        dataSource={normalizationSummary}
                                                        columns={[
                                                            {
                                                                title: 'Original Word',
                                                                dataIndex: 'original_word',
                                                                key: 'original_word',
                                                                width: '20%',
                                                            },
                                                            {
                                                                title: 'Normalized Word',
                                                                dataIndex: 'normalized_word',
                                                                key: 'normalized_word',
                                                                width: '20%',
                                                            },
                                                            {
                                                                title: 'Category',
                                                                dataIndex: 'category',
                                                                key: 'category',
                                                                width: '20%',
                                                                render: (category) => (
                                                                    <span className="badge bg-primary">{category}</span>
                                                                ),
                                                            },
                                                            {
                                                                title: 'Reason',
                                                                dataIndex: 'reason',
                                                                key: 'reason',
                                                                width: '40%',
                                                            },
                                                        ]}
                                                        pagination={{ pageSize: 10 }}
                                                        locale={{
                                                            emptyText: 'No normalization changes yet. Enter text and click "Normalize text" to see the analysis.'
                                                        }}
                                                        size="small"
                                                        rowKey={(record, index) => `${record.original_word}-${index}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-chat-dots me-2"></i>
                                        <label>Informal Features Percentage</label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    
                                    {informalFeaturesData ? (
                                        
                                        <div className="row">
                                            {/* Main Formal vs Informal Donut Chart */}
                                            <div className="col-md-4">
                                                <div className="text-center mb-3">
                                                    <h6><strong>Overall Analysis</strong></h6>
                                                </div>
                                                <Pie
                                                    data={[
                                                        {
                                                            type: 'Formal',
                                                            value: parseFloat((100 - (informalFeaturesData.total_informal_percentage || 0)).toFixed(1))
                                                        },
                                                        {
                                                            type: 'Informal',
                                                            value: parseFloat((informalFeaturesData.total_informal_percentage || 0).toFixed(1))
                                                        }
                                                    ]}
                                                    angleField="value"
                                                    colorField="type"
                                                    color={['#52c41a', '#ff4d4f']}
                                                    legend={{
                                                        position: 'bottom'
                                                    }}
                                                />
                                                <div className="text-center mt-2">
                                                    <Text type="secondary">
                                                        {informalFeaturesData.total_informal_count} of {informalFeaturesData.total_words} words
                                                    </Text>
                                                </div>
                                            </div>

                                            {/* Breakdown of Informal Features */}
                                            <div className="col-md-8">
                                                <div className="text-center mb-3">
                                                    <h6><strong>Informal Features Breakdown</strong></h6>
                                                </div>
                                                <div className="row g-3">
                                                    {/* Slang */}
                                                    <div className="col-md-6">
                                                        <div className="card border">
                                                            <div className="card-body p-3">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <span><strong>Slang</strong></span>
                                                                    <span className="badge bg-danger">{informalFeaturesData.informal_features?.slang?.percentage?.toFixed(2)}%</span>
                                                                </div>
                                                                <div className="progress" style={{ height: '8px' }}>
                                                                    <div
                                                                        className="progress-bar bg-danger"
                                                                        style={{ width: `${informalFeaturesData.informal_features?.slang?.percentage || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-secondary small mt-1">
                                                                    {informalFeaturesData.informal_features?.slang?.count || 0} occurrences
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Short Forms */}
                                                    <div className="col-md-6">
                                                        <div className="card border">
                                                            <div className="card-body p-3">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <span><strong>Short Forms</strong></span>
                                                                    <span className="badge bg-warning text-dark">{informalFeaturesData.informal_features?.short_forms?.percentage?.toFixed(1)}%</span>
                                                                </div>
                                                                <div className="progress" style={{ height: '8px' }}>
                                                                    <div
                                                                        className="progress-bar bg-warning"
                                                                        style={{ width: `${informalFeaturesData.informal_features?.short_forms?.percentage || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-secondary small mt-1">
                                                                    {informalFeaturesData.informal_features?.short_forms?.count || 0} occurrences
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Contractions */}
                                                    <div className="col-md-6">
                                                        <div className="card border">
                                                            <div className="card-body p-3">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <span><strong>Contractions</strong></span>
                                                                    <span className="badge bg-info">{informalFeaturesData.informal_features?.contractions?.percentage?.toFixed(1)}%</span>
                                                                </div>
                                                                <div className="progress" style={{ height: '8px' }}>
                                                                    <div
                                                                        className="progress-bar bg-info"
                                                                        style={{ width: `${informalFeaturesData.informal_features?.contractions?.percentage || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-secondary small mt-1">
                                                                    {informalFeaturesData.informal_features?.contractions?.count || 0} occurrences
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* English Usage */}
                                                    <div className="col-md-6">
                                                        <div className="card border">
                                                            <div className="card-body p-3">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <span><strong>English Usage</strong></span>
                                                                    <span className="badge bg-primary">{informalFeaturesData.informal_features?.english_usage?.percentage?.toFixed(1)}%</span>
                                                                </div>
                                                                <div className="progress" style={{ height: '8px' }}>
                                                                    <div
                                                                        className="progress-bar bg-primary"
                                                                        style={{ width: `${informalFeaturesData.informal_features?.english_usage?.percentage || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-secondary small mt-1">
                                                                    {informalFeaturesData.informal_features?.english_usage?.count || 0} occurrences
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Typos & Spelling */}
                                                    <div className="col-md-6">
                                                        <div className="card border">
                                                            <div className="card-body p-3">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <span><strong>Typos & Spelling</strong></span>
                                                                    <span className="badge bg-secondary">{informalFeaturesData.informal_features?.typos_spelling?.percentage?.toFixed(1)}%</span>
                                                                </div>
                                                                <div className="progress" style={{ height: '8px' }}>
                                                                    <div
                                                                        className="progress-bar bg-secondary"
                                                                        style={{ width: `${informalFeaturesData.informal_features?.typos_spelling?.percentage || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-secondary small mt-1">
                                                                    {informalFeaturesData.informal_features?.typos_spelling?.count || 0} occurrences
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-secondary p-5">
                                            <i className="bi bi-pie-chart" style={{ fontSize: '48px', opacity: 0.3 }}></i>
                                            <p className="mt-3">No data available. Enter text and click "Normalize text" to see the informal features analysis.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <footer className="py-4 border-top footer-bg">
                <div className="container text-center">
                    <div className="mb-3">
                        <span className="text-muted">
                            <i className="bi bi-code-slash me-2"></i>
                            Built with <strong>Next.js</strong> & <strong>JamAI Base</strong>
                        </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <a
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-dark"
                            style={{ borderRadius: '20px' }}
                        >
                            <i className="bi bi-arrow-up-right-circle me-1"></i>
                            Next.js
                        </a>
                        <a
                            href="https://jamaibase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-dark"
                            style={{ borderRadius: '20px' }}
                        >
                            <i className="bi bi-arrow-up-right-circle me-1"></i>
                            JamAI Base
                        </a>
                    </div>
                </div>
            </footer>
            {/* <footer className="py-4 border-top bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <p className="mb-0 text-muted">
                                <i className="bi bi-code-slash me-2"></i>
                                Built with <strong>Next.js</strong> & <strong>JamAI Base</strong>
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3">
                                <a
                                    href="https://nextjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none text-muted"
                                >
                                    <i className="bi bi-box-arrow-up-right me-1"></i>
                                    Next.js
                                </a>
                                <span className="text-muted">|</span>
                                <a
                                    href="https://jamaibase.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none text-muted"
                                >
                                    <i className="bi bi-box-arrow-up-right me-1"></i>
                                    JamAI Base
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>      */}
        </div>
    )
}

