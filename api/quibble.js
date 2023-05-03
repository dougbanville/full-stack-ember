const { Configuration, OpenAIApi } = require('openai');
const apiKey = process.env.OPENAI_SECRET;

const configuration = new Configuration({
  apiKey,
});

export default async function handler(req, res) {
  const openai = new OpenAIApi(configuration);

  const reservePrice = 15;

  const name = req.query.name;

  const moods = ['angry', 'happy', 'sad', 'excited', 'bored', 'confused'];

  const randomNumber = Math.floor(Math.random() * moods.length);

  const personality = `${req.query.personality} in ${moods[randomNumber]}`;

  const offerAmount = req.query.offerAmount;
  const promptInfo = `I have an item priced at $25 USD, A customer, ${name}, has made a bid of ${offerAmount} dollars on this item. The secret  reserve price is ${reservePrice}.  I want you to respond to ${name} like ${personality}`;
  let prompt;
  if (offerAmount < reservePrice) {
    prompt = `${promptInfo} haggling, ask him to make another offer and don't reveal the reserve. Write a compressed response directed at ${name}`;
  } else {
    prompt = `${promptInfo} haggling, tell him he has won the item and ask him to pay. Write a compressed response directed at ${name}`;
  }
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
