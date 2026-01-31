import { VertexAI, HarmCategory, HarmBlockThreshold } from "@google-cloud/vertexai";
import { profile } from "@/lib/profile";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Initialize Vertex AI
// Note: Requires GOOGLE_APPLICATION_CREDENTIALS to be set in environment
// or running in an environment with default credentials (like Cloud Run)
const project = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

const vertexAI = project ? new VertexAI({ project, location }) : null;

// ============================================================================
// RATE LIMITING CONFIGURATION
// ============================================================================
const RATE_LIMIT = {
  REQUESTS_PER_MINUTE: 5,
  REQUESTS_PER_DAY: 20,
  MINUTE_WINDOW_MS: 60 * 1000,        // 1 minute in milliseconds
  DAY_WINDOW_MS: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// In-memory rate limit store (works for single-instance deployments)
// For production with multiple instances, consider Redis or similar
interface RateLimitEntry {
  minuteRequests: number[];  // Timestamps of requests in the last minute
  dayRequests: number[];     // Timestamps of requests in the last day
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    // Remove entries that haven't been used in 24 hours
    if (entry.dayRequests.length === 0 || 
        now - Math.max(...entry.dayRequests) > RATE_LIMIT.DAY_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  });
}, 5 * 60 * 1000);

// ============================================================================
// HUMOROUS MESSAGES
// ============================================================================

// Humorous error messages for when the AI has a bad day
const ERROR_MESSAGES = [
  "Oops! My digital hamsters took an unscheduled coffee break. ☕ Showing you the classic layout instead!",
  "Plot twist: The AI decided to take a nap. Don't worry, the portfolio still works great!",
  "My brain cells are currently on vacation. 🏖️ Here's the standard view while they sunbathe.",
  "*elevator music plays* Technical difficulties, but your journey continues!",
  "The magic 8-ball says 'Ask again later.' In the meantime, enjoy the default layout!",
  "Houston, we have a... tiny hiccup. Nothing a classic portfolio view can't fix!",
  "My crystal ball is foggy today. 🔮 Falling back to the tried-and-true layout.",
  "The AI gremlins are acting up again. Classic view to the rescue!",
  "Beep boop... *sparks fly* ...ahem, please enjoy this lovely default layout.",
  "The cosmic rays disrupted my circuits! Here's the portfolio in its natural form.",
  "I tried to think too hard and got a brain freeze. 🧊 Default mode activated!",
  "My neurons are playing hide and seek. While I find them, here's the standard layout!"
];

// Humorous messages for per-minute rate limit
const MINUTE_RATE_LIMIT_MESSAGES = [
  "Whoa there, speedster! 🏃‍♂️ You're chatting faster than my circuits can handle. Take a breather!",
  "Easy there, turbo! My hamsters need a quick water break. Try again in a minute!",
  "You're on fire today! 🔥 But I need a sec to cool down. Give me a minute?",
  "Hold up! You're typing faster than a caffeinated developer. Let's slow down a bit!",
  "My brain is still processing your enthusiasm! 🧠 Gimme a minute to catch up.",
  "Wow, such excitement! But even AIs need micro-breaks. Chat with me again in a moment!",
  "Rate limit reached! Translation: You're awesome, but I need a tiny timeout. ⏰",
  "Achievement unlocked: Speed Chatter! 🎮 Now let's unlock: Patient Conversationalist.",
];

// Humorous messages for daily rate limit
const DAILY_RATE_LIMIT_MESSAGES = [
  "You've been my favorite visitor today! 🌟 But I need my beauty sleep. See you tomorrow!",
  "Daily chat limit reached! I've loved our conversations, but even AIs need their 8 hours of rest. 😴",
  "Congratulations! You've maxed out the fun meter for today! 🎉 Reset happens at midnight.",
  "You've officially won the 'Most Engaged Visitor' award! 🏆 Come back tomorrow for more chats.",
  "The AI union says I need to clock out now. 📋 Let's continue this tomorrow!",
  "Daily limit hit! Don't worry, I'll miss you too. See you after I recharge! 🔋",
  "You broke the chat-o-meter! 📊 It'll be fixed by tomorrow. Same bat-time, same bat-channel!",
  "I've enjoyed every message, but my daily quota is spent! The portfolio speaks for itself until tomorrow. ✨",
];

// Get random message from an array
const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const getRandomErrorMessage = () => getRandomMessage(ERROR_MESSAGES);
const getMinuteRateLimitMessage = () => getRandomMessage(MINUTE_RATE_LIMIT_MESSAGES);
const getDailyRateLimitMessage = () => getRandomMessage(DAILY_RATE_LIMIT_MESSAGES);

// ============================================================================
// RATE LIMITING LOGIC
// ============================================================================

interface RateLimitResult {
  allowed: boolean;
  type?: 'minute' | 'day';
  remaining?: { minute: number; day: number };
  resetIn?: number; // milliseconds until reset
}

