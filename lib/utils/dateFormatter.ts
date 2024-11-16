import moment from 'moment';

/**
 * Function to format a date string to 'MMMM Do YYYY' format (e.g., 'October 28th 2024').
 * 
 * @param date - The input date string in ISO 8601 format (e.g., '2024-10-28T00:23:39.002Z').
 * @returns A formatted date string in the format 'MMMM Do YYYY', or 'Invalid date' if the date is invalid.
 */
export function formatDate(date: string): string {
    // Create a moment object from the date string
    const momentDate = moment(date);
    
    // Check if the date is valid
    if (momentDate.isValid()) {
        // Return the formatted date as 'MMMM Do YYYY'
        return momentDate.format('MMMM Do YYYY');
    } else {
        // Return 'Invalid date' if the date is not valid
        return 'Invalid date';
    }
}

// Example usage:
// const formattedDate = formatDate('2024-10-28T00:23:39.002Z');
// console.log(formattedDate);  // Output: "October 28th 2024"

// const invalidDate = formatDate('invalid-date-string');
// console.log(invalidDate);  // Output: "Invalid date"
