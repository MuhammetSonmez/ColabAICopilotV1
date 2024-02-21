const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios')

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', async function incoming(message) {
    console.log('Received:', message);
    const messageString = message.toString();
    console.log(messageString);
    
    try {
      const answer = await ask(messageString);
      ws.send(answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  });
  

  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

server.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});



async function ask(question){
    const url = "https://www.blackbox.ai/api/chat";
    const headers = {
        "Host": "www.blackbox.ai",
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://www.blackbox.ai",
        "Referer": "https://www.blackbox.ai/chat",
    };

    const data = {
        "messages": [{"id": "None", "content": question, "role": "user"}],
        "previewToken": null,
        "codeModelMode": true,
        "agentMode": {},
        "trendingAgentMode": {"mode": true},
        "isMicMode": false,
    };

    try {
        console.log("request sending...");
        const response = await axios.post(url, data, { headers });
        console.log("status code: ", response.status);
        //console.log("response: ", response);
        
        // console.log("Response Code:", response.status);
        // console.log("Response Content:", response.data);

        // eslint-disable-next-line eqeqeq
        if (response.status != 200) {
            vscode.window.showInformationMessage("Please check your network...");
            process.exit();
        }

        return response.data;
    } catch (error) {
        console.error("Error making the request:", error);
        process.exit();
    }
}


