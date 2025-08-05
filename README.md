# SirenFlasher
Ambulance Siren App turns your device into a lifelike ambulance warning system, complete with authentic Indian red‑and‑white flashing lights and a looping siren sound.
https://github.com/copilot/share/80604218-4b80-8060-9800-924b400d290a
@page "/approval-requests"
@using Syncfusion.Blazor.Navigations

<PageTitle>Approval Requests</PageTitle>

<div class="approval-container">
    <header class="page-header">
        <h1 class="page-title">Approval Requests</h1>
        <p class="page-subtitle">Review and process pending approval requests</p>
    </header>

    <div class="requests-grid">
        @if (approvalRequests != null && approvalRequests.Any())
        {
            @foreach (var request in approvalRequests)
            {
                <div class="request-card">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="request-number">@request.RequestNumber</h3>
                            <span class="status-badge status-@GetStatusClass(request.CurrentStatus)">
                                @request.CurrentStatus
                            </span>
                        </div>

                        <div class="card-details">
                            <div class="detail-item">
                                <span class="detail-label">Transfer Cycle:</span>
                                <span class="detail-value">@request.TransferCycle</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">High Level UBR:</span>
                                <span class="detail-value">@request.HighLevelUBR</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Next Approval Stage:</span>
                                <span class="detail-value">@request.NextApprovalStage</span>
                            </div>
                        </div>

                        @if (!request.IsProcessed)
                        {
                            <div class="action-buttons">
                                <button class="btn btn-accept" @onclick="() => AcceptRequest(request)">
                                    <span class="btn-icon">✓</span>
                                    Accept
                                </button>
                                <button class="btn btn-reject" @onclick="() => RejectRequest(request)">
                                    <span class="btn-icon">✗</span>
                                    Reject
                                </button>
                            </div>
                        }
                        else
                        {
                            <div class="processed-indicator">
                                <span class="processed-text">
                                    @(request.IsAccepted ? "✓ Accepted" : "✗ Rejected")
                                </span>
                            </div>
                        }
                    </div>

                    <div class="timeline-container">
                        <h4 class="timeline-title">Approval Progress</h4>
                        <SfTimeline CssClass="custom-timeline">
                            <TimelineItems>
                                @foreach (var stage in GetTimelineItems(request))
                                {
                                    <TimelineItem CssClass="@stage.CssClass">
                                        <Content>
                                            <div class="timeline-content">
                                                <span class="timeline-icon">@stage.Icon</span>
                                                <span class="timeline-text">@stage.Stage</span>
                                            </div>
                                        </Content>
                                    </TimelineItem>
                                }
                            </TimelineItems>
                        </SfTimeline>
                    </div>
                </div>
            }
        }
        else
        {
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No approval requests found</h3>
                <p>There are currently no pending approval requests to review.</p>
            </div>
        }
    </div>
</div>

<style>
/* Deutsche Bank Color Palette & Base Styles */
:root {
    --db-primary: #0018A8;
    --db-secondary: #001489;
    --db-accent: #00508F;
    --db-light-blue: #E6F3FF;
    --db-gray-50: #F8F9FA;
    --db-gray-100: #E9ECEF;
    --db-gray-200: #DEE2E6;
    --db-gray-300: #CED4DA;
    --db-gray-600: #6C757D;
    --db-gray-800: #343A40;
    --db-success: #28A745;
    --db-danger: #DC3545;
    --db-warning: #FFC107;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
    --border-radius: 8px;
    --transition: all 0.2s ease-in-out;
}

.approval-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.page-header {
    margin-bottom: 2rem;
    text-align: center;
}

.page-title {
    color: var(--db-primary);
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.page-subtitle {
    color: var(--db-gray-600);
    font-size: 1.1rem;
    margin: 0;
}

/* Grid Layout */
.requests-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
}

/* Request Card */
.request-card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: var(--transition);
    border: 1px solid var(--db-gray-200);
}

.request-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.card-content {
    padding: 1.5rem;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--db-gray-100);
}

