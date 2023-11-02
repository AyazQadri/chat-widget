// Define the API URL
const apiUrl = "http://192.168.100.166:8000";

// Simulating useState
function useState(initialValue) {
    let state = initialValue;

    function setState(newValue) {
        state = newValue;
    }

    return [state, setState];
}

// Simulating useEffect
function useEffect(callback, dependencies) {
    let hasChanged = true; // Flag to check if dependencies changed

    // Check if any dependency has changed
    dependencies.forEach((dependency) => {
        if (dependency !== window[dependency]) {
            hasChanged = true;
            window[dependency] = dependency;
        }
    });

    if (hasChanged) {
        // Execute the callback function
        callback();
    }
}

// Simulate an API call
function callAPI(url, method, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Check user registration status when the page loads
window.addEventListener("load", () => {
    callAPI(apiUrl + "/checkRegistration", "GET")
        .then((response) => {
            if (response.isRegistered) {
                // User is registered, initialize the chat
                initializeChat();
            } else {
                // User is not registered, show the pre-chat form
                preChatFormContainer.style.display = "block";
            }
        })
        .catch((error) => {
            console.error("API Error:", error);
            // Handle the error as needed
        });
});

// Create and style the chat button
const chatButton = document.createElement("div");
chatButton.id = "chat-button";
chatButton.style.position = "fixed";
chatButton.style.bottom = "20px";
chatButton.style.right = "20px";
chatButton.style.backgroundColor = "#F4F1F3";
chatButton.style.color = "#4593F7";
chatButton.style.fontWeight = "600";
chatButton.style.padding = "10px 20px";
chatButton.style.border = "none";
chatButton.style.borderRadius = "30px";
chatButton.style.cursor = "pointer";
chatButton.style.zIndex = "50";
chatButton.style.display = "flex";
chatButton.style.alignItems = "center";
chatButton.style.justifyContent = "center";

// Chat icon created
// const chatIcon = document.createElement("div");
// chatIcon.innerHTML = "&#128172;";
// chatIcon.style.fontSize = "20px";
// chatIcon.style.paddingRight = "10px";
const chatIconMain = document.createElement("div");
chatIconMain.style.height = "20px";
chatIconMain.style.width = "20px";
chatIconMain.style.marginRight = "10px";

const chatIcon = document.createElement("img");
chatIcon.style.height = "100%";
chatIcon.style.width = "100%";
chatIcon.src = "../Images/chatIcon.png";
chatIcon.alt = "";

// Text for "Chat with us"
const chatText = document.createElement("div");
chatText.textContent = "Chat with us";

// Append the chat icon and text to the chat button
chatIconMain.appendChild(chatIcon);
chatButton.appendChild(chatIconMain);
chatButton.appendChild(chatText);

// Append the chat button to the document body
document.body.appendChild(chatButton);

// Create the close button for the chat form
const closeButton = document.createElement("div");
closeButton.innerHTML = "&#10006;";

// Style the close button
closeButton.style.position = "absolute";
closeButton.style.bottom = "20px";
closeButton.style.right = "20px";
closeButton.style.fontSize = "20px";
closeButton.style.cursor = "pointer";
closeButton.style.position = "fixed";
closeButton.style.bottom = "20px";
closeButton.style.right = "20px";
closeButton.style.color = "#4593F7";
closeButton.style.height = "50px";
closeButton.style.width = "50px";
closeButton.style.borderRadius = "50%";
closeButton.style.display = "none";
closeButton.style.justifyContent = "center";
closeButton.style.alignItems = "center";
closeButton.style.backgroundColor = "#F4F1F3";

document.body.appendChild(closeButton);

// Create the pre-chat form container
const preChatFormContainer = document.createElement("div");
preChatFormContainer.id = "chat-container";
preChatFormContainer.style.position = "fixed";
preChatFormContainer.style.bottom = "90px";
preChatFormContainer.style.right = "30px";
preChatFormContainer.style.backgroundColor = "#F4F1F3";
preChatFormContainer.style.border = "1px solid #ccc";
preChatFormContainer.style.borderRadius = "15px";
preChatFormContainer.style.zIndex = "999";
preChatFormContainer.style.display = "none";
preChatFormContainer.style.width = "350px";
preChatFormContainer.style.height = "420px";
preChatFormContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

// Create the header for the pre-chat form
const preChatFormHeader = document.createElement("div");
preChatFormHeader.style.backgroundColor = "white";
preChatFormHeader.style.padding = "15px 15px";
preChatFormHeader.style.marginBottom = "15px";
preChatFormHeader.style.borderTopLeftRadius = "15px";
preChatFormHeader.style.borderTopRightRadius = "15px";

// Pre Chat Form Header Title
const preChatFormHeaderTitle = document.createElement("div");
preChatFormHeaderTitle.textContent = "Hello there 👋";
preChatFormHeaderTitle.style.fontSize = "20px";
preChatFormHeaderTitle.style.color = "black";

//  pre chat form sub title
const preChatFormSubtitle = document.createElement("div");
preChatFormSubtitle.textContent =
    "We are here to help you with your questions. Ask us anything, or share your feedback.";
preChatFormSubtitle.style.fontSize = "14px";
preChatFormSubtitle.style.marginTop = "15px";
preChatFormSubtitle.style.color = "grey";

// append the pre chat form
preChatFormHeader.appendChild(preChatFormHeaderTitle);
preChatFormHeader.appendChild(preChatFormSubtitle);
preChatFormContainer.appendChild(preChatFormHeader);

// Create the pre-chat form
const preChatForm = document.createElement("div");
preChatForm.id = "chat-form";
preChatForm.style.padding = "20px";

// Create input fields for the pre-chat form
const firstNameInput = createInput("text", "First Name", true);
const lastNameInput = createInput("text", "Last Name", true);
const emailInput = createInput("text", "Email", true);
const phoneInput = createInput("tel", "Phone", true);

// Style the input fields
firstNameInput.style.width = "100%";
lastNameInput.style.width = "100%";
emailInput.style.width = "100%";
phoneInput.style.width = "100%";

// Center the form within the container
preChatForm.style.display = "flex";
preChatForm.style.flexDirection = "column";
preChatForm.style.alignItems = "center";

// Create the submit button for the pre-chat form
const submitButton = document.createElement("button");
submitButton.id = "submit";
submitButton.textContent = "Submit";
submitButton.style.marginTop = "30px";
submitButton.style.width = "100%";
submitButton.style.padding = "10px";
submitButton.style.backgroundColor = "#CCCCCC";
submitButton.style.color = "darkgrey";
submitButton.style.border = "1px solid #CCCCCC";
submitButton.style.borderRadius = "10px";
submitButton.style.cursor = "pointer";
submitButton.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";

// Add event listener for submitting the pre-chat form
submitButton.addEventListener("click", submitPreChatForm);

// Append input fields and submit button to the pre-chat form
preChatForm.appendChild(firstNameInput);
preChatForm.appendChild(lastNameInput);
preChatForm.appendChild(emailInput);
preChatForm.appendChild(phoneInput);
preChatForm.appendChild(submitButton);

// Append the pre-chat form to the preChatFormContainer
preChatFormContainer.appendChild(preChatForm);

// Append the preChatFormContainer to the document body
document.body.appendChild(preChatFormContainer);

let chatFormOpened = false; // Track the chat form state
let preChatFormCompleted = false; // Track whether the pre-chat form was completed

// Function to toggle the chat form and "Chat with us" button
function toggleChatForm() {
    if (chatFormOpened) {
        chatContainer.style.display = "none";
        chatButton.style.display = "flex";
        closeButton.style.display = "none";
        chatFormOpened = false;
    } else if (preChatFormCompleted) {
        chatContainer.style.display = "block";
        chatButton.style.display = "none";
        closeButton.style.display = "flex";
        chatFormOpened = true;
    } else {
        preChatFormContainer.style.display = "block";
        chatButton.style.display = "none";
        closeButton.style.display = "flex";
        chatFormOpened = false;
    }
}

// Toggle the forms on chat button click
closeButton.addEventListener("click", toggleChatForm);
chatButton.addEventListener("click", toggleChatForm);

// Function to create input fields
function createInput(type, placeholder, required) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    if (required) {
        input.required = true;
    }
    input.addEventListener("input", checkInputFieldsAsEmpty);
    input.style.marginBottom = "10px";
    input.style.padding = "10px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "5px";
    return input;
}

