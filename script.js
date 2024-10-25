// Import Web3
let web3;

// Check if Web3 is injected (e.g., by MetaMask)
if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    console.log("Web3 detected");
} else {
    alert("Please install MetaMask to use this app!");
}

// Function to connect the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            console.log("Connected account:", accounts[0]);
            alert("Wallet connected!");
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Failed to connect wallet.");
        }
    }
}

document.getElementById("connect-wallet").addEventListener("click", connectWallet);
document.getElementById("create-poll").addEventListener("click", createPoll);
document.querySelectorAll(".vote-option").forEach(button => {
    button.addEventListener("click", castVote);
});

let connectedWallet = false;
let pollData = {
    question: "",
    options: ["", ""],
    votes: [0, 0]
};

function connectWallet() {
    connectedWallet = true;
    alert("Wallet connected! You can now create polls and vote.");
}

function createPoll() {
    if (!connectedWallet) {
        alert("Please connect your wallet first!");
        return;
    }
    pollData.question = document.getElementById("poll-question").value;
    pollData.options[0] = document.getElementById("poll-option-1").value;
    pollData.options[1] = document.getElementById("poll-option-2").value;
    
    document.getElementById("poll-question-display").innerText = pollData.question;
    alert("Poll created successfully!");
}

function castVote(event) {
    const option = event.target.getAttribute("data-option");
    pollData.votes[option - 1]++;
    displayResults();
}

function displayResults() {
    const totalVotes = pollData.votes[0] + pollData.votes[1];
    document.getElementById("result-display").innerText = `Total Votes: ${totalVotes}`;
}
