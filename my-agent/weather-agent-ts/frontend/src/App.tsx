import Chat from "./chat";

export default function App() {
  return (
    <div className="app">
      <header>
        <div className="header-content">
          <div className="title-wrapper">
            <div className="icon-wrapper">🌤️</div>
            <h1>Weather Agent</h1>
          </div>
          <p>AI-powered weather assistant with real-time data</p>
        </div>
      </header>

      <Chat />

      <footer>
        Built with AI & OpenWeather API <span className="weather-emoji">☀️</span>
      </footer>
    </div>
  );
}
