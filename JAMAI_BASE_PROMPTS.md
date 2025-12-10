# JamAI Base - Malay Text Normalization Prompts

This document contains all the prompts and configurations for the JamAI Base Action Table used in the Malay Language Text Normalization project.

---

## 📊 Table Structure

### Action Table Name: `malay_text_normalization`

| Column Name | Type | Description |
|------------|------|-------------|
| `input_text` | Input | Original text from user (Malay or English) |
| `normalized_text` | Output (LLM) | Formal Bahasa Melayu version |
| `normalization_summary` | Output (LLM) | JSON array of word-by-word changes |
| `informal_features_percentage` | Output (LLM) | JSON object with informality analysis |

---

## 🎯 Column Prompts

### 1. `input_text` (Input Column)

**Type:** Input Column
**Description:** Original Malay text (formal/informal) or English text to be normalized
**Source:** User input from the "Original Text" textarea in the UI

**No prompt needed** - this is user input.

---

### 2. `normalized_text` (Output Column - LLM)

**Type:** Output Column (LLM)
**Model Recommendation:** GPT-4, Claude 3.5 Sonnet, or equivalent
**Temperature:** 0.3 (for consistency)

**Prompt:**
```
You are an expert in Malay language normalization. Your task is to convert the given text into formal, standard Bahasa Melayu.

Input text: ${input_text}

Instructions:
1. If the input is in English, translate it to formal Bahasa Melayu
2. If the input is informal Malay (slang, dialect, short-forms), convert to formal Bahasa Melayu
3. Normalize the following features:
   - Slang words → Standard Malay equivalents
   - Short-forms (e.g., "sbb" → "sebab", "yg" → "yang", "utk" → "untuk")
   - Mixed English-Malay → Pure Malay
   - Dialectal variations → Standard Malay
   - Typos and spelling errors → Correct spelling
   - Informal grammar → Formal grammar structure
   - Repeated letters (e.g., "takkkk" → "tidak")
   - Colloquialisms (e.g., "nak" → "hendak", "tak" → "tidak", "dah" → "sudah")

4. Maintain the original meaning and intent
5. Use proper Malay sentence structure and grammar
6. Output ONLY the normalized Malay text, nothing else

Output the normalized text in formal Bahasa Melayu.
```

**Output Format:** Plain text (normalized Malay)

**UI Display:** Shows in "Normalized Text" card

---

### 3. `normalization_summary` (Output Column - LLM)

**Type:** Output Column (LLM)
**Model Recommendation:** GPT-4, Claude 3.5 Sonnet (for accurate analysis)
**Temperature:** 0.2 (for precision)

**Prompt:**
```
You are an expert in Malay language normalization analysis.

Original text: ${input_text}
Normalized text: ${normalized_text}

Task: Identify and document EVERY word or phrase that was changed during normalization.

For each change, provide:
1. original_word: the exact word/phrase from input_text
2. normalized_word: the corrected form from normalized_text
3. category: ONE of these types:
   - "short-form" (e.g., sbb→sebab, yg→yang)
   - "slang" (e.g., gila→sangat, best→bagus)
   - "typo" (e.g., tiddak→tidak)
   - "english-mixed" (English words → Malay equivalent)
   - "informal-contraction" (e.g., tak→tidak, nak→hendak, dah→sudah)
   - "dialect" (regional variations → standard Malay)
   - "repeated-letters" (e.g., takkkk→tidak, bestttt→bagus)
   - "spelling-error" (wrong spelling → correct spelling)
   - "grammar-fix" (grammatical corrections)
   - "translation" (English to Malay translation)
   - "others" (any other type of change)

4. reason: Brief, clear explanation (1-2 sentences max) in Malay why this change was necessary

Output format: Valid JSON array ONLY. No markdown, no comments, no extra text.

Example output:
[
  {
    "original_word": "sbb",
    "normalized_word": "sebab",
    "category": "short-form",
    "reason": "Penulisan ringkas 'sbb' dinormalkan kepada bentuk penuh 'sebab' untuk penggunaan formal."
  },
  {
    "original_word": "tak",
    "normalized_word": "tidak",
    "category": "informal-contraction",
    "reason": "Kata tidak formal 'tak' ditukar kepada 'tidak' mengikut tatabahasa baku."
  }
]

Output the JSON array now:
```

**Output Format:** JSON Array
```typescript
interface NormalizationChange {
  original_word: string;
  normalized_word: string;
  category: string;
  reason: string;
}

type NormalizationSummary = NormalizationChange[];
```

**UI Display:**
- Original text card (shows `input_text`)
- Normalized text card (shows `normalized_text`)
- Table with columns: Original Word | Normalized Word | Category | Reason
- Statistics card (derived from this data):
  - **Total Words:** Count of words in `input_text`
  - **Normalized:** Count of changes (length of JSON array)
  - **Informal Features:** Count of changes (same as normalized)
  - **Accuracy:** `100 - (normalized_count / total_words * 100)` or use informal_features_percentage

---

### 4. `informal_features_percentage` (Output Column - LLM)

**Type:** Output Column (LLM)
**Model Recommendation:** GPT-4, Claude 3.5 Sonnet
**Temperature:** 0.2 (for consistent counting)