// Function to toggle the submit button
function checkInputFieldsAsEmpty() {
    const firstName = firstNameInput?.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Check if all input fields have values (non-empty)
    const allFieldsNotEmpty = firstName && lastName && email && phone;

    if (allFieldsNotEmpty) {
        // Enable the submit button
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "#4593F7";
        submitButton.style.color = "white";
    } else {
        // Disable the submit button
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "#CCCCCC";
        submitButton.style.color = "darkgrey";
    }
}

// Add an input event listener to all input fields to trigger the check
firstNameInput.addEventListener("input", checkInputFieldsAsEmpty);
lastNameInput.addEventListener("input", checkInputFieldsAsEmpty);
emailInput.addEventListener("input", checkInputFieldsAsEmpty);
phoneInput.addEventListener("input", checkInputFieldsAsEmpty);

// Initial check to disable the button on page load
checkInputFieldsAsEmpty();

// Function to submit the pre-chat form
function submitPreChatForm() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!firstName || !lastName || !email || !phone) {
        alert("Please fill out all required fields before submitting.");
        return;
    }
    const formData = {
        firstName,
        lastName,
        email,
        phone,
    };

    // After form submission, show the chat container and hide the pre-chat form
    chatContainer.style.display = "block";
    preChatFormContainer.style.display = "none";
    chatFormOpened = true;
    preChatFormCompleted = true;

    // Initialize the chat and create the chat container
    initializeChat();
    // Simulate an API call to send the form data to the server
    callAPI(apiUrl, "POST", formData)
        .then((response) => {
            console.log("API Response:", response);
            // After the API call is successful, initialize the chat
            initializeChat();
        })
        .catch((error) => {
            console.error("API Error:", error);
        });
}

