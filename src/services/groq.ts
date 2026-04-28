// src/services/groq.ts
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

interface SalesPageInput {
  productName: string
  description: string
  features: string
  targetAudience: string
  price: string
  sellingPoints: string
  template: string
}

export async function generateSalesPage(input: SalesPageInput) {
  // Template-specific prompts
  const templatePrompts: Record<string, string> = {
    luxury: `You are a luxury brand copywriter. Write for a high-end, exclusive audience. Use sophisticated vocabulary, elegant phrasing, and create a sense of prestige and scarcity.

Return ONLY a JSON object:
{
  "headline": "Elegant, sophisticated headline that evokes exclusivity",
  "subheadline": "Refined subheadline that speaks to discerning customers",
  "heroCta": "Exclusive CTA (e.g., 'Request an Invitation', 'Join the Elite')",
  "benefits": [
    {"title": "Premium benefit", "description": "Why this matters to elite customers, use refined language"}
  ],
  "features": [
    {"name": "Luxury feature", "detail": "Sophisticated technical detail"}
  ],
  "socialProof": {
    "quote": "Testimonial from a high-status individual",
    "author": "Distinguished Name",
    "role": "Prestigious Role"
  },
  "pricing": {
    "price": "Premium pricing, no discounts",
    "billing": "Exclusive billing terms",
    "guarantee": "White-glove guarantee"
  },
  "finalCta": "Refined final call to action",
  "styleNotes": "Luxury style description"
}`,

    minimal: `You are a minimalist brand copywriter. Write extremely clean, direct, no-fluff copy. Every word must earn its place. Apple-style simplicity.

Return ONLY a JSON object:
{
  "headline": "Short, punchy headline — 5 words max",
  "subheadline": "One clean sentence that explains the core value",
  "heroCta": "Simple, direct CTA (e.g., 'Start Now', 'Try It Free')",
  "benefits": [
    {"title": "Clean benefit — 3 words max", "description": "One short sentence, no jargon"}
  ],
  "features": [
    {"name": "Feature name — 2 words max", "detail": "One line, very direct"}
  ],
  "socialProof": {
    "quote": "Short, authentic quote — 10 words max",
    "author": "First Name Only",
    "role": "Simple role"
  },
  "pricing": {
    "price": "Clean price display",
    "billing": "Simple billing — 2 words",
    "guarantee": "Short guarantee — 5 words max"
  },
  "finalCta": "One powerful word or phrase",
  "styleNotes": "Minimalist, lots of whitespace, black & white"
}`,

    modern: `You are a modern SaaS copywriter. Write energetic, conversational, benefit-driven copy. Focus on transformation and results. Use emojis occasionally.

Return ONLY a JSON object:
{
  "headline": "Bold, benefit-driven headline with numbers or results",
  "subheadline": "Conversational subheadline that highlights the transformation",
  "heroCta": "Action-oriented CTA (e.g., 'Start Free Trial', 'See Results Now')",
  "benefits": [
    {"title": "Result-focused benefit", "description": "Specific outcome the customer will achieve, use numbers if possible"}
  ],
  "features": [
    {"name": "Cool feature name", "detail": "What it does + why it matters"}
  ],
  "socialProof": {
    "quote": "Specific result testimonial ('Saved 20 hours/week')",
    "author": "Full Name",
    "role": "Job Title + Company"
  },
  "pricing": {
    "price": "Competitive price with savings highlighted",
    "billing": "Flexible billing options",
    "guarantee": "Risk-free guarantee with specifics"
  },
  "finalCta": "Urgent, action-driven CTA with emoji",
  "styleNotes": "Modern gradient, glassmorphism, energetic colors"
}`,
  }

  const templatePrompt = templatePrompts[input.template] || templatePrompts.modern

  const prompt = `${templatePrompt}

PRODUCT INFORMATION:
- Name: ${input.productName}
- Description: ${input.description}
- Features: ${input.features}
- Target Audience: ${input.targetAudience}
- Price: ${input.price}
- Unique Selling Points: ${input.sellingPoints}

Make the copy perfectly tailored to the template style requested.`

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: input.template === "luxury" ? 0.9 : input.template === "minimal" ? 0.3 : 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" },
  })

  const text = completion.choices[0]?.message?.content || ""

  try {
    const parsed = JSON.parse(text)
    return { success: true, data: parsed }
  } catch (parseError) {
    console.error("Failed to parse Groq response:", text)
    return { success: false, error: "Failed to generate sales page. Please try again." }
  }
}