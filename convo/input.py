import json
input_conversation = {
    "messages": [
        {
            "timestamp": "2024-12-20T09:00:00",
            "name": "AR",
            "message": "We need to discuss the Q4 project timeline. Our current progress is falling behind schedule."
        },
        {
            "timestamp": "2024-12-20T09:01:15", 
            "name": "MA",
            "message": "I agree, let's review where we stand. I've actually prepared some potential solutions we could implement."
        },
        {
            "timestamp": "2024-12-20T09:02:30",
            "name": "AR", 
            "message": "The development phase is taking 30% longer than estimated. This needs to be addressed immediately."
        },
        {
            "timestamp": "2024-12-20T09:03:45",
            "name": "MA",
            "message": "I understand your concern. We can optimize our workflow by implementing agile sprints. I've seen great results with this approach."
        },
        {
            "timestamp": "2024-12-20T09:05:00",
            "name": "AR",
            "message": "Fine, but I expect a detailed sprint plan by tomorrow. We can't afford any more delays."
        },
        {
            "timestamp": "2024-12-20T09:06:15",
            "name": "MA",
            "message": "Absolutely! I'm excited to show you how we can turn this around. I'll have the sprint plan ready with clear deliverables."
        },
        {
            "timestamp": "2024-12-20T09:07:30",
            "name": "AR",
            "message": "The quality metrics must not be compromised in this process. That's non-negotiable."
        },
        {
            "timestamp": "2024-12-20T09:08:45",
            "name": "MA",
            "message": "Quality will remain our top priority. I'm thinking we can actually enhance our QA processes within the new sprint structure."
        },
        {
            "timestamp": "2024-12-20T09:10:00",
            "name": "AR",
            "message": "What's your estimated timeline for implementing these changes?"
        },
        {
            "timestamp": "2024-12-20T09:11:15",
            "name": "MA",
            "message": "We can begin the transition next week! I believe we'll see improvements within the first two sprints."
        },
        {
            "timestamp": "2024-12-20T09:12:30",
            "name": "AR",
            "message": "That's not fast enough. We need to start implementing changes by Thursday."
        },
        {
            "timestamp": "2024-12-20T09:13:45",
            "name": "MA",
            "message": "Let me see what we can do to expedite the process. I'll coordinate with the team to push for a Thursday start."
        },
        {
            "timestamp": "2024-12-20T09:15:00",
            "name": "AR",
            "message": "Send me hourly updates on the transition progress once we begin."
        },
        {
            "timestamp": "2024-12-20T09:16:15",
            "name": "MA",
            "message": "I'll create a real-time dashboard for progress tracking. This will help maintain transparency throughout the transition."
        },
        {
            "timestamp": "2024-12-20T09:17:30",
            "name": "AR",
            "message": "The dashboard is a good initiative. Ensure it highlights bottlenecks clearly."
        },
        {
            "timestamp": "2024-12-20T09:18:45",
            "name": "MA",
            "message": "Great idea! I'll add bottleneck indicators and resolution tracking features to the dashboard."
        },
        {
            "timestamp": "2024-12-20T09:20:00",
            "name": "AR",
            "message": "Schedule a follow-up meeting for Thursday afternoon to review the initial implementation."
        },
        {
            "timestamp": "2024-12-20T09:21:15",
            "name": "MA",
            "message": "I'll set up the meeting and prepare a comprehensive progress report for our discussion."
        },
        {
            "timestamp": "2024-12-20T09:22:30",
            "name": "AR",
            "message": "Make sure all team leads are present. We need full alignment on this."
        },
        {
            "timestamp": "2024-12-20T09:23:45",
            "name": "MA",
            "message": "I'll coordinate with all team leads and send out a detailed agenda to ensure we make the most of our time."
        }
    ]
}

# Save to JSON file
with open('input_statements.json', 'w') as f:
    json.dump(input_conversation, f, indent=4)