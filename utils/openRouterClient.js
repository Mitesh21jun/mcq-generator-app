import axios from 'axios';

export const askOpenRouter = async (prompt) => {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://yourapp.com',
        'X-Title': 'MCQ Generator',
      },
    }
  );
  console.log(response.data.choices)

  return response.data.choices[0].message.content;
};
