// Normalize Scores (Ensure 0–100 Range)
export function normalizeScore(score: number): number {
  return Math.min(Math.max(score, 0), 100);
}

// Calculate Resilience Level
export function calculateResilienceLevel(finalScore: number): { label: string; color: { light: string; dark: string } } {
  // Ensure the score is a valid number
  if (isNaN(finalScore)) {
    console.error("Invalid score passed to calculateResilienceLevel:", finalScore);
    return { 
      label: "Invalid Score", 
      color: { 
        light: "#6c757d",
        dark: "#909599" 
      }
    }; // Gray for invalid scores
  }

  // Determine the resilience level based on the score
  /*
  Range	Level	                Designation	        Description
  90–100	Highly Resilient	    Human-Centered	    The job is deeply rooted in human qualities like creativity, empathy, and decision-making, with minimal automation risk.
  75–89	Resilient	            Tech-Integrated	    The job balances human-centered tasks with technology integration, making it resilient but adaptable to automation tools.
  50–74	Moderately Resilient	Hybrid Potential	A mix of tasks: some are resistant to automation while others are routine and can be automated with emerging technologies.
  25–49	Vulnerable	            Automation-Prone	The job includes significant portions of repetitive or predictable tasks that are highly automatable with current tools.
  0–24	Highly Vulnerable	    Automation-Ready	The job is heavily reliant on routine, repetitive, or predictable tasks, making it highly susceptible to automation.
  */

  if (finalScore >= 90) {
    return { 
      label: "Human-Centered - Highly Resilient", 
      color: {
        light: "#28a745",
        dark: "#4ade80"
      }
    };
  } else if (finalScore >= 75) {
    return { 
      label: "Tech-Integrated - Resilient", 
      color: {
        light: "#3b82f6",
        dark: "#93c5fd"
      }
    };
  } else if (finalScore >= 50) {
    return { 
      label: "Hybrid Potential - Moderately Resilient", 
      color: {
        light: "#f4d03f",
        dark: "#fde047"
      }
    };
  } else if (finalScore >= 25) {
    return { 
      label: "Automation-Prone - Vulnerable", 
      color: {
        light: "#e67e22",
        dark: "#f97316"
      }
    };
  } else {
    return { 
      label: "Automation-Ready - Highly Vulnerable", 
      color: {
        light: "#e74c3c",
        dark: "#ef4444"
      }
    };
  }
}