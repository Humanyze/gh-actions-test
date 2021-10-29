import logo from './logo.svg';
import './App.css';

function goBoom(e) {
  throw new Error('Boom!');
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Github Actions can build and deploy your code
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={goBoom}>Make a sentry Error</button>
      </header>
    </div>
  );
}

export default App;
