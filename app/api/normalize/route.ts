import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { inputText } = await request.json();

        if (!inputText || !inputText.trim()) {
            return NextResponse.json(
                { error: 'Input text is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.JAMAI_BASE_API_KEY;
        const projectId = process.env.JAMAI_BASE_PROJECT_ID;
        const tableId = process.env.JAMAI_BASE_TABLE_ID || 'malay_text_normalization';

        if (!apiKey || !projectId) {
            return NextResponse.json(
                { error: 'JamAI Base credentials not configured. Please check .env.local file.' },
                { status: 500 }
            );
        }

        // Call JamAI Base API to add a row to the Action Table
        const response = await fetch(
            `https://api.jamaibase.com/api/v1/gen_tables/action/rows/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'X-PROJECT-ID': projectId,
                },
                body: JSON.stringify({
                    table_id: tableId,
                    data: [
                        {
                            input_text: inputText
                        }
                    ],
                    stream: false
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('JamAI Base API Error:', errorData);
            return NextResponse.json(
                {
                    error: 'Failed to process normalization',
                    details: errorData
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Log the full response for debugging
        console.log('JamAI Base Response:', JSON.stringify(data, null, 2));

        // Extract the normalized_text from the response
        // Try different possible response structures
        let normalizedText = '';

        // Check if normalized_text is an object with LLM response structure
        const normalizedColumn = data.rows?.[0]?.columns?.normalized_text;

        if (normalizedColumn) {
            // Structure 1: LLM response object with choices
            if (normalizedColumn.choices?.[0]?.message?.content) {
                normalizedText = normalizedColumn.choices[0].message.content;
            }
            // Structure 2: Direct text value
            else if (typeof normalizedColumn.text === 'string') {
                normalizedText = normalizedColumn.text;
            }
            // Structure 3: Direct string
            else if (typeof normalizedColumn === 'string') {
                normalizedText = normalizedColumn;
            }
            // Structure 4: Value field
            else if (typeof normalizedColumn.value === 'string') {
                normalizedText = normalizedColumn.value;
            }
        }

        console.log('Extracted normalized text:', normalizedText);

        // Extract normalization_summary
        let normalizationSummary = [];
        const summaryColumn = data.rows?.[0]?.columns?.normalization_summary;

        if (summaryColumn) {
            let summaryText = '';
            // Extract text from LLM response
            if (summaryColumn.choices?.[0]?.message?.content) {
                summaryText = summaryColumn.choices[0].message.content;
            } else if (typeof summaryColumn.text === 'string') {
                summaryText = summaryColumn.text;
            } else if (typeof summaryColumn === 'string') {
                summaryText = summaryColumn;
            }

            // Parse JSON if we got text
            if (summaryText) {
                try {
                    // Remove markdown code blocks if present
                    const cleanText = summaryText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                    normalizationSummary = JSON.parse(cleanText);
                    console.log('Parsed normalization summary:', normalizationSummary);
                } catch (error) {
                    console.error('Failed to parse normalization_summary JSON:', error);
                    console.log('Raw summary text:', summaryText);
                }
            }
        }

        // Extract informal_features_percentage
        let informalFeaturesPercentage = null;
        const informalColumn = data.rows?.[0]?.columns?.informal_features_percentage;

        if (informalColumn) {
            let informalText = '';
            // Extract text from LLM response
            if (informalColumn.choices?.[0]?.message?.content) {
                informalText = informalColumn.choices[0].message.content;
            } else if (typeof informalColumn.text === 'string') {
                informalText = informalColumn.text;
            } else if (typeof informalColumn === 'string') {
                informalText = informalColumn;
            }

            // Parse JSON if we got text
            if (informalText) {
                try {
                    // Remove markdown code blocks if present
                    const cleanText = informalText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                    informalFeaturesPercentage = JSON.parse(cleanText);
                    console.log('Parsed informal features percentage:', informalFeaturesPercentage);
                } catch (error) {
                    console.error('Failed to parse informal_features_percentage JSON:', error);
                    console.log('Raw informal text:', informalText);
                }
            }
        }

        return NextResponse.json({
            success: true,
            normalizedText: normalizedText,
            normalizationSummary: normalizationSummary,
            informalFeaturesPercentage: informalFeaturesPercentage,
            rowId: data.rows?.[0]?.ID || data.ID || null,
            // Include raw data for debugging
            debug: {
                hasRows: !!data.rows,
                rowCount: data.rows?.length || 0,
                firstRow: data.rows?.[0] || null,
                fullResponse: data // Include the full JamAI Base response
            }
        });

    } catch (error) {
        console.error('Normalization API Error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
