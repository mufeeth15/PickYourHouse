
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            // Optional: Change icon (fas fa-bars to fas fa-times)
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.className = 'fas fa-times'; 
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when a link is clicked (optional)
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    });

document.addEventListener('DOMContentLoaded', (event) => {
    // Select the form and the results container
    const searchForm = document.getElementById('property-search-form');
    const resultsContainer = document.getElementById('search-results-container');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // --- Tab Switching Logic (from previous request) ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            // Clear previous results when switching tabs
            resultsContainer.innerHTML = ''; 
        });
    });

    // --- Search Submission Logic ---
    searchForm.addEventListener('submit', (e) => {
        // 1. IMPORTANT: Prevent the browser from submitting the form and reloading the page
        e.preventDefault(); 

        // 2. Get the currently active mode (Buy, Sell, or Rent)
        const activeTab = document.querySelector('.tab-btn.active');
        const searchMode = activeTab ? activeTab.textContent.trim() : 'Search';
        
        // 3. Collect the form data
        const formData = new FormData(searchForm);
        const keywords = formData.get('keywords');
        const propertyType = formData.get('property-type');
        const neighbourhood = formData.get('neighbourhood');

        // 4. Clear old results
        resultsContainer.innerHTML = '';
        
        // 5. Simulate showing search results
        // In a real application, you would make an AJAX call (fetch/axios) here 
        // to a server to get the actual search data.
        
        const resultsHTML = `
            <h3>Showing Results for: ${searchMode}</h3>
            <p><strong>Keywords:</strong> ${keywords || 'None'}</p>
            <p><strong>Type:</strong> ${propertyType || 'Any'}</p>
            <p><strong>Neighbourhood:</strong> ${neighbourhood || 'Any'}</p>
            
            <div style="border: 1px solid #ccc; padding: 15px; margin-top: 10px;">
                <p><strong>Property 1:</strong> 2 BHK Flat in Vashi</p>
                <p><strong>Property 2:</strong> Row House near Ghansoli Station</p>
                <p>... and 8 more properties.</p>
            </div>
        `;

        // 6. Insert the details into the results container
        resultsContainer.innerHTML = resultsHTML;

        // Example: Focus on the results after the search
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Select all the FAQ question buttons
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', function() {
            // Select the associated answer container (sibling element)
            const answerContainer = this.nextElementSibling;
            
            // Check if the current question is already open
            const isCurrentlyActive = this.classList.contains('active');

            // --- Step 2: Close all other open FAQs ---
            faqQuestions.forEach(item => {
                const otherAnswerContainer = item.nextElementSibling;
                
                // Remove 'active' class from other buttons
                item.classList.remove('active');
                
                // Close other answer containers
                if (otherAnswerContainer.classList.contains('show')) {
                    otherAnswerContainer.style.maxHeight = 0;
                    otherAnswerContainer.classList.remove('show');
                }
            });

            // --- Step 3: Toggle the clicked FAQ ---
            if (!isCurrentlyActive) {
                // If it was NOT active, open it now
                
                // 3a. Add 'active' class to the clicked button (for style changes like bold text and icon rotation)
                this.classList.add('active');

                // 3b. Add 'show' class to the answer container
                answerContainer.classList.add('show');
                
                // 3c. Set the max-height dynamically to the answer's scroll height
                // This is crucial for the CSS transition to work smoothly
                // We use scrollHeight to get the full height of the content
                answerContainer.style.maxHeight = answerContainer.scrollHeight + "px";

            } else {
                // If it WAS active, close it (already handled in the loop, but explicitly close it here for clarity)
                
                // 3a. Remove 'active' class
                this.classList.remove('active');
                
                // 3b. Set max-height back to 0 to trigger the slide-up transition
                answerContainer.style.maxHeight = 0;
                
                // 3c. Remove 'show' class
                answerContainer.classList.remove('show');
            }
        });
    });
});

/**
 * Handles the sub-navigation tab filtering functionality.
 * When a tab is clicked, it hides all listing cards and shows only the ones
 * matching the selected category.
 * @param {string} category - The category to filter by (e.g., 'all', 'flat-rent').
 */
