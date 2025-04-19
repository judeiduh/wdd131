// DOM Elements
const menuButton = document.getElementById('menu-button');
const nav = document.querySelector('nav');
const currentYearElement = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');
const eventsContainer = document.getElementById('events-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Events Data
const events = [
  { 
    id: 1, 
    name: "Spring Tournament", 
    date: "2023-05-15", 
    participants: 32,
    description: "Annual spring championship open to all members. 36-hole stroke play."
  },
  { 
    id: 2, 
    name: "Junior Championship", 
    date: "2023-06-10", 
    participants: 24,
    description: "For golfers under 18. 18-hole competition with age divisions."
  },
  { 
    id: 3, 
    name: "Member-Guest Tournament", 
    date: "2023-07-22", 
    participants: 48,
    description: "Two-day best ball event. Members invite one guest."
  },
  { 
    id: 4, 
    name: "Club Championship", 
    date: "2023-08-12", 
    participants: 40,
    description: "72-hole stroke play to determine club champion."
  }
];

// Initialize the application
function init() {
  setupMobileMenu();
  displayCurrentYear();
  setupContactForm();
  displayEvents();
  setupDarkMode();
  loadUserPreferences();
}

// Mobile menu toggle
function setupMobileMenu() {
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuButton.textContent = nav.classList.contains('open') ? '✕' : '☰';
      menuButton.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }
}

// Display current year in footer
function displayCurrentYear() {
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

// Contact form handling
function setupContactForm() {
  if (!contactForm) return;

  // Set instructor name if coming from instructor booking
  const urlParams = new URLSearchParams(window.location.search);
  const instructor = urlParams.get('instructor');
  if (instructor && contactForm.elements.subject) {
    contactForm.elements.subject.value = 'lessons';
    if (contactForm.elements.message) {
      contactForm.elements.message.value = `I would like to book a lesson with ${instructor}.\n\nPreferred date/time: `;
    }
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contact = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      newsletter: formData.get('newsletter') === 'on',
      date: new Date().toISOString()
    };

    // Save contact to localStorage
    saveContact(contact);
    
    // Show success message
    showFormSuccess();
  });

  // Instructor booking buttons
  document.querySelectorAll('[data-instructor]').forEach(button => {
    button.addEventListener('click', function() {
      const instructor = this.getAttribute('data-instructor');
      if (contactForm.elements.message) {
        contactForm.elements.message.value = `I would like to book a lesson with ${instructor}.\n\nPreferred date/time: `;
      }
      contactForm.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Save contact to localStorage
function saveContact(contact) {
  let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Show form submission success
function showFormSuccess() {
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.innerHTML = `
    <h3>Thank you for your message!</h3>
    <p>We'll get back to you as soon as possible.</p>
  `;
  
  contactForm.parentNode.insertBefore(successMessage, contactForm);
  contactForm.reset();
  
  setTimeout(() => {
    successMessage.style.opacity = '0';
    setTimeout(() => successMessage.remove(), 500);
  }, 3000);
}

// Display upcoming events
function displayEvents() {
  if (!eventsContainer) return;
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Filter events in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = sortedEvents.filter(event => new Date(event.date) >= today);
  
  if (upcomingEvents.length === 0) {
    eventsContainer.innerHTML = '<p>No upcoming events scheduled. Check back soon!</p>';
    return;
  }
  
  // Display events
  eventsContainer.innerHTML = upcomingEvents.map(event => `
    <div class="event-card">
      <h3>${event.name}</h3>
      <p class="event-date">${formatDate(event.date)}</p>
      <p class="event-participants">Participants: ${event.participants}</p>
      <p class="event-description">${event.description}</p>
      <button class="secondary-button event-register" data-event-id="${event.id}">Register Now</button>
    </div>
  `).join('');
  
  // Add event listeners to register buttons
  document.querySelectorAll('.event-register').forEach(button => {
    button.addEventListener('click', function() {
      const eventId = parseInt(this.getAttribute('data-event-id'));
      registerForEvent(eventId);
    });
  });
}

// Format date as "Month Day, Year"
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Register for an event
function registerForEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  // Save registration to localStorage
  let registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
  if (!registrations.some(reg => reg.eventId === eventId)) {
    registrations.push({
      eventId,
      eventName: event.name,
      date: new Date().toISOString()
    });
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    
    // Show success message
    alert(`You have successfully registered for ${event.name}!`);
  } else {
    alert(`You are already registered for ${event.name}.`);
  }
}

// Dark mode toggle
function setupDarkMode() {
  if (!darkModeToggle) return;
  
  // Check for saved preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  // Set initial state
  if (savedMode === 'true' || (savedMode === null && prefersDark)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
  });
}

// Load user preferences
function loadUserPreferences() {
  const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  
  // Font size preference
  if (preferences.fontSize) {
    document.documentElement.style.setProperty('--font-size', preferences.fontSize);
  }
  
  // Other preferences can be loaded here
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);