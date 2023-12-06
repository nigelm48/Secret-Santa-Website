let numberOfNamesInput = document.getElementById("numberOfNames");

function collectNames() {
    let numberOfNames = parseInt(numberOfNamesInput.value);
    if (isNaN(numberOfNames) || numberOfNames <= 0) {
      alert("Please enter a valid number greater than 0.");
      return;
    }
  
    let nameInputsContainer = document.getElementById("nameInputs");
    // Clear existing content before adding new input fields
    nameInputsContainer.innerHTML = "";
    
    let nameInputsHTML = "";
    for (let i = 1; i <= numberOfNames; i++) {
      nameInputsHTML += `<input type="text" placeholder="Enter name ${i}" class="player-input"><br>`;
    }
  
    nameInputsContainer.innerHTML = nameInputsHTML;

    // Add a "Submit Names" button after creating the input fields
    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit Names";
    submitButton.addEventListener("click", submitNames);
    nameInputsContainer.appendChild(submitButton);
}

function submitNames() {
    let nameInputs = document.querySelectorAll("#nameInputs input");
    let names = Array.from(nameInputs).map(input => input.value);

    // Shuffle the array to randomize the pairing
    let shuffledNames = shuffleArray(names.slice());

    let nameInputsContainer = document.getElementById("nameInputs");
    nameInputsContainer.innerHTML = ""; // Clear the existing content

    shuffledNames.forEach((name, index) => {
        // Find a name other than the current one (excluding themselves)
        let recipient = findRecipient(name, shuffledNames);

        // Generate unique links for each player
        let link = generateUniqueLink(name, recipient);

        // Create a paragraph element to display the player's name, recipient, and link
        let playerInfo = document.createElement("p");
        playerInfo.innerHTML = `<strong>${name}</strong> is the Secret Santa for: <strong>${recipient}</strong>. Link: <a href="${link}" target="_blank">${link}</a>`;

        // Append the paragraph element to the container
        nameInputsContainer.appendChild(playerInfo);
    });
}

function findRecipient(currentName, names) {
    // Filter out the current name
    let potentialRecipients = names.filter(name => name !== currentName);

    // Randomly choose a recipient from the remaining names
    let recipient = potentialRecipients[Math.floor(Math.random() * potentialRecipients.length)];

    return recipient;
}

// Function to generate a unique link based on the player's name and recipient's name
function generateUniqueLink(playerName, recipientName) {
    let uniqueIdentifier = generateUUID();
    let relativePath = `${playerName.toLowerCase().replace(/\s/g, '-')}-${recipientName.toLowerCase().replace(/\s/g, '-')}-${uniqueIdentifier}`;
    let netlifyDomain = 'https://gleeful-kulfi-bb3502.netlify.app/';
    return `${netlifyDomain}${relativePath}`;
}

// Function to generate a UUID (Universally Unique Identifier)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function handleSecretLinkClick(event) {
    event.preventDefault();

    // Get the target unique link from the data-target attribute
    let targetLink = event.target.dataset.target;

    // Extract player information from the link
    let linkParts = targetLink.split('/');
    let playerName = decodeURIComponent(linkParts[1]); // Decode the player name
    let phoneNumber = linkParts[2];

    // Display the Secret Santa recipient information on the page
    let recipientInfo = document.getElementById('recipientInfo');
    recipientInfo.innerHTML = `You are the Secret Santa for: <strong>${playerName}</strong>`;

    // Optionally, you can also redirect the user to a new page or show a modal with the information
    // window.location.href = targetLink; // Uncomment this line to redirect to the link
}