function filterListings(category) {
    // Prevent default anchor link behavior
    event.preventDefault();

    // 1. Deactivate all sub-navigation links
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.classList.remove('active');
    });

    // 2. Find and activate the clicked link
    const clickedFilter = event.currentTarget;
    if (clickedFilter) {
        clickedFilter.classList.add('active');
    }
    
    // 3. Select all listing cards
    const listings = document.querySelectorAll('.listing-card');

    // 4. Loop through all cards and show/hide based on the category
    listings.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            // Show the card if the category is 'all' or if the card has the matching category class
            card.classList.remove('hidden');
        } else {
            // Hide the card
            card.classList.add('hidden');
        }
    });
}

// Ensure initial state is correct when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // The initial filter is set to 'all' in the HTML, but we run the filter to ensure
    // consistency if you were to change the default active tab later.
    // If the HTML is structured exactly as above, this step is often redundant but safe.
    // We just ensure the 'all' tab is marked active (which is already done in HTML).
});

// Configuration for Load More functionality
const LISTINGS_PER_LOAD = 3; // Number of cards to show when clicking Load More
let currentVisibleListings = LISTINGS_PER_LOAD;

/**
 * Initializes the list: Hides all cards beyond the initial set.
 * Ensures the Load More button is visible if there are more listings.
 */
function initializeListings() {
    const allListings = document.querySelectorAll('.listing-card');
    const loadMoreBtn = document.getElementById('load-more-btn');

    allListings.forEach((card, index) => {
        // Hide cards that are beyond the initial load count
        if (index >= LISTINGS_PER_LOAD) {
            card.classList.add('initial-hidden');
        }
    });

    // Hide button if all listings are visible initially
    if (allListings.length <= LISTINGS_PER_LOAD) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}


/**
 * Shows the next batch of listings when the Load More button is clicked.
 */
function loadMoreListings() {
    const allListings = document.querySelectorAll('.listing-card:not(.hidden)');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Calculate the range of listings to show next
    const startIndex = currentVisibleListings;
    const endIndex = startIndex + LISTINGS_PER_LOAD;

    for (let i = startIndex; i < endIndex && i < allListings.length; i++) {
        // Only show listings that aren't already hidden by a filter
        if (allListings[i]) {
            allListings[i].classList.remove('initial-hidden');
        }
    }

    currentVisibleListings = endIndex;

    // Hide button if all listings have been displayed
    if (currentVisibleListings >= allListings.length) {
        loadMoreBtn.style.display = 'none';
    }
}


/**
 * Handles the sub-navigation tab filtering functionality.
 * This is updated to reset the Load More functionality.
 * @param {string} category - The category to filter by (e.g., 'all', 'flat-rent').
 */
function filterListings(category) {
    event.preventDefault();

    // 1. Deactivate all sub-navigation links
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.classList.remove('active');
    });

    // 2. Find and activate the clicked link
    const clickedFilter = event.currentTarget;
    if (clickedFilter) {
        clickedFilter.classList.add('active');
    }
    
    const allListings = document.querySelectorAll('.listing-card');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let filteredCount = 0;

    // Reset initial-hidden class for ALL cards before filtering
    allListings.forEach(card => {
        card.classList.remove('initial-hidden');
        card.classList.remove('hidden');
    });

    // 3. Loop through all cards and filter based on the category
    allListings.forEach(card => {
        const isMatch = (category === 'all' || card.classList.contains(category));

        if (isMatch) {
            filteredCount++;
            // If card matches, check if it should be hidden based on the current load count
            if (filteredCount > LISTINGS_PER_LOAD) {
                card.classList.add('initial-hidden');
            } else {
                card.classList.remove('hidden');
            }
        } else {
            // Card does not match the filter
            card.classList.add('hidden');
        }
    });

    // 4. Reset visibility tracking and button state for the new filtered set
    currentVisibleListings = LISTINGS_PER_LOAD;
    if (filteredCount > LISTINGS_PER_LOAD) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Initialize the listings when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeListings();
});

