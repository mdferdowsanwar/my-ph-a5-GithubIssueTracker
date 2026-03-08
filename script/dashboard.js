// Load All Issues and Display
const allIssueContainer = document.getElementById("all-issue-container");

// Loading Spinner
const loadingSpinner = document.getElementById("loadingSpinner");

// Total Count
const totalCount = document.getElementById("total-issue");


// Tree details modal (5)
const issueDetailsModal = document.getElementById("issue_details_modal");
const issueTitleModal = document.getElementById("issueTitle");
const issueStatusModal = document.getElementById("issueStatus");
const issueAuthorModal = document.getElementById("issueAuthor");
const issueDateModal = document.getElementById("issueDate");
const issueDescriptionModal = document.getElementById("issueDescription");
const issueAssigneeModal = document.getElementById("issueAssignee");
const issuePriorityModal = document.getElementById("issuePriority");
const issueLabelsModal = document.getElementById("issueLabels");

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
    
    totalCount.textContent = `${issues.length} Issues`;
    
    allIssueContainer.innerHTML = "";

    if(issues.length === 0){
      allIssueContainer.innerHTML = `
        <div class="p-8">
          <h3 class="text-2xl font-bold text-red-500">No Issue Found.</h3>
        </div> 
      `;
    }

    issues.forEach(issue => {
        const issueCard = document.createElement("div");
        issueCard.className = `bg-white p-5 rounded-xl ${issue.status === 'open' ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"}`;
        issueCard.innerHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <img src="${issue.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed-Status.png" }" alt="">
                <span class="badge ${issue.priority === 'high' ? "badge-error" : issue.priority === 'medium' ? "badge-warning" : "badge-neutral" } rounded-full">${issue.priority}</span>
            </div>
            <h3 onclick="openIssueModal(${issue.id})" class="cursor-pointer text-xl font-semibold">${issue.title}</h3>
            <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
            <div class="flex gap-1 flex-wrap">
                ${issue.labels.map(label => `<span class="badge badge-info rounded-full text-xs">${label}</span>`).join(" ")}
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

// Tree details modal (5) start
async function openIssueModal(issueId) {
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
  const issue = await response.json();
  const issueDetails = issue.data;
  
  issueTitleModal.textContent  = issueDetails.title;
  issueDescriptionModal.textContent  = issueDetails.description;
  issueStatusModal.textContent = issueDetails.status;
  if(issueStatusModal.textContent === "open"){
    issueStatusModal.classList.add("badge-success");
    issueStatusModal.classList.remove("badge-neutral");
  } else {
    issueStatusModal.classList.add("badge-neutral");
    issueStatusModal.classList.remove("badge-success");
  }
  issueAuthorModal.textContent = issueDetails.author;
  issueDateModal.textContent = issueDetails.createdAt;
  issueAssigneeModal.textContent = issueDetails.assignee;
  issuePriorityModal.textContent = issueDetails.priority;
  issueLabelsModal.innerHTML = issueDetails.labels.map(label => `<span class="badge badge-info rounded-full text-xs">${label}</span>`).join(" ");
  
  issueDetailsModal.showModal();
}


// Call load all issues function
loadAllIssues();

// Search Functionality
document.getElementById("btn-search").addEventListener("click", async () => {
//     // removeActive();
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim().toLowerCase();

    if(!inputValue) return;

    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`);
    const data = await response.json();
    const allIssue = data.data;
    displayAllIssues(allIssue);
});