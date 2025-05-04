# Product Requirements Document

## Overview
The WARE Framework Analysis MVP is a web-based tool that allows users to paste a job description and receive an automated analysis of the job’s resilience to automation and AI. The system leverages a large language model (LLM) to evaluate job tasks, assign automation risk categories, and provide actionable recommendations for increasing automation resilience.

## Goals
1. Enable users to quickly assess how susceptible a job is to automation and AI.
2. Provide clear, actionable recommendations to improve job resilience.
3. Deliver results in a user-friendly, accessible format.
4. Validate the WARE framework as a practical tool for job analysis.

## Target Audience
- Job seekers and employees
- HR professionals and recruiters
- Workforce development organizations
- Business leaders and managers

## Key Features

### Core Functionality
1. Job Description Input
   - Paste or upload a job description via a textarea form.
   - Input validation (minimum length, max 16,000 characters).

2. Automated Analysis
   - LLM analyzes the job description using the WARE framework.
   - Returns a JSON object with:
     - preliminary_score (0–100)
     - final_score (0–100)
     - tasks (array: task, category, weight)
     - recommendations (array of strings)

3. Results Display
   - Show preliminary and final scores with clear labels.
   - Display automation resilience level (color-coded, descriptive label).
   - List analyzed tasks with categories and weights.
   - List actionable, human-centered recommendations.

### User Experience
1. Responsive, single-page web interface (desktop/mobile)
2. Clear instructions and feedback (e.g., loading spinner, error messages)
3. Accessible design using Bootstrap 4

## Technical Requirements

### Frontend
- HTML5, CSS3, JavaScript (jQuery)
- Bootstrap 4 for layout and styling
- AJAX for backend communication

### Backend (for MVP/testing)
- Local LLM API endpoint (e.g., OpenAI-compatible, running at http://localhost:1234)
- Expects POST requests with job description; returns JSON analysis

### Security
- No user authentication (MVP)
- Input validation and error handling
- CORS enabled for local API

## Success Metrics
1. Usability
   - 90%+ of users can complete an analysis without errors
   - <10% error rate on JSON parsing or API failures
2. Engagement
   - 50+ unique analyses run in MVP phase
   - Average session duration >2 minutes
3. Quality
   - 80%+ of users rate recommendations as useful (survey)
   - JSON output matches frontend requirements 100% of the time

## Timeline
- Week 1: UI and core logic implementation
- Week 2: LLM prompt engineering and backend integration
- Week 3: User testing and bug fixes
- Week 4: Documentation and MVP launch

## Future Enhancements
1. File upload for job descriptions (PDF, DOCX)
2. User accounts and analysis history
3. Customizable analysis parameters (industry, region)
4. Integration with job boards and HR systems
5. Advanced analytics dashboard

## Maintenance
1. Regular updates to LLM prompt and scoring logic
2. Monitor API uptime and error logs
3. Collect user feedback for continuous improvement
