const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const examenSteps = [
    "The Examen is a technique of prayerful reflection on the events of the day to detect God's presence and discern His direction for us. It is traditionally performed at the end of the day but can be adapted to any time frame. Here's a simplified five-step version:\n\nGratitude: Take a few moments to quiet your mind and invite the presence of God. Recall the blessings of the day, no matter how big or small. Where did you encounter joy, love, peace, or hope? For each of these moments, say a simple 'Thank you.'",
    "Review: Review the day as if you were watching a movie. Play back the scenes of your day, from morning till now. Don't rush—allow the details to surface in your memory. Notice where you felt God's presence or where you acted in ways that aligned with your deepest values.",
    "Response: Reflect on your emotions throughout the day. When did you feel most alive? When did you feel drained? When did you love, and when were you unloving? Where were you cooperating with God, and where were you resisting? Confess any wrongdoings and ask for God's forgiveness and help.",
    "Resolve: Look forward to tomorrow. Ask God to show you what might be coming, or what He might be inviting you into. Ask for His guidance, wisdom, and discernment.",
    "Rest: End with a moment of rest. Simply rest in God's love for you, trusting in His care for you."
];

let currentStep = 0;

app.get('/start', (req, res) => {
    currentStep = 0;
    res.json({
        step: currentStep,
        prompt: examenSteps[currentStep]
    });
});

app.post('/submit', (req, res) => {
    const userResponse = req.body.response;
    // TODO: Save userResponse to the database or Google Doc...

    currentStep++;
    if (currentStep >= examenSteps.length) {
        res.json({
            finished: true,
            message: "You've completed the Examen. Your responses have been saved."
        });
    } else {
        res.json({
            step: currentStep,
            prompt: examenSteps[currentStep]
        });
    }
});
