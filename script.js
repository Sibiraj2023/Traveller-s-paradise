document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itineraryForm');
    const submitBtn = document.getElementById('generateBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const messageArea = document.getElementById('messageArea');

    // CONFIGURATION
    // REPLACE THIS WITH YOUR ACTUAL N8N WEBHOOK URL
    const N8N_WEBHOOK_URL = 'https://YOUR_N8N_INSTANCE_URL/webhook/travel-itinerary-generator';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Client-side Validation (HTML5 handles most, checking generic constraints here)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Gather Form Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // UI: Set Loading State
        setLoading(true);
        messageArea.classList.add('hidden');
        messageArea.className = 'hidden'; // Reset classes

        try {
            // Send data to n8n Webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success
                showMessage('Success! Your itinerary is being generated and will be emailed to you shortly.', 'success');
                form.reset();
            } else {
                // Server Error
                throw new Error('Failed to connect to the itinerary generator.');
            }
        } catch (error) {
            console.error('Submission Error:', error);

            // Check if it's likely a CORS or network error (common with local/testing)
            if (error.message === 'Failed to fetch') {
                showMessage('Network Error: Could not reach the n8n webhook. Please ensure the URL is correct and CORS is handled if testing locally.', 'error');
            } else {
                showMessage('An error occurred. Please try again later.', 'error');
            }
        } finally {
            // UI: Reset Loading State
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.textContent = 'Generating...';
            loader.classList.remove('hidden');
        } else {
            btnText.textContent = 'Generate Itinerary';
            loader.classList.add('hidden');
        }
    }

    function showMessage(text, type) {
        messageArea.textContent = text;
        messageArea.classList.remove('hidden');
        messageArea.classList.add(type);
    }
});
