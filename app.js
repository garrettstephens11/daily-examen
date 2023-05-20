// Define the prompts
const prompts = [
    "Gratitude: Take a few moments to quiet your mind and invite the presence of God. Recall the blessings of the day, no matter how big or small. Where did you encounter joy, love, peace, or hope? For each of these moments, say a simple 'Thank you.'",
    "Review: Review the day as if you were watching a movie. Play back the scenes of your day, from morning till now. Don't rush—allow the details to surface in your memory. Notice where you felt God's presence or where you acted in ways that aligned with your deepest values.",
    "Response: Reflect on your emotions throughout the day. When did you feel most alive? When did you feel drained? When did you love, and when were you unloving? Where were you cooperating with God, and where were you resisting? Confess any wrongdoings and ask for God's forgiveness and help.",
    "Resolve: Look forward to tomorrow. Ask God to show you what might be coming, or what He might be inviting you into. Ask for His guidance, wisdom, and discernment.",
    "Rest: End with a moment of rest. Simply rest in God's love for you, trusting in His care for you."
];

let currentPromptIndex = 0;

// Get elements from the DOM
const promptContainer = document.getElementById('prompt-container');
const nextButton = document.getElementById('next-button');
const viewLogButton = document.getElementById('view-log-button');
const logContainer = document.getElementById('log-container');

// Hide the "View Daily Examen Log" button initially
viewLogButton.style.display = 'none';

// Initialize the app
initialize();

function initialize() {
    // Load today's responses
    const today = new Date().toISOString().slice(0,10);
    let todayResponses = JSON.parse(localStorage.getItem(today)) || [];

    // Render the current prompt and response
    renderPrompt();

    // Add event listeners
    nextButton.addEventListener('click', function() {
        // Save response
        const response = promptContainer.querySelector('input').value;
        todayResponses[currentPromptIndex] = response;
        localStorage.setItem(today, JSON.stringify(todayResponses));

        // Move to the next prompt
        currentPromptIndex++;
        if (currentPromptIndex < prompts.length) {
            renderPrompt();
        } else {
            nextButton.setAttribute('disabled', 'disabled');
            viewLogButton.style.display = 'inline-block'; // Show the "View Daily Examen Log" button
        }
    });

    viewLogButton.addEventListener('click', function() {
        viewLog();
    });
}

function renderPrompt() {
    promptContainer.innerHTML = '';
    const prompt = document.createElement('p');
    prompt.textContent = prompts[currentPromptIndex];
    promptContainer.appendChild(prompt);
    const input = document.createElement('input');
    input.type = 'text';
    promptContainer.appendChild(input);
    nextButton.removeAttribute('disabled');
}

function viewLog() {
    logContainer.innerHTML = '';
    const entries = Object.keys(localStorage).sort().reverse();
    for (let entry of entries) {
        const responses = JSON.parse(localStorage.getItem(entry));
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = entry;
        logContainer.appendChild(dateHeader);
        for (let i = 0; i < responses.length; i++) {
            const responseParagraph = document.createElement('p');
            responseParagraph.textContent = (i + 1) + '. ' + responses[i];
            logContainer.appendChild(responseParagraph);
        }
    }
    logContainer.style.display = 'block';
}
