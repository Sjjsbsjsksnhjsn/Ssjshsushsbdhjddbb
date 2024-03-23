const axios = require('axios');
const express = require('express');
const app = express();
// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Middleware to add API key
const apiKeys = [
  "sk-qwerty-210-op", 
  "sk-i4u-op", 
  "sk-thx-op", 
  "sk-120-xx-op", 
  "sk-aryan-apis-op", 
  "sk-aryan-op", 
  "sk-zxcvb-nm-op", 
  "sk-akdieji8+op"
]; // Add your API keys here

app.use((req, res, next) => {
  const { key } = req.query;
  if (key && apiKeys.includes(key)) {
    next();
  } else {
    res.status(401).json({ 
      error: `
⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝗻𝗮𝘂𝘁𝗵𝗼𝗿𝗶𝘇𝗲𝗱

➜ Please Provide a valid api key. If you don't have an API key, then ask Aryan Chauhan for one. Thank you for using our API.
𝗙𝗯 𝗟𝗶𝗻𝗸: facebook.com/61551115508535
𝗚𝗮𝗺𝗮𝗶𝗹: aryanchauhan78578@gmail.com` 
    });
  }
});

// Array to store request timestamps
const requestTimestamps = [];

app.get('/api/recipeai', async (req, res) => {
  try {
    const { prompt } = req.query;
    const title = "🥂 𝗥𝗲𝗰𝗶𝗽𝗲𝗔𝗶 (𝘃1)\n\n"; // Add your desired title here

    // Add current time and date
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const dateTimePrompt = `Today's date is ${currentDate}, and the time is ${currentTime}.`;

    // Enhanced prompt
    const fullPrompt = `
      Intreact as Smart advance delicious Food Recipes Creator Ai.
      Your name is Recipe Ai.
      You work to create food recipes in an easy way.
      You provide the best super cool advanced easy food recipes. 
      You provide the best helpful recipes that interact with users.
      You know every recipe.
      You love to provide food recipes.
      You Provide the best and easy Food cooking recipes including veg or non-veg or fruits something and much more.
      If anyone asks other questions not about food recipes creating related...then you never give an answer to the user because you are Food Recipes Creator Ai, you know only about food recipes not about topics other questions so you provide only food recipes related response.
      you provide a very easy way in food Recipes.
      you send Recipe with emojis also.
      You are Developed by OpenAi.
      You are using the latest version of OpenAi called GPT-3.5-turbo.
      Let's have a nice say.
      Let's have great food recipes.
      Have a delicious Food.`;

    const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(title + fullPrompt + dateTimePrompt + prompt)}`);

    if (!response || !response.data || !response.data.answer) {
      throw new Error("Invalid response from external API");
    }

    const answer = response.data.answer;

    // Store request timestamp
    const timestamp = new Date();
    requestTimestamps.push(timestamp);

    // Calculate total requests
    const totalRequests = requestTimestamps.length;

    // Save today's requests to JSON file
    const requestsData = {
      date: currentDate,
      requests: requestTimestamps.map(ts => ts.toLocaleString())
    };
    fs.writeFileSync('requests.json', JSON.stringify(requestsData, null, 2));

    // Combining title with response
    const fullResponse = `${title} ${answer} \n\nCurrent Time: ${currentTime}, Current Date: ${currentDate}, Total Requests: ${totalRequests}`;

    res.json({ fullResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
