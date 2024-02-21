// ==UserScript==
// @name         Colab AI Copilot
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  https://github.com/MuhammetSonmez for more info.
// @author       MuhammetSonmez (github)
// @match        https://colab.research.google.com/*
// @icon         https://ssl.gstatic.com/colaboratory-static/common/ef0f647ca75d5b2cdb44b4acc87fa7e4/img/favicon.ico
// @grant        none
// ==/UserScript==


function askToProxyServer(question){
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000');

        ws.onopen = function() {
            console.log('connected');
            ws.send(question);
        };

        ws.onmessage = function(event) {
            console.log(event.data);
            resolve(event.data); // Resolve the promise with the received data
            ws.close(); // Close the WebSocket connection
        };

        ws.onerror = function(error) {
            console.error('WebSocket error:', error);
            reject(error); // Reject the promise with the error
        };

        ws.onclose = function() {
            console.log('disconnected.');
        };
    });
}

async function getCell(){
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (cell.textContent.includes('<help>')) {
            return cell;
        }
    }
    return null;
}

(async function() {
    'use strict';
    try {
        document.addEventListener('keydown', async function(event) {
            let cell = await getCell();
            if (cell){
                let question = cell.getText().replace('<help>', "").trim();
                console.log(question);

                try {
                    let response = await askToProxyServer(question);
                    cell.setText(response);
                } catch (error) {
                    console.error('Error:', error);
                    // Handle the error accordingly, for example:
                    // cell.setText("Error: Couldn't get response from server");
                }
            }

        });
    } catch (error) {
        console.error('Error:', error);
    }
})();


