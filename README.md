# MyMap - Interactive Social Map

MyMap is a Single Page Application (SPA) that allows users to discover, add, and rate new places on an OpenStreetMap based map. The project combines geolocation functionalities with gamification elements (points and ranks for activity).

## 🚀 Features

### 🗺️ Map and Navigation
 **Interactive Map:** Browse the world map based on OpenStreetMap and Leaflet.
- **Geolocation:** Quickly find your position using the "Znajdź mnie!" button.
- **Route Planning:** Draw a straight navigation line and calculate the distance between the user and the selected point.
- **Filtering:** Search for places by name, category (e.g., Zabytki, Restauracje), and distance radius (range slider).

### 👤  User and Community
- **Account System:** Simulated login (no password, based on username).
- **Gamification:** Ranking and reputation point system (+10 points for adding a location, +5 points for a review).
- Ranks: From "Dopiero zaczynam" to "Mistrz Mapy."
- Progress bar visualizing the path to the next level.
- **Reviews and Ratings:** Ability to add reviews with rating to locations.
  
### 🛠️ Content Management
- **Adding Places:** Clicking on the map opens the point addition form.
- **Reverse Geocoding:** Automatically retrieves addresses based on coordinates using OpenStreetMaps API Nominatim.
- **Photos:** Support for adding photos to points (converted to Base64).
- **Favorites (Offline):** Save places to a favorites list, available in a separate tab.

### 🛡️ Administrator Panel
- Available only to the username `admin`.
- Table of all points with the ability to edit and delete them.

## 💻 Tech Stack
The project was built using modern frontend tools:
- **Core:** React 18, Vite.
- **Map:** Leaflet, React-Leaflet.
- **Style:** SCSS (Sass) using variables and mixins.
- **Routing:** React Router DOM.
- **Asynchronous State:** TanStack Query (React Query).
- **Data Storage:** `localStorage` (Data is persistent in the browser but does not require an external backend).
  
## ⚙️ How to run
1. **Clone the repository:**
   ```bash
   git clone <adres-repozytorium>
   cd react-map
   ```
2. **Instal dependencies:**
  ```bash
  npm install
  ```
3.**Run a development server**
```bash
  npm run dev
  ```
**Or you can use the GitHub pages deployed version at 
https://ndolinska.github.io/react-map/
(some features may not work correctly).**
