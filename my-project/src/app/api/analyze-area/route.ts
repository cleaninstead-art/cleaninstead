import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "image/jpeg";

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a professional cleaning estimator. Analyze this room/space photo and provide your best estimate of:

1. The TYPE of room (kitchen, bedroom, bathroom, living room, office, basement, garage, hallway, etc.)
2. The estimated SIZE in square feet (sq ft) based on what you can see
3. The estimated DIMENSIONS (width x length in feet)
4. The estimated NUMBER OF BEDROOMS this home likely has based on the overall size
5. Which HOME SIZE CATEGORY this fits: "1-2 Bedrooms", "3 Bedrooms", or "4+ Bedrooms"

Be practical and conservative with estimates. If you can only see part of the room, note that and estimate the full room.

Respond in this exact JSON format only, no other text:
{
  "roomType": "...",
  "estimatedSqFt": number,
  "estimatedWidth": number,
  "estimatedLength": number,
  "estimatedBedrooms": number,
  "homeSizeCategory": "1-2 Bedrooms" | "3 Bedrooms" | "4+ Bedrooms",
  "confidence": "high" | "medium" | "low",
  "notes": "brief note about the estimation"
}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
              },
            },
          ],
        },
      ],
      thinking: { type: "disabled" },
    });

    const content = response.choices[0]?.message?.content || "";

    // Try to parse JSON from the response
    let analysis;
    try {
      // Extract JSON from response (may have markdown wrapping)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    } catch {
      analysis = null;
    }

    if (!analysis) {
      return NextResponse.json({
        analysis: null,
        raw: content,
        error: null,
      });
    }

    return NextResponse.json({
      analysis,
      raw: content,
      error: null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message, analysis: null }, { status: 500 });
  }
}
