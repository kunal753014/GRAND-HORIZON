# Grand Horizon Hotel Management App

A modern, responsive hotel booking form built with HTML5, Tailwind CSS, and Vanilla JavaScript.

## Features
- **Responsive Design**: Works on mobile, tablet, and desktop devices.
- **Real-time Validation**: 
    - Prevents selecting past dates for check-in.
    - Ensures check-out date is always after the check-in date.
    - Dynamic minimum check-out date based on check-in selection.
- **Interactive UI**: Glassmorphism design with Tailwind CSS, error shaking animations, and success feedback.
- **Accessible Forms**: Proper labeling and error reporting.

## Technologies Used
- **HTML5**: Semi-semantic structure.
- **Tailwind CSS**: For modern, premium styling and responsiveness.
- **JavaScript (ES6+)**: For form logic and validation.
- **Google Fonts**: 'Outfit' for a premium typography feel.

## How to Run
1. **Site Link**:
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox).
3. Alternatively, if you have VS Code, use the "Live Server" extension.

## Implementation Details
- The form uses `novalidate` to handle all validation via custom JavaScript for a consistent UX across browsers.
- Date logic automatically updates the `min` attribute of the check-out input when a check-in date is selected.
- Error messages are displayed dynamically below each field.
