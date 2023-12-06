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

// Function to generate a unique link based on the player's name
function generateUniqueLink(playerName) {
    // Use some method to generate a unique identifier, such as a timestamp
    let uniqueIdentifier = Date.now();
    // Concatenate the player's name and the unique identifier to create a relative path
    let relativePath = `${playerName.toLowerCase().replace(/\s/g, '-')}-${uniqueIdentifier}`;
    return relativePath;
}

function submitNames() {
    let nameInputs = document.querySelectorAll("#nameInputs input");
    let names = Array.from(nameInputs).map(input => input.value);

    let nameInputsContainer = document.getElementById("nameInputs");
    nameInputsContainer.innerHTML = ""; // Clear the existing content

    names.forEach((name, index) => {
        // Generate a unique link for each player
        let uniqueLink = generateUniqueLink(name);
        
        // Create a paragraph element to display the player's name and link
        let playerInfo = document.createElement("p");
        playerInfo.innerHTML = `<strong>${name}</strong>: <a href="#" data-target="${uniqueLink}" class="secret-link">${uniqueLink}</a>`;
        
        // Append the paragraph element to the container
        nameInputsContainer.appendChild(playerInfo);
    });

    // Add event listener to all secret links
    let secretLinks = document.querySelectorAll(".secret-link");
    secretLinks.forEach(link => {
        link.addEventListener("click", handleSecretLinkClick);
    });
}

function handleSecretLinkClick(event) {
    event.preventDefault();

    // Get the target unique link from the data-target attribute
    let targetLink = event.target.dataset.target;

    // Display the Secret Santa recipient information
    alert(`You are the Secret Santa for: ${targetLink}`);
}
