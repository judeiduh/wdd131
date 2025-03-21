/**
 * Script for dynamically updating the year and last modified date
 * This script adds functionality to display the current year in the footer
 * and formats the last modified date of the document
 */

/**
 * Update Current Year in Footer
 * 
 * This section gets the current year using JavaScript's Date object
 * and displays it in the element with ID 'year'
 */
const yearElement = document.getElementById("year"); // Get the DOM element with ID 'year'
if (yearElement) {
    // Check if the element exists to avoid errors
    yearElement.textContent = new Date().getFullYear(); // Set the content to the current year
} else {
    // Log an error if the element doesn't exist
    console.error("Element with ID 'year' not found.");
}

/**
 * Format and Display Last Modified Date
 * 
 * This section gets the last modified date of the document,
 * formats it into a readable string, and displays it in the element with ID 'lastModified'
 */
const lastModifiedElement = document.getElementById("lastModified"); // Get the DOM element with ID 'lastModified'
if (lastModifiedElement) {
    // Check if the element exists to avoid errors
    const lastModifiedDate = new Date(document.lastModified); // Get the last modified date of the document

    // Format each part of the date with padding zeros when needed
    const day = String(lastModifiedDate.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(lastModifiedDate.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero (adding 1 as months are 0-indexed)
    const year = lastModifiedDate.getFullYear(); // Get full year (4 digits)
    const hours = String(lastModifiedDate.getHours()).padStart(2, '0'); // Get hours and pad with zero if needed
    const minutes = String(lastModifiedDate.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero if needed
    const seconds = String(lastModifiedDate.getSeconds()).padStart(2, '0'); // Get seconds and pad with zero if needed

    // Combine all parts into a formatted date string (DD/MM/YYYY HH:MM:SS format)
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    lastModifiedElement.textContent = "Last Modification: " + formattedDate; // Update the element's text with the formatted date
} else {
    // Log an error if the element doesn't exist
    console.error("Element with ID 'lastModified' not found.");
}