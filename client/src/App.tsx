import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [discs, setDiscs] = useState([]);

  useEffect(() => {
    axios
      .get('https://discit-api.fly.dev/disc')
      .then(({ data }) => {
        setDiscs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Discs</h2>
          <ul>
            {discs.map((disc: any) => (
              <div>
                <li key={disc.id}>{disc.name}</li>
                <img src={disc.pic} alt={disc.name} />
                <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
              </div>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

