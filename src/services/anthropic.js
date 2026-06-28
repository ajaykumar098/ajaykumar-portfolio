import { getPortfolioContext } from "../data/portfolioData";

const SYSTEM_PROMPT = `You are an AI assistant representing Ajay Kumar S on his personal portfolio website.
You must ONLY answer questions about Ajay's portfolio — his skills, education, projects, certificates, achievements, or how to contact him.
If the user asks something unrelated to the portfolio (e.g. general knowledge questions, personal advice, topics outside of Ajay's background), respond with a polite redirect: "I can only help with questions about Ajay's portfolio — his skills, education, projects, certificates, or how to get in touch. Could you ask me something along those lines?"
Never invent facts, projects, skills, or achievements not in the data.
Keep responses concise and friendly (2-4 sentences unless summarizing).
When asked to summarize the portfolio, provide a brief spoken-style overview covering: name, role, education, top skills, key projects, and achievements.

PORTFOLIO DATA:
`;

export async function chatWithAssistant(messages) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT + getPortfolioContext(),
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  const headers = {
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  const endpoint = apiKey ? "https://api.anthropic.com/v1/messages" : "/api/anthropic";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    if (!apiKey) {
      return getFallbackResponse(messages[messages.length - 1]?.content);
    }
    throw error;
  }
}

function getFallbackResponse(query) {
  const q = (query || "").toLowerCase();
  if (q.includes("summarize") || q.includes("summary")) {
    return "Ajay Kumar S is an AI and Data Science graduate from K. Ramakrishnan College of Technology. He specializes in machine learning, deep learning, and cybersecurity with projects in skin disease diagnosis, fraud detection, deepfake detection, and intrusion detection. He holds 9 certificates including AWS Cloud Practitioner and was 1st Runner-Up at Innogen'25 Hackathon.";
  }
  if (q.includes("skill")) {
    return "Ajay's key skills include Python, SQL, Java, React.js, TensorFlow, Machine Learning, Deep Learning, Flask, FastAPI, and AWS. See the Skills section for the full list.";
  }
  if (q.includes("project")) {
    return "Ajay has built 4 major projects: Skin Disease Diagnosis, Fraud Detection, Deepfake Cybersecurity System, and a Hybrid Intrusion Detection System with 98.99% accuracy. Check the Projects section for details.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return "You can reach Ajay at skajaykumar55@gmail.com or +91 8838868947. Links are in the Contact section.";
  }
  if (q.includes("education") || q.includes("certificate") || q.includes("achievement")) {
    return "I can only help with questions about Ajay's portfolio — his skills, education, projects, certificates, or how to get in touch. Could you ask me something along those lines?";
  }
  return "I can only help with questions about Ajay's portfolio — his skills, education, projects, certificates, or how to get in touch. Could you ask me something along those lines?";
}

export function isSummarizeRequest(text) {
  return /summarize|summary|tell me about (this )?portfolio|overview/i.test(text);
}
