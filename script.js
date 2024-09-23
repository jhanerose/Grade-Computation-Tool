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

    // Calculate remaining grade after prelim
    const remainingGrade = targetGrade - (prelimWeight * prelimGrade);

    let requiredMidtermGrade;
    let requiredFinalGrade;
    let passMessage;
    let passMessageColor;

    if (remainingGrade > 0) {
        requiredFinalGrade = (remainingGrade - (midtermWeight * 100)) / finalWeight;

        if (requiredFinalGrade > 100) {
            requiredMidtermGrade = (remainingGrade - (finalWeight * 100)) / midtermWeight;
            if (requiredMidtermGrade < 0 || requiredMidtermGrade > 100) {
                passMessage = "It is difficult to pass.";
                passMessageColor = "red";
                displayResults(null, null, passMessage, passMessageColor, "", "");
                return;
            }
            requiredFinalGrade = 100;  // Cap final grade to 100
            passMessage = "You have a chance to pass!";
            passMessageColor = "lightgreen";
        } else if (requiredFinalGrade < 0) {
            passMessage = "It is difficult to pass.";
            passMessageColor = "red";
            displayResults(null, null, passMessage, passMessageColor, "", "");
            return;
        } else {
            requiredMidtermGrade = 100;
            passMessage = "You have a chance to pass!";
            passMessageColor = "lightgreen";
        }
    } else {
        passMessage = "Your current grade is high enough to pass!";
        passMessageColor = "lightblue";
        requiredMidtermGrade = 0;
        requiredFinalGrade = 0;
    }

    // Dean's Lister calculations
    let deanMessage;
    let deansMessageColor;
    const deanMidtermGrade = (deansListerGrade - (prelimWeight * prelimGrade) - (finalWeight * 100)) / midtermWeight;
    const deanFinalGrade = (deansListerGrade - (prelimWeight * prelimGrade) - (midtermWeight * 100)) / finalWeight;

    if (deanMidtermGrade >= 0 && deanMidtermGrade <= 100 && deanFinalGrade >= 0 && deanFinalGrade <= 100) {
        deanMessage = `To be a Dean's Lister, you need Midterm: ${deanMidtermGrade.toFixed(2)} and Final: ${deanFinalGrade.toFixed(2)}.`;
        deansMessageColor = "orange";
    } else {
        deanMessage = "It is not possible to be a Dean's Lister with the current grades.";
        deansMessageColor = "red";
    }

    // Display results
    displayResults(requiredMidtermGrade, requiredFinalGrade, passMessage, passMessageColor, deanMessage, deansMessageColor);

    // Function to display results
    function displayResults(midterm, final, message, messageColor, deanMsg, deanColor) {
        document.getElementById('midterm-result').textContent = midterm !== null ? `Required Midterm Grade: ${midterm.toFixed(2)}` : '';
        document.getElementById('final-result').textContent = final !== null ? `Required Final Grade: ${final.toFixed(2)}` : '';
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
