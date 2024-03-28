Installation and Setup

    Clone the repository to your local machine.
    Navigate to the project directory in your terminal.
    Install dependencies using npm install.
    Start the development server with npm run dev.

Usage

    Open the application in your browser.
    Paste the text you want to share into the textarea.
    Click the "Share" button to generate a code for sharing.
    Copy the generated code and share it with others.
    To access shared text, go to the "Enter Code" page and enter the code.

Technologies Used

    React: Frontend framework for building user interfaces.
    Next.js: React framework for server-side rendering and routing.
    Fetch API: Used for making HTTP requests to the server.
    Tailwind CSS: Utility-first CSS framework for styling.

Folder Structure

├── pages/
│   ├── index.js     # Home page component
│   ├── code.js      # Enter Code page component
│   └── api/
│       └── uploadText.js   # API route for uploading text
├── public/
│   └── favicon.ico   # Favicon icon
├── styles/
│   └── Home.module.css   # Styles for Home component
├── .gitignore    # Git ignore file
├── package.json  # Project dependencies and scripts
├── README.md     # Project documentation
└── next.config.js   # Next.js configuration file

API Endpoint

The application uses a local API endpoint for uploading text content. The endpoint is located at http://127.0.0.1:5000/api/uploadText and accepts POST requests with JSON data containing the text to be uploaded.
Credits

This project was created by Sohail Khan. Feel free to contribute and improve the application as needed.
License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the license terms.****