// Form validation for Contact Us page
// JavaScript for Form Validation and Submission Simulation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageContainer = document.getElementById('message-container');
    
    // The target email for simulation (as specified by the user)
    const targetEmail = 'mohamedmufeeth21@gmail.com'; 

    // Helper function to show/hide error messages and update input border style
    const displayError = (input, message, isError) => {
        const errorElement = document.getElementById(input.id + 'Error');
        const borderClass = isError ? 'border-red-500' : 'border-gray-300';
        const focusClass = isError ? 'focus:ring-red-500' : 'focus:ring-primary-teal';
        
        // Remove and add border/focus classes
        input.classList.remove('border-red-500', 'border-gray-300', 'focus:ring-red-500', 'focus:ring-primary-teal');
        input.classList.add(borderClass, focusClass);

        // Show or hide the error message span
        if (isError) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        } else {
            errorElement.classList.add('hidden');
        }
        
        return !isError; // Returns true if valid (no error)
    };

    // Validation for Name fields (First and Last Name)
    const validateName = (input) => {
        // Must contain only letters (a-z, A-Z) and spaces
        const nameRegex = /^[a-zA-Z\s]+$/;
        const value = input.value.trim();
        if (value === '') {
            return displayError(input, 'This field is required.', true);
        }
        return displayError(input, 'Name must contain only alphabetic characters.', !nameRegex.test(value));
    };

    // Validation for Email field
    const validateEmail = (input) => {
        // Standard email format validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        const value = input.value.trim();
        if (value === '') {
            return displayError(input, 'This field is required.', true);
        }
        return displayError(input, 'Please enter a valid email address.', !emailRegex.test(value));
    };

    // Validation for Phone field
    const validatePhone = (input) => {
        // Optional, but if entered, must be exactly 10 digits
        const phoneRegex = /^\d{10}$/; 
        const value = input.value.trim();
        
        if (value === '') {
            // Empty phone number is valid as it is optional
            return displayError(input, '', false);
        }
        
        return displayError(input, 'Phone number must be exactly 10 digits (numbers only).', !phoneRegex.test(value));
    };

    // Functions for showing/hiding the general success/error message
    const resetFormMessage = () => {
        messageContainer.classList.add('hidden');
        messageContainer.textContent = '';
        messageContainer.className = 'hidden p-4 rounded-xl text-center font-medium';
    };

    const showFormMessage = (message, type = 'success') => {
        resetFormMessage();
        if (type === 'success') {
            messageContainer.classList.add('bg-green-100', 'text-green-800');
        } else if (type === 'error') {
            messageContainer.classList.add('bg-red-100', 'text-red-800');
        }
        messageContainer.textContent = message;
        messageContainer.classList.remove('hidden');
    };


    // Main Submission Handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        resetFormMessage();
        
        // Get input elements
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const serviceInput = form.querySelector('input[name="service"]:checked');

        // Perform all validation checks
        const isFirstNameValid = validateName(firstNameInput);
        const isLastNameValid = validateName(lastNameInput);
        const isEmailValid = validateEmail(emailInput);
        const isPhoneValid = validatePhone(phoneInput);

        const formIsValid = isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid;

        if (formIsValid) {
            // --- SIMULATE SUCCESSFUL SUBMISSION ---
            
            const formData = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                service: serviceInput ? serviceInput.value : 'N/A',
                message: messageInput.value
            };

            // Log data and display success message
            console.log('Form Data Collected:', formData);
            console.log('Submission simulated. Data would be sent to:', targetEmail);

            showFormMessage('Message sent successfully! We will contact you at ' + formData.email + '.', 'success');

            // Clear form fields
            form.reset();
            
        } else {
            // Validation failed
            showFormMessage('Please fix the highlighted errors in the form before submitting.', 'error');
        }
    });

    // Add blur listeners for real-time validation feedback
    document.getElementById('firstName').addEventListener('blur', (e) => validateName(e.target));
    document.getElementById('lastName').addEventListener('blur', (e) => validateName(e.target));
    document.getElementById('email').addEventListener('blur', (e) => validateEmail(e.target));
    document.getElementById('phone').addEventListener('blur', (e) => validatePhone(e.target));
});