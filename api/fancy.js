/* eslint-disable no-undef */
const { Configuration, OpenAIApi } = require('openai');

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_SECRET;

  const configuration = new Configuration({
    apiKey,
  });
  const prompt = req.query.prompt;
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
                ${prompt}
                ###
              `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['\n'],
    });

    const data = response.data;
    console.log(data);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}
