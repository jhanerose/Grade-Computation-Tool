document.getElementById('grade-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const prelimGrade = parseFloat(document.getElementById('prelim-grade').value);
    const targetGrade = 75;  // Target passing grade
    const deansListerGrade = 90;

    const prelimWeight = 0.20;
    const midtermWeight = 0.30;
    const finalWeight = 0.50;

    // Input validation
    if (isNaN(prelimGrade) || prelimGrade < 0 || prelimGrade > 100) {
        alert("Please enter a valid prelim grade (0-100).");
        return;
    }

    // Calculate current total and required totals
    const currentTotal = prelimGrade * prelimWeight;
    const requiredTotal = targetGrade - currentTotal;

    let requiredMidtermGrade;
    let requiredFinalGrade;
    let passMessage;
    let passMessageColor;

    if (requiredTotal > 0) {
        requiredFinalGrade = (requiredTotal - (midtermWeight * 100)) / finalWeight;

        if (requiredFinalGrade > 100) {
            requiredMidtermGrade = (requiredTotal - (finalWeight * 100)) / midtermWeight;
            requiredFinalGrade = 100;  // Cap final grade to 100
        } else {
            requiredMidtermGrade = requiredTotal / (midtermWeight + finalWeight);
        }

        if (requiredMidtermGrade > 90 || requiredFinalGrade > 90) {
            passMessage = "It is difficult to pass, as the required grades are very high.";
            passMessageColor = "red";
        } else {
            passMessage = "You have a chance to pass!";
            passMessageColor = "lightgreen";
        }
    } else {
        requiredMidtermGrade = 0;
        requiredFinalGrade = 0;
        passMessage = "Your current grade is high enough to pass!";
        passMessageColor = "lightblue";
    }

    // Dean's Lister calculations
    let deanMessage;
    let deansMessageColor;
    if (prelimGrade >= deansListerGrade) {
        deanMessage = "You already qualify for Dean's Lister based on your Prelim grade!";
        deansMessageColor = "lightgreen";
    } else {
        const requiredDeanMidterm = (deansListerGrade - currentTotal) / midtermWeight;
        const requiredDeanFinal = (deansListerGrade - currentTotal) / finalWeight;
        deanMessage = `The required grade for you to be a Dean’s Lister is ${requiredDeanMidterm.toFixed(2)} (Midterm) and ${requiredDeanFinal.toFixed(2)} (Finals).`;
        deansMessageColor = "orange";
    }

    // Display results
    displayResults(requiredMidtermGrade, requiredFinalGrade, passMessage, passMessageColor, deanMessage, deansMessageColor);

    // Function to display results
    function displayResults(midterm, final, message, messageColor, deanMsg, deanColor) {
        document.getElementById('midterm-result').textContent = `Required Midterm Grade: ${midterm.toFixed(2)}`;
        document.getElementById('final-result').textContent = `Required Final Grade: ${final.toFixed(2)}`;
        document.getElementById('pass-message').textContent = message;
        document.getElementById('pass-message').style.color = messageColor;
        document.getElementById('dean-result').textContent = deanMsg;
        document.getElementById('dean-result').style.color = deanColor;
        document.getElementById('results').classList.remove('hidden');
    }
});


// Enderpearl animation effect
let container = document.getElementById('container2');
let count = 50;
for (let i = 0; i < count; i++) {
    let leftEnderpearl = Math.floor(Math.random() * container.clientWidth);
    let topEnderpearl = Math.floor(Math.random() * container.clientHeight);
    let widthEnderpearl = Math.floor(Math.random() * 50);
    let timeEnderpearl = Math.floor((Math.random() * 5) + 5);
    let blurEnderpearl = Math.floor(Math.random() * 10);

    let div = document.createElement('div');
    div.classList.add('enderpearl');
    div.style.position = 'absolute';
    div.style.left = leftEnderpearl + 'px';
    div.style.top = topEnderpearl + 'px';
    div.style.width = widthEnderpearl + 'px';
    div.style.height = widthEnderpearl + 'px';
    div.style.animationDuration = timeEnderpearl + 's';
    div.style.filter = "blur(" + blurEnderpearl + "px)";

    container.appendChild(div);
}