// Create the chat container
const chatContainer = document.createElement("div");
chatContainer.id = "chat-container";
chatContainer.style.position = "fixed";
chatContainer.style.bottom = "90px";
chatContainer.style.right = "30px";
chatContainer.style.backgroundColor = "#F4F1F3";
chatContainer.style.border = "1px solid #4593F7";
chatContainer.style.borderRadius = "15px";
chatContainer.style.zIndex = "999";
chatContainer.style.width = "350px";
chatContainer.style.height = "60%";
chatContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1";

// Create the header for the chat container
const chatHeader = document.createElement("div");
chatHeader.style.backgroundColor = "#F4F1F3";
chatHeader.style.color = "black";
chatHeader.style.padding = "15px 15px";
chatHeader.style.borderTopLeftRadius = "15px";
chatHeader.style.borderTopRightRadius = "15px";

// Chat Header Title
const chatHeaderTitle = document.createElement("div");
chatHeaderTitle.textContent = "Chat with Us 👋";
chatHeaderTitle.style.fontSize = "20px";
chatHeaderTitle.style.color = "black";

chatHeader.appendChild(chatHeaderTitle);
chatContainer.appendChild(chatHeader);

// Create the chat messages container with a scrollable view
const chatMessagesContainer = document.createElement("div");
chatMessagesContainer.id = "chat-messages-container";
chatMessagesContainer.style.overflowY = "auto";
chatMessagesContainer.style.height = "70%";
chatMessagesContainer.style.padding = "10px";
chatMessagesContainer.style.borderBottom = "1px solid #ccc";
chatMessagesContainer.style.backgroundColor = "white";

chatContainer.appendChild(chatMessagesContainer);

// Create a row for the input field and send button
const inputRow = document.createElement("div");
inputRow.style.display = "flex";
inputRow.style.margin = "15px";
inputRow.style.justifyContent = "space-between";

// Create chat input
const chatInput = createInput("text", "Type your message...", true);
chatInput.id = "chat-input";
chatInput.style.width = "75%";

// Create send button
const sendButton = document.createElement("button");
sendButton.style.width = "35px";
sendButton.style.height = "35px";
sendButton.style.backgroundColor = "white";
sendButton.style.borderRadius = "5px";
sendButton.style.cursor = "pointer";
sendButton.style.border = "1px solid #ccc";
sendButton.style.display = "flex";
sendButton.style.justifyContent = "center";
sendButton.style.alignItems = "center";

// Create and style the send icon
const sendIcon = document.createElement("img");
sendIcon.src = "../Images/sendIcon.png";
sendIcon.alt = "Send";

sendIcon.style.maxWidth = "70%";
sendIcon.style.maxHeight = "70%";

