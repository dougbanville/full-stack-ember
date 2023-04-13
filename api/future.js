export default async function handler(req, res) {
  const key = process.env.OPENAI_SECRET;
  return res.status(200).json({
    hello: 'world',
  });
}
