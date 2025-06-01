# Country Explorer & React Mania

This project contains two main parts:
1.  **Country Explorer**: A web application that allows users to browse, search, and learn about different countries around the world.
2.  **React Mania**: A simple rhythm game built with React.

## 1. Country Explorer

Welcome to Country Explorer, your passport to discovering the diverse and fascinating nations that make up our world!

Our mission is to provide a clean, engaging, and easy-to-use platform for anyone curious to learn more about different countries. Whether you're a student, a traveler planning your next adventure, or just someone with a thirst for knowledge, Country Explorer is here to help you navigate the globe from the comfort of your screen.

### Features

* **Comprehensive Country Data**: Dive into details for countries from around the world. Each country page provides information such as its capital city, continent, official languages, currency, and even its national emoji.
* **Easy Navigation**:
    * **Browse**: Scroll through an extensive list of countries.
    * **Search**: Quickly find any country by typing its name into the search bar.
    * **Filter**: Narrow down your exploration by filtering countries by continent.
* **Detailed Country Pages**: Click on any country to see a dedicated page with more in-depth information, helping you get a better understanding of what makes each nation unique.
* **Customizable Viewing Experience**: Tailor the website's appearance to your preference with our theme switcher. Choose between light, dark, or system default themes for optimal viewing comfort.
* **Responsive Design**: The application is designed to work on various screen sizes.
* **Toast Notifications**: Provides user feedback through toast messages.

### Data Source

All the information you see on Country Explorer is sourced from the **Countries Trevor Blades API**.

### Tech Stack

* **React**: A JavaScript library for building user interfaces.
* **TypeScript**: A typed superset of JavaScript.
* **React Router**: For declarative routing in React.
* **@tanstack/react-query**: For data fetching and caching.
* **Tailwind CSS**: A utility-first CSS framework.
* **Shadcn/UI**: A collection of re-usable UI components. (Inferred from `src/components/ui/` and `src/lib/utils.ts`)
* **Vite**: Frontend tooling for development and bundling. (Inferred from `src/vite-env.d.ts`)

## 2. React Mania

React Mania is a rhythm game where players hit notes स्क्रॉलिंग down the screen in time with a beatmap.

### Features

* **4-Lane Gameplay**: Notes fall in four distinct lanes.
* **Key-Mapped Controls**: Uses 'F', 'G', 'K', 'L' keys for the lanes (as per mockups, actual keys are 'F', 'G', 'K', 'L').
* **Scoring and Combo System**: Players earn points for hitting notes accurately and build a combo for consecutive hits.
* **Hit Accuracy and Miss Tracking**: The game tracks hit accuracy and misses.
* **Visual Feedback**: Includes effects for hitting notes and pressed lanes.
* **Beatmap**: Comes with a predefined beatmap for gameplay.
* **Game Controls**: Start, Pause/Resume, and Reset game functionalities.

## Project Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Assuming you are using npm:
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will typically start the application on `http://localhost:8080` (for Vite projects).

## Available Scripts

In the project directory, you can run common React (Vite) scripts:

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production.
* `npm run preview`: Serves the production build locally.

## Folder Structure (Overview)
├── public/
├── src/
│   ├── components/         # UI components (reusable and Shadcn/UI)
│   │   ├── ui/             # Shadcn/UI components
│   │   └── CountryCard.tsx
│   │   └── Navbar.tsx
│   ├── hooks/              # Custom React hooks (use-mobile, use-toast)
│   ├── lib/                # Utility functions (cn)
│   ├── pages/              # Page components (Index, CountryDetail, About, NotFound, osu)
│   ├── services/           # API service integration (countriesApi)
│   ├── App.css             # Global styles for App
│   ├── App.tsx             # Main application component with routing
│   ├── index.css           # Global styles and Tailwind CSS setup
│   ├── main.tsx            # Entry point of the application
│   └── vite-env.d.ts       # Vite environment type definitions
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── README.md

## How to Use

### Country Explorer

* Navigate to the home page (`/`) to see a list of countries.
* Use the search bar to find specific countries.
* Use the filter dropdown to select countries by continent.
* Click on a country card to view its detailed information.
* Visit the `/about` page to learn more about the application.

### React Mania
* Navigate to the `/osu` page.
* Click "Start Game".
* Use the 'F', 'G', 'K', 'L' keys to hit the notes as they align with the judgment line.

---

This README provides a good starting point. You can expand on any section with more details as needed.