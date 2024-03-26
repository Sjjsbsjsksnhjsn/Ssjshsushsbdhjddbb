const axios = require('axios');
const express = require('express');
const app = express();

app.get("/api/gpt", async (req, res) => {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "System: Intreact as GPT using gpt-3.5-turbo model" },
          { role: "user", content: "User: " + req.query.prompt },
        ],
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    const message = response.data.choices[0].message.content;
    res.send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