.request-number {
    color: var(--db-primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-pending {
    background-color: var(--db-warning);
    color: #856404;
}

.status-in-progress {
    background-color: var(--db-light-blue);
    color: var(--db-primary);
}

.status-approved {
    background-color: var(--db-success);
    color: white;
}

.status-rejected {
    background-color: var(--db-danger);
    color: white;
}

/* Card Details */
.card-details {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: var(--db-gray-50);
    border-radius: 6px;
}

.detail-label {
    font-weight: 500;
    color: var(--db-gray-600);
    flex-shrink: 0;
}

.detail-value {
    font-weight: 600;
    color: var(--db-gray-800);
    text-align: right;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 120px;
    justify-content: center;
}

.btn-accept {
    background-color: var(--db-success);
    color: white;
}

.btn-accept:hover {
    background-color: #218838;
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

.btn-reject {
    background-color: var(--db-danger);
    color: white;
}

.btn-reject:hover {
    background-color: #c82333;
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

.btn-icon {
    font-size: 1.2rem;
}

.processed-indicator {
    text-align: center;
    padding: 1rem;
    background-color: var(--db-gray-50);
    border-radius: 6px;
    margin-top: 1rem;
}

.processed-text {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--db-gray-600);
}

/* Timeline Container */
.timeline-container {
    background-color: var(--db-gray-50);
    padding: 1.5rem;
    border-top: 1px solid var(--db-gray-200);
}

.timeline-title {
    color: var(--db-primary);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
}

/* Syncfusion Timeline Customization */
::deep .custom-timeline .e-timeline-item {
    margin-bottom: 1rem;
}

::deep .custom-timeline .e-timeline-item:last-child {
    margin-bottom: 0;
}

::deep .custom-timeline .e-timeline-dot-item {
    width: 20px;
    height: 20px;
    border: 3px solid var(--db-gray-300);
    background-color: white;
}

::deep .timeline-completed .e-timeline-dot-item {
    border-color: var(--db-success);
    background-color: var(--db-success);
}

::deep .timeline-current .e-timeline-dot-item {
    border-color: var(--db-primary);
    background-color: var(--db-primary);
    animation: pulse 2s infinite;
}

::deep .timeline-pending .e-timeline-dot-item {
    border-color: var(--db-gray-300);
    background-color: white;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 24, 168, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(0, 24, 168, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 24, 168, 0); }
}

.timeline-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
}

.timeline-icon {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
}

.timeline-text {
    font-weight: 500;
    color: var(--db-gray-800);
}

::deep .timeline-completed .timeline-text {
    color: var(--db-success);
    font-weight: 600;
}

::deep .timeline-current .timeline-text {
    color: var(--db-primary);
    font-weight: 600;
}

::deep .timeline-pending .timeline-text {
    color: var(--db-gray-600);
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--db-gray-600);
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.empty-state h3 {
    color: var(--db-gray-800);
    margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (min-width: 768px) {
    .requests-grid {
        grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    }
    
    .card-details {
        grid-template-columns: 1fr 1fr;
    }
    
    .request-card {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 0;
    }
    
    .timeline-container {
        border-top: none;
        border-left: 1px solid var(--db-gray-200);
    }
}

@media (min-width: 1200px) {
    .requests-grid {
        grid-template-columns: 1fr;
    }
    
    .request-card {
        grid-template-columns: 3fr 2fr;
    }
}

@media (max-width: 767px) {
    .card-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .detail-item {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
    }
}
</style>

@code {
    // Mock data structure - replace with your actual data binding
    private List<ApprovalRequest> approvalRequests = new()
    {
        new ApprovalRequest
        {
            RequestNumber = "REQ-2025-001",
            TransferCycle = "Q1 2025",
            HighLevelUBR = "Corporate Banking",
            CurrentStatus = "Pending",
            NextApprovalStage = "Sender CFO"
        },
        new ApprovalRequest
        {
            RequestNumber = "REQ-2025-002",
            TransferCycle = "Q1 2025",
            HighLevelUBR = "Investment Banking",
            CurrentStatus = "In Progress",
            NextApprovalStage = "Receiver CFO"
        }
    };

    private readonly List<string> approvalStages = new()
    {
        "Sender CFO",
        "Sender COO", 
        "Receiver CFO",
        "Receiver COO",
        "PPM"
    };

    public class ApprovalRequest
    {
        public string RequestNumber { get; set; } = string.Empty;
        public string TransferCycle { get; set; } = string.Empty;
        public string HighLevelUBR { get; set; } = string.Empty;
        public string CurrentStatus { get; set; } = string.Empty;
        public string NextApprovalStage { get; set; } = string.Empty;
        public bool IsProcessed { get; set; } = false;
        public bool IsAccepted { get; set; } = false;
    }

    public class TimelineStageItem
    {
        public string Stage { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string CssClass { get; set; } = string.Empty;
    }

    private void AcceptRequest(ApprovalRequest request)
    {
        request.IsProcessed = true;
        request.IsAccepted = true;
        AdvanceToNextStage(request);
        StateHasChanged();
    }

    private void RejectRequest(ApprovalRequest request)
    {
        request.IsProcessed = true;
        request.IsAccepted = false;
        AdvanceToNextStage(request);
        StateHasChanged();
    }

    private void AdvanceToNextStage(ApprovalRequest request)
    {
        var currentIndex = approvalStages.IndexOf(request.NextApprovalStage);
        if (currentIndex >= 0 && currentIndex < approvalStages.Count - 1)
        {
            request.NextApprovalStage = approvalStages[currentIndex + 1];
            request.CurrentStatus = "In Progress";
        }
        else if (currentIndex == approvalStages.Count - 1)
        {
            request.CurrentStatus = request.IsAccepted ? "Approved" : "Rejected";
            request.NextApprovalStage = "Complete";
        }
    }

    private string GetStatusClass(string status)
    {
        return status.ToLowerInvariant() switch
        {
            "pending" => "pending",
            "in progress" => "in-progress", 
            "approved" => "approved",
            "rejected" => "rejected",
            _ => "pending"
        };
    }

    private List<TimelineStageItem> GetTimelineItems(ApprovalRequest request)
    {
        var items = new List<TimelineStageItem>();
        var currentStageIndex = approvalStages.IndexOf(request.NextApprovalStage);
        
        for (int i = 0; i < approvalStages.Count; i++)
        {
            var stage = approvalStages[i];
            var item = new TimelineStageItem { Stage = stage };
            
            if (i < currentStageIndex || (request.CurrentStatus == "Approved" && i < approvalStages.Count))
            {
                // Completed stage
                item.Icon = "✓";
                item.CssClass = "timeline-completed";
            }
            else if (i == currentStageIndex && request.CurrentStatus != "Approved" && request.CurrentStatus != "Rejected")
            {
                // Current stage
                item.Icon = "→";
                item.CssClass = "timeline-current";
            }
            else
            {
                // Pending stage
                item.Icon = "⏳";
                item.CssClass = "timeline-pending";
            }
            
            // Special handling for rejected requests
            if (request.CurrentStatus == "Rejected" && i >= currentStageIndex)
            {
                item.Icon = "✗";
                item.CssClass = "timeline-pending";
            }
            
            items.Add(item);
        }
        
        return items;
    }
}

