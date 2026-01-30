# AI Usage and Project Documentation

## 1. Frontend Development with Cursor AI
The frontend was developed using Cursor AI as a co-pilot to accelerate the development process and ensure a premium, modern design.

### Key Contributions:
-   **HTML Structure**: Generated semantic HTML5 structure with appropriate input types (e.g., `<input type="email">`, `<input type="number">`) for built-in validation.
-   **Premium Styling**: logic for "glassmorphism" CSS was generated to create a modern, translucent UI effect with `backdrop-filter: blur`, gradients, and responsive layouts.
-   **JavaScript Logic**: Created the `fetch` API logic to securely transmit form data to the n8n webhook and handle asynchronous loading states (spinners, success messages).

## 2. n8n Automation Workflow
The backend logic is handled entirely by n8n, a workflow automation tool, leveraging AI for content generation.

### Workflow Steps:
1.  **Webhook Node**: Acts as the entry point. It listens for `POST` requests from the frontend containing the user's travel details (Destination, Budget, Days, etc.).
2.  **OpenAI Node (LLM)**:
    -   **Model**: GPT-4o
    -   **System Prompt**: "You are an expert travel planner. Create a detailed day-by-day travel itinerary..."
    -   **User Prompt**: Dynamically constructed using data from the Webhook node (e.g., `Destination: {{$json.destination}}`).
    -   **Output**: A structured HTML-formatted itinerary.
3.  **Gmail Node**: Takes the generated HTML content and sends it to the user's email address collected in the form.

### AI Decision Logic:
-   **Structured Output**: The LLM is instructed to output HTML to ensure the email is visually appealing and easy to read.
-   **Contextual Awareness**: The prompt ensures the AI considers budget and travel mode constraints when suggesting activities.

## 3. Design & Logic Decisions

### Frontend
-   **No Backend Framework**: To adhere to the "No backend frameworks" constraint, the application relies purely on client-side JS and n8n.
-   **Glassmorphism**: Chosen to give a "premium" feel as requested.
-   **Client-Side Validation**: implemented to reduce unnecessary API calls to the n8n webhook.

### Automation
-   **Webhook Security**: In a production environment, we would verify the origin or add a simplified token, but for this MVP, we kept it open to demonstrate ease of connectivity.
-   **Error Handling**: The frontend handles network errors gracefully, informing the user if the webhook is unreachable (common in local testing).

## 4. Setup Instructions
1.  **Open index.html** in your browser.
2.  **Import `n8n_workflow.json`** into your n8n instance.
3.  **Configure Credentials**: Add your OpenAI API key and Gmail credentials to the valid n8n nodes.
4.  **Update Webhook URL**: Replace the placeholder URL in `script.js` with your active n8n Test/Production URL.
