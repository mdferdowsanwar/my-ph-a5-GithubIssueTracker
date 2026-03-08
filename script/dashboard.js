//All Issues
let allIssues = [];

// All Button
let currentTab = "all";

// Containers Button
const allIssueContainer = document.getElementById("all-issue-container");
const openIssueContainer = document.getElementById("open-issue-container");
const closedIssueContainer = document.getElementById("closed-issue-container");

// Loading Spinner
const loadingSpinner = document.getElementById("loadingSpinner");

// Total Count
const totalCount = document.getElementById("total-issue");

// Modal Elements
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
  // allIssueContainer.innerHTML = "";
}

// Reusable Loading Spinner
function hideLoadingSpinner() {
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
}

// Tab/Button Switch
function switchTab(tab){
  
  currentTab = tab;

  const tabs = ['all', 'open', 'closed'];
  
  for(const t of tabs){
    const tabBtn = document.getElementById("tab-"+ t);
    
      if(t === tab){
        tabBtn.classList.add("active");
      } else {
        tabBtn.classList.remove("active");
      }
  }

  allIssueContainer.classList.add("hidden");
  openIssueContainer.classList.add("hidden");
  closedIssueContainer.classList.add("hidden");

  if(tab === "all"){
      allIssueContainer.classList.remove("hidden");
      totalCount.textContent = `${allIssues.length} Issues`;
    } else if (tab === "open") {
      openIssueContainer.classList.remove("hidden");
      const openIssues = allIssues.filter(issue => issue.status === "open");
      totalCount.textContent = `${openIssues.length} Issues`;
    } else {
      closedIssueContainer.classList.remove("hidden");
      const closedIssues = allIssues.filter(issue => issue.status === "closed");
      totalCount.textContent = `${closedIssues.length} Issues`;
    }
}
// SwitchTab Function Call
switchTab(currentTab);

// Create Issue Card
function createIssueCard(issue){
  const issueCard = document.createElement("div");
  issueCard.className = `bg-white p-5 rounded-xl ${issue.status === "open" ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"}`;
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
  return issueCard;
}

// Display all issues
function displayAllIssues(issues) {
    // All Issues Total Count
    totalCount.textContent = `${issues.length} Issues`;
    
    allIssueContainer.innerHTML = "";

    if(issues.length === 0){
      allIssueContainer.innerHTML = `
        <div class="p-8">
          <h3 class="text-2xl font-bold text-red-500">No Issue Found.</h3>
        </div> 
      `;
      return;
    }

    issues.forEach(issue => {
        const card = createIssueCard(issue);
        allIssueContainer.appendChild(card);
    });
}

// Display Open Issues
function displayOpenIssues(issues){
  openIssueContainer.innerHTML = "";
  const openIssues = issues.filter(issue => issue.status === "open");
  openIssues.forEach(issue => {
    const card = createIssueCard(issue);
    openIssueContainer.appendChild(card);
  });
}

// Display Closed Issues
function displayClosedIssues(issues){
  closedIssueContainer.innerHTML = "";
  const closedIssues = issues.filter(issue => issue.status === "closed");
  closedIssues.forEach(issue => {
    const card = createIssueCard(issue);
    closedIssueContainer.appendChild(card);
  });
}

// Load All Issues and Display
async function loadAllIssues() {
    showLoadingSpinner();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await response.json();
    allIssues = issues.data;
    displayAllIssues(allIssues);
    displayOpenIssues(allIssues);
    displayClosedIssues(allIssues);

    hideLoadingSpinner();
    switchTab(currentTab);
}

// Tree details modal (5) start
async function openIssueModal(issueId) {
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
  const issue = await response.json();
  const issueDetails = issue.data;
  
  issueTitleModal.textContent  = issueDetails.title;
  issueDescriptionModal.textContent  = issueDetails.description;
  issueStatusModal.textContent = issueDetails.status;

  if(issueDetails.status === "open"){
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

// Search Functionality
document.getElementById("btn-search").addEventListener("click", async () => {
//     // removeActive();
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim().toLowerCase();

    if(!inputValue) return;

    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`);
    const data = await response.json();
    const issues = data.data;

    displayAllIssues(issues);
});


// Call load all issues function initially
loadAllIssues();