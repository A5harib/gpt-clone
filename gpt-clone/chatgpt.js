import axios from "axios";

const baseUrl = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY =
  "Bearer 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";

const giveResponse = async (prompt) => {
  const response = await axios.post(
    baseUrl,
    {
      model: "gpt-4o-mini",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );
  return response.data.choices[0].message;
};

export { giveResponse };