**Prompt:**
```
You are an expert in analyzing Malay language informality.

Original text: ${input_text}

Task: Analyze the input text and calculate the percentage of informal features for each category.

Count words/phrases that fall into these 5 informal feature categories:

1. **slang**: Informal/colloquial words (e.g., "gila", "best", "syok", "cool", "awesome")
2. **short-forms**: Abbreviated words (e.g., "sbb", "yg", "utk", "dgn", "pd", "kpd")
3. **contractions**: Informal contractions (e.g., "tak", "nak", "dah", "belum", "dlm")
4. **english-usage**: English words mixed in Malay text (e.g., "meeting", "phone", "update")
5. **typos-spelling**: Spelling errors, typos, or repeated letters (e.g., "tiddak", "takkkk", "bestttt")

Calculate:
- Total words in input_text
- Count of words in each category
- Percentage for each category = (category_count / total_words) × 100

Output format: Valid JSON object ONLY. No markdown, no comments.

Example output:
{
  "total_words": 25,
  "informal_features": {
    "slang": {"count": 2, "percentage": 8.0},
    "short_forms": {"count": 3, "percentage": 12.0},
    "contractions": {"count": 5, "percentage": 20.0},
    "english_usage": {"count": 1, "percentage": 4.0},
    "typos_spelling": {"count": 0, "percentage": 0.0}
  },
  "total_informal_count": 11,
  "total_informal_percentage": 44.0
}

Output the JSON object now:
```

**Output Format:** JSON Object
```typescript
interface InformalFeature {
  count: number;
  percentage: number;
}

interface InformalFeaturesAnalysis {
  total_words: number;
  informal_features: {
    slang: InformalFeature;
    short_forms: InformalFeature;
    contractions: InformalFeature;
    english_usage: InformalFeature;
    typos_spelling: InformalFeature;
  };
  total_informal_count: number;
  total_informal_percentage: number;
}
```

**UI Display:**
- Pie chart showing formal vs informal distribution
- Breakdown of 5 informal feature types with percentages
- Statistics card:
  - **Total Words:** `total_words`
  - **Normalized:** `total_informal_count`
  - **Informal Features:** `total_informal_count`
  - **Accuracy:** `100 - total_informal_percentage`

---

## 📈 Suggested UI Statistics Mapping

Based on the JamAI Base outputs, here's how to calculate the statistics:

```typescript
// From normalization_summary JSON
const normalizationSummary = JSON.parse(normalization_summary_output);
const totalChanges = normalizationSummary.length;

// From informal_features_percentage JSON
const informalAnalysis = JSON.parse(informal_features_percentage_output);

// Statistics for UI
const stats = {
  totalWords: informalAnalysis.total_words,
  normalizedWords: totalChanges, // Number of words that were changed
  informalFeatures: informalAnalysis.total_informal_count,
  accuracy: (100 - informalAnalysis.total_informal_percentage).toFixed(1)
};
```

---

## 🔧 JamAI Base Configuration

### Action Table Settings

```yaml
Table Name: malay_text_normalization
Table Type: Action Table
Model: claude-3-5-sonnet-20241022 (or gpt-4-turbo)
Temperature: 0.3
Max Tokens: 4096
```

### Column Configuration

1. **input_text**
   - Type: `str` (Input)
   - Required: `true`

2. **normalized_text**
   - Type: `str` (Output - LLM)
   - Model: `claude-3-5-sonnet-20241022`
   - Temperature: `0.3`
   - Prompt: [See above]

3. **normalization_summary**
   - Type: `str` (Output - LLM)
   - Model: `claude-3-5-sonnet-20241022`
   - Temperature: `0.2`
   - Prompt: [See above]
   - **Note:** Output will be JSON string, parse with `JSON.parse()`

4. **informal_features_percentage**
   - Type: `str` (Output - LLM)
   - Model: `claude-3-5-sonnet-20241022`
   - Temperature: `0.2`
   - Prompt: [See above]
   - **Note:** Output will be JSON string, parse with `JSON.parse()`

---

## 🎨 UI Component Mapping

### Normalization Summary Card

**Display:**
1. **Original Text Card** - Shows `input_text`
2. **Normalized Text Card** - Shows `normalized_text`
3. **Changes Table** - Parse `normalization_summary` and display:
   | Original Word | Normalized Word | Category | Reason |
   |--------------|-----------------|----------|---------|
   | sbb | sebab | short-form | Penulisan ringkas... |

4. **Statistics Card** - Calculate from both outputs:
   - Total Words: `informal_features_percentage.total_words`
   - Normalized: `normalization_summary.length`
   - Informal Features: `informal_features_percentage.total_informal_count`
   - Accuracy: `100 - informal_features_percentage.total_informal_percentage`

5. **Pie Chart** - Use `informal_features_percentage.informal_features` breakdown:
   - Slang: X%
   - Short-forms: Y%
   - Contractions: Z%
   - English Usage: A%
   - Typos/Spelling: B%

---

## 🚀 Next Steps (Implementation)

1. ✅ Create JamAI Base Action Table with these prompts
2. ⬜ Install `jamaibase` SDK: `npm install jamaibase`
3. ⬜ Create `.env.local` with JamAI Base credentials
4. ⬜ Create Next.js API route `/api/normalize`
5. ⬜ Update `handleNormalize()` function in `page.tsx`
6. ⬜ Parse and display JSON outputs in UI components
7. ⬜ Test with various Malay informal texts

---

## 📝 Notes

- All LLM outputs should be in **Malay language** for consistency
- Use **Claude 3.5 Sonnet** or **GPT-4** for best Malay language understanding
- Set temperature to `0.2-0.3` for consistent, deterministic outputs
- Always validate and parse JSON outputs with try-catch blocks
- Consider adding retry logic for LLM API failures

---

**Last Updated:** 2025-12-08
**Project:** Malay Language Text Normalization with JamAI Base
