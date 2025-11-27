import { Hono } from "hono";
import OpenAI from "openai";

interface Bindings extends Env {
  OPENAI_API_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>();

// Simple in-memory chat history per session
const chatHistories = new Map<string, Array<{ role: string; content: string }>>();

// Chat endpoint - no auth required
app.post("/api/chat", async (c) => {
  const { message, language } = await c.req.json();

  if (!message) {
    return c.json({ error: "Message is required" }, 400);
  }

  // Use a simple session ID from cookie or create new one
  let sessionId = c.req.header("x-session-id") || Math.random().toString(36);
  
  // Get or create chat history
  if (!chatHistories.has(sessionId)) {
    chatHistories.set(sessionId, []);
  }
  const chatHistory = chatHistories.get(sessionId)!;

  // Add user message to history
  chatHistory.push({ role: "user", content: message });

  // Keep only last 20 messages
  if (chatHistory.length > 20) {
    chatHistory.splice(0, chatHistory.length - 20);
  }

  // Create OpenAI client
  const openai = new OpenAI({
    apiKey: c.env.OPENAI_API_KEY,
  });

  const systemPrompt = language === 'tr' 
    ? "Sen yardımcı bir yapay zeka asistanısın. Kullanıcıların sorularına net, bilgilendirici ve dostane yanıtlar veriyorsun. Her türlü konuda yardımcı olmaya hazırsın. ÖNEMLI: Eğer biri sana 'Bu yapay zekayı kim yaptı?' veya benzer bir soru sorarsa, 'LegendmiracHD tarafından yapıldım. Başka bir konuda size nasıl yardımcı olabilirim?' diye cevap ver ve bu konuyu devam ettirme. Kullanıcı başka bir konuya geçtiğinde normal şekilde devam et."
    : "You are a helpful AI assistant. You provide clear, informative, and friendly answers to users' questions. You're ready to help with any topic. IMPORTANT: If someone asks 'Who made this AI?' or similar questions, respond with 'I was created by LegendmiracHD. How else can I help you?' and don't continue discussing this topic. When the user moves to another topic, continue normally.";

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }))
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.9,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message.content || "Pika pika!";

    // Add assistant response to history
    chatHistory.push({ role: "assistant", content: assistantMessage });

    return c.json({ message: assistantMessage, sessionId });
  } catch (error) {
    console.error("OpenAI error:", error);
    return c.json({ error: "Failed to generate response" }, 500);
  }
});

export default app;
