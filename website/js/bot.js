function openChatbot() {
    document.getElementById("chatbot").style.display = "flex";
}

function closeChatbot() {
    document.getElementById("chatbot").style.display = "none";
}

async function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const userInput = inputField.value.trim();
    const chatMessages = document.getElementById('chat-messages');

    if (!userInput) return; // Don't send empty messages

    // Show user message
    const userMessage = document.createElement('div');
    userMessage.className = "user-message chat-message";
    userMessage.textContent = userInput;
    chatMessages.appendChild(userMessage);

    // Clear input field
    inputField.value = '';

    // Show loading message
    const botLoading = document.createElement('div');
    botLoading.className = "bot-message chat-message";
    botLoading.textContent = "Thinking...";
    chatMessages.appendChild(botLoading);

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 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',  // Replace with your API key
                'HTTP-Referer': 'https://www.sitename.com',
                'X-Title': 'SiteName',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1:free',
                messages: [{ role: 'user', content: userInput }],
            }),
        });

        const data = await response.json();
        const botMessageText = data.choices?.[0]?.message?.content || "I didn't understand that.";

        // Remove loading message
        chatMessages.removeChild(botLoading);

        // Show bot response
        const botMessage = document.createElement('div');
        botMessage.className = "bot-message chat-message";
        botMessage.textContent = botMessageText;
        chatMessages.appendChild(botMessage);
    } catch (error) {
        // Remove loading message
        chatMessages.removeChild(botLoading);

        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = "bot-message chat-message";
        errorMessage.textContent = "Error: " + error.message;
        chatMessages.appendChild(errorMessage);
    }

    // Auto-scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* 🚀 Listen for "Enter" key to send message */
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents new line in input
        sendMessage();
    }
});



