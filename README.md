# Google Colab AI Assistant

This project is an artificial intelligence assistant plugin designed for use within the Google Colab environment. Its primary aim is to facilitate users in posing questions within the Colab environment and receiving pertinent answers.

## Technologies Used
The technologies utilized in this project include:

Node.js: A JavaScript runtime employed for server-side coding. Please note that my proficiency in this area is still developing.
Tampermonkey: A user script manager utilized for managing browser-based user scripts. My familiarity with this tool is still in its nascent stages.
Proxy Server: Server software acting as an intermediary between the client and server. It facilitates communication via WebSocket. I am currently in the process of gaining expertise in this domain.

## Usage
Please note that since this project marks my first encounter with Node.js, Tampermonkey, WebSocket, and Proxy Server technologies, it remains open to further development and suggestions.
To utilize the assistant:

Open a cell within the Google Colab environment (a text cell is recommended).
Write your question in the cell. For instance: "Example of a linear regression model with PyTorch."
Type <help> in the cell and press Enter.
This process ensures that the question you've inputted is detected via the Tampermonkey plugin and forwarded to the proxy server. Subsequently, the proxy server relays this question to the main server, which in turn redirects the response back to the Tampermonkey plugin. Consequently, the received data is printed within the editor.
