// Load All Issues and Display
const allIssueContainer = document.getElementById("all-issue-container");
// Loading Spinner
const loadingSpinner = document.getElementById("loadingSpinner");


// Reusable Loading Spinner
function showLoadingSpinner() {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  allIssueContainer.innerHTML = "";
}
// Reusable Loading Spinner
function hideLoadingSpinner() {
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
}



// Load All Issues and Display
async function loadAllIssues() {
    showLoadingSpinner();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await response.json();
    displayAllIssues(issues.data);
    hideLoadingSpinner();
}

function displayAllIssues(issues) {
    issues.forEach(issue => {
        const issueCard = document.createElement("div");
        issueCard.className = `bg-white p-5 rounded-xl ${issue.status === 'open' ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"}`;
        issueCard.innerHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <img src="${issue.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed-Status.png" }" alt="">
                <span class="badge ${issue.priority === 'high' ? "badge-error" : issue.priority === 'medium' ? "badge-warning" : "badge-neutral" } rounded-full">${issue.priority}</span>
            </div>
            <h3 class="text-xl font-semibold">${issue.title}</h3>
            <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
            <div class="flex gap-1 flex-wrap">
                <span class="badge badge-error rounded-full text-xs">
                    <i class="fa-solid fa-bug"></i> Bug
                </span>
                <span class="badge badge-warning rounded-full text-xs">
                    <i class="fa-regular fa-life-ring"></i> Help Wanted
                </span>
            </div>
            <hr class="border-gray-300">
            <div class="text-[#64748B]">
                <p>${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
        </div>
        `;
        allIssueContainer.appendChild(issueCard);
    });
}
// Call load all issues function
loadAllIssues();