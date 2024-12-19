# 🎥 Video-Tube

A fully functional video streaming platform built using the **YouTube Data API**. This application allows users to search, explore, and stream videos seamlessly with an intuitive and responsive user interface.

## 🌟 Features

- **Real-Time Video Streaming**: Fetch and stream videos directly from YouTube's database.
- **Search Functionality**: Responsive search bar for querying videos by keywords.
- **Category-Based Browsing**: Easily explore trending videos across categories like music, sports, gaming, and more.
- **Infinite Scrolling**: Enjoy uninterrupted browsing with dynamically loaded content.
- **Detailed Video Information**:
  - Duration
  - Channel icons
  - View counts, likes, and comments statistics
- **Enhanced UI**: A visually appealing and user-friendly interface built with Tailwind CSS.
- **optimized API Call**: optimized API usage with intelligent caching and minimal requests for faster loading.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, React-Bootstrap and Scss
- **Backend**: Firebase
- **API**: YouTube Data API

## 🚀 Live Demo

Experience the project live: [Video-Tube](youtube-clone-git-master-anwesha2002s-projects.vercel.app)

## 📸 Screenshots

- Home Page and Search Page
  
<img width="2420" alt="Untitled (14)" src="https://github.com/user-attachments/assets/ecb43a16-422f-415d-b657-89f215192190" />


- Subscription Page and Watch Page
  
<img width="2128" alt="Untitled (16)" src="https://github.com/user-attachments/assets/135a04cd-5c20-4cb6-a705-8ccc2426cd52" />


- Details Page
  
![Video Details](https://github.com/user-attachments/assets/06a0b27a-8a9d-4f7b-9f7e-a1b6cc12197e)

## 🔧 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/anwesha2002/Video-Tube.git

2. Navigate to the project directory:
   ```bash
   cd Video-Tube

3. Install dependencies:
     ```bash
    npm install

4. Set up the environment variables in a .env file:
     ```bash
    REACT_APP_APILEY=youtube_api_key

5. Start the development server
    ```bash
     npm start
   

📂 Project Structure

```plaintext
src/
├── components/        # Reusable React components
    └── styles/            # React-Bootstrap and Scss
├── pages/             # Common Route Page
├── redux/             # Redux Toolkit slices and store
├── Data/              # API service functions
└── Screen/            # Application pages
   └── styles/            # React-Bootstrap and Scss