function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  
  // Get or create entry for this identifier
  let entry = rateLimitStore.get(identifier);
  if (!entry) {
    entry = { minuteRequests: [], dayRequests: [] };
    rateLimitStore.set(identifier, entry);
  }
  
  // Clean up old requests
  entry.minuteRequests = entry.minuteRequests.filter(
    (ts) => now - ts < RATE_LIMIT.MINUTE_WINDOW_MS
  );
  entry.dayRequests = entry.dayRequests.filter(
    (ts) => now - ts < RATE_LIMIT.DAY_WINDOW_MS
  );
  
  // Check daily limit first (more restrictive)
  if (entry.dayRequests.length >= RATE_LIMIT.REQUESTS_PER_DAY) {
    const oldestDayRequest = Math.min(...entry.dayRequests);
    return {
      allowed: false,
      type: 'day',
      remaining: { minute: 0, day: 0 },
      resetIn: RATE_LIMIT.DAY_WINDOW_MS - (now - oldestDayRequest),
    };
  }
  
  // Check per-minute limit
  if (entry.minuteRequests.length >= RATE_LIMIT.REQUESTS_PER_MINUTE) {
    const oldestMinuteRequest = Math.min(...entry.minuteRequests);
    return {
      allowed: false,
      type: 'minute',
      remaining: { 
        minute: 0, 
        day: RATE_LIMIT.REQUESTS_PER_DAY - entry.dayRequests.length 
      },
      resetIn: RATE_LIMIT.MINUTE_WINDOW_MS - (now - oldestMinuteRequest),
    };
  }
  
  // Request allowed - record it
  entry.minuteRequests.push(now);
  entry.dayRequests.push(now);
  
  return {
    allowed: true,
    remaining: {
      minute: RATE_LIMIT.REQUESTS_PER_MINUTE - entry.minuteRequests.length,
      day: RATE_LIMIT.REQUESTS_PER_DAY - entry.dayRequests.length,
    },
  };
}

// Get client identifier (IP address or fallback)
async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();
  
  // Try various headers for the real IP (behind proxies/load balancers)
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  
  // Fallback for development
  return "anonymous-user";
}


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
    // ========================================================================
    // RATE LIMITING CHECK
    // ========================================================================
    const clientId = await getClientIdentifier();
    const rateLimitResult = checkRateLimit(clientId);
    
    if (!rateLimitResult.allowed) {
      const isMinuteLimit = rateLimitResult.type === 'minute';
      const message = isMinuteLimit 
        ? getMinuteRateLimitMessage() 
        : getDailyRateLimitMessage();
      
      // Calculate reset time in seconds
      const resetInSeconds = Math.ceil((rateLimitResult.resetIn || 0) / 1000);
      
      // Return 429 Too Many Requests with a humorous message
      return NextResponse.json(
        { 
          layout_order: ['experience', 'projects', 'skills'], 
          highlight_ids: [], 
          message,
          isRateLimited: true,
          rateLimitType: rateLimitResult.type,
          resetInSeconds,
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit-Minute': RATE_LIMIT.REQUESTS_PER_MINUTE.toString(),
            'X-RateLimit-Limit-Day': RATE_LIMIT.REQUESTS_PER_DAY.toString(),
            'X-RateLimit-Remaining-Minute': '0',
            'X-RateLimit-Remaining-Day': rateLimitResult.remaining?.day.toString() || '0',
            'X-RateLimit-Reset': resetInSeconds.toString(),
            'Retry-After': resetInSeconds.toString(),
          }
        }
      );
    }
    
    // ========================================================================
    // MAIN LOGIC
    // ========================================================================
    const { message, history } = await req.json();

    if (!vertexAI) {
        // Fallback for demo/no-key environment
        console.warn("GOOGLE_CLOUD_PROJECT_ID not set. Using default layout.");
        return NextResponse.json({ 
            layout_order: ['experience', 'projects', 'skills'], 
            highlight_ids: [], 
            message: ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)],
            rateLimit: rateLimitResult.remaining,
        });
    }

    const model = vertexAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: {
            role: 'system',
            parts: [{ text: instructions }]
        },
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const chatHistory = history ? history.map((h: any) => `${h.role}: ${h.content}`).join('\n') : '';
    const fullPrompt = `${chatHistory}\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    // Vertex AI SDK response structure might slightly differ, safe access
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        throw new Error("No content generated from Vertex AI");
    }
    
    // Include rate limit info in successful response
    let parsedResponse;
    try {
        parsedResponse = JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        // Fallback if model doesn't return valid JSON
        parsedResponse = {
            layout_order: ['experience', 'projects', 'skills'],
            highlight_ids: [],
            message: text // Return the raw text as message if it's not JSON
        };
    }

    return NextResponse.json({
      ...parsedResponse,
      rateLimit: rateLimitResult.remaining,
    }, {
      headers: {
        'X-RateLimit-Limit-Minute': RATE_LIMIT.REQUESTS_PER_MINUTE.toString(),
        'X-RateLimit-Limit-Day': RATE_LIMIT.REQUESTS_PER_DAY.toString(),
        'X-RateLimit-Remaining-Minute': rateLimitResult.remaining?.minute.toString() || '0',
        'X-RateLimit-Remaining-Day': rateLimitResult.remaining?.day.toString() || '0',
      }
    });
  } catch (error) {
    // Log the actual error for debugging (server-side only)
    console.error("AI Generation Error:", error);
    
    // Return a humorous, user-friendly error message
    return NextResponse.json({ 
        layout_order: ['experience', 'projects', 'skills'], 
        highlight_ids: [], 
        message: getRandomErrorMessage(),
        isError: true  // Flag to let frontend know this was an error
    });
  }
}