sendButton.appendChild(sendIcon);

// Add event listener for sending messages
sendButton.addEventListener("click", sendMessage);

inputRow.appendChild(chatInput);
inputRow.appendChild(sendButton);
chatContainer.appendChild(inputRow);

// Function to initialize the chat
function initializeChat() {
    // Hide the pre-chat form
    preChatFormContainer.style.display = "none";

    // Append the chat container to the document body
    document.body.appendChild(chatContainer);
}

// Function to send a message
function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const messageText = chatInput.value.trim();

    if (messageText) {
        // Create a message element and append it to the chat messages container
        const messageElementMain = document.createElement("div");
        messageElementMain.style.display = "flex";
        const messageElement = document.createElement("div");
        messageElement.textContent = messageText;
        messageElement.style.margin = "10px";
        messageElement.style.padding = "15px 10px";
        messageElement.style.color = "#FFFFFF";
        messageElement.style.textAlign = "right";
        messageElement.style.maxWidth = "75%";
        messageElement.style.fontSize = "14px";

        // Common styles for both sender and receiver messages
        messageElement.style.display = "flex";
        messageElement.style.justifyContent = "flex-end";
        messageElement.style.borderTopRightRadius = "15px";
        messageElement.style.borderTopLeftRadius = "15px";
        messageElement.style.borderBottomLeftRadius = "15px";

        // Sender message styles
        messageElement.style.backgroundColor = "#4593F7";

        // Add margin to the right to indent the sender message
        messageElement.style.marginLeft = "auto";

        const chatMessagesContainer = document.getElementById(
            "chat-messages-container"
        );
        messageElementMain.appendChild(messageElement);
        chatMessagesContainer.appendChild(messageElementMain);

        // Clear the input field
        chatInput.value = "";
        chatInput.focus();

        // Simulate a response (you can replace this with actual responses from the server)
        setTimeout(() => {
            // Create the opponent message container
            const opponentElementMain = document.createElement("div");
            opponentElementMain.style.display = "flex";
            // opponentElementMain.style.justifyContent = "space-evenly";

            // Image container for opponent
            const opponentElementImage = document.createElement("div");
            opponentElementImage.style.height = "30px";
            opponentElementImage.style.width = "30px";
            opponentElementImage.style.borderRadius = "50%";
            opponentElementImage.style.display = "flex";
            opponentElementImage.style.alignSelf = "flex-end";
            opponentElementImage.style.alignItems = "center";
            opponentElementImage.style.justifyContent = "center";
            opponentElementImage.style.marginBottom = "10px";

            const opponentChatIcon = document.createElement("img");
            opponentChatIcon.style.height = "100%";
            opponentChatIcon.style.width = "100%";
            opponentChatIcon.src = "../Images/chatIcon.png";
            opponentChatIcon.alt = "";

            opponentElementImage.appendChild(opponentChatIcon);

            // Text message for opponent
            const opponentElementText = document.createElement("div");
            opponentElementText.textContent = "This is the ";
            opponentElementText.style.marginTop = "10px";
            opponentElementText.style.marginBottom = "10px";
            opponentElementText.style.marginLeft = "10px";
            opponentElementText.style.padding = "15px 10px";
            opponentElementText.style.color = "grey";
            opponentElementText.style.maxWidth = "75%";
            opponentElementText.style.fontSize = "14px";

            // Common styles for both sender and receiver messages
            opponentElementText.style.textAlign = "left";
            opponentElementText.style.backgroundColor = "#F4F1F3";
            opponentElementText.style.borderTopRightRadius = "15px";
            opponentElementText.style.borderTopLeftRadius = "15px";
            opponentElementText.style.borderBottomRightRadius = "15px";

            // Add margin to the left to indent the opponent message
            opponentElementMain.style.marginRight = "auto";

            opponentElementMain.appendChild(opponentElementImage);
            opponentElementMain.appendChild(opponentElementText);
            chatMessagesContainer.appendChild(opponentElementMain);

            // Scroll to the bottom of the chat messages
            chatMessagesContainer.scrollTop =
                chatMessagesContainer.scrollHeight;
        }, 1000);
    }
}

// Add event listener for sending messages on Enter key press
chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Add an event listener to the submit button to initialize the chat
submitButton.addEventListener("click", sendMessage);
