// Function to calculate Wind Chill based on temperature and wind speed
function calculateWindChill(temp, windSpeed) {
    if ((temp <= 10) && (windSpeed > 4.8)) {
        // Wind Chill formula for Celsius
        return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    }
    return "N/A";
}

// Get current year and last modified date
function updateFooterDates() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
}

// Static values for testing the windchill calculation (can be replaced later with dynamic data)
const temperature = 5;  // in Celsius
const windSpeed = 10;   // in km/h

// Calculate and display windchill
const windchill = calculateWindChill(temperature, windSpeed);
document.getElementById("wind-chill").textContent = windchill;

// Call the function to update footer with current year and last modified date
updateFooterDates();
