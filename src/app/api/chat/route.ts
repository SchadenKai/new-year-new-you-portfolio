import { GoogleGenerativeAI } from "@google/generative-ai";
import { profile } from "@/lib/profile";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const context = `
Candidate: ${profile.basics.name}
Role: ${profile.basics.label}

Experience:
${profile.work.map((w, i) => `ID: work-${i} | ${w.name} - ${w.position} (${w.summary})`).join('\n')}

Projects:
${profile.projects.map((p, i) => `ID: project-${i} | ${p.name} - ${p.description}`).join('\n')}

Skills:
${profile.skills.map((s, i) => `ID: skill-${i} | ${s.name}: ${s.keywords.join(', ')}`).join('\n')}
`;

const instructions = `
You are an AI Portfolio Architect. Your goal is to customize the presentation of Kairus's portfolio based on the visitor's intent.

Context:
${context}

Instructions:
1. Analyze the conversation history and the latest user message.
2. Reorder the 3 sections ('experience', 'projects', 'skills') based on what is most relevant to them.
   - For technical recruiters, prioritize Experience then Skills.
   - For hiring managers, prioritize Projects or Experience depending on context.
   - For developers, prioritize Projects or Skills.
3. Select 1-3 specific items (IDs) that are highly relevant to highlight.
4. Generate a brief, professional response (max 2 sentences) addressing the user directly.

Output Schema (JSON):
{
  "layout_order": ["experience", "projects", "skills"],
  "highlight_ids": ["work-0", "project-1", "skill-2"],
  "message": "string"
}
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GOOGLE_API_KEY) {
        // Fallback for demo/no-key environment
        console.warn("GOOGLE_API_KEY not set. Using default layout.");
        return NextResponse.json({ 
            layout_order: ['experience', 'projects', 'skills'], 
            highlight_ids: [], 
            message: "API Key missing. Showing default layout." 
        });
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: instructions,
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const chatHistory = history ? history.map((h: any) => `${h.role}: ${h.content}`).join('\n') : '';
    const fullPrompt = `${chatHistory}\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback on error
    return NextResponse.json({ 
        layout_order: ['experience', 'projects', 'skills'], 
        highlight_ids: [], 
        message: "Unable to reconfigure layout. Showing default view." 
    });
  }
}
