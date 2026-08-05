import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App.jsx';

function component() {
  const element = document.createElement("div");

  element.innerHTML = "<div id='app'></div>";

  return element;
}

document.body.appendChild(component());

const app = createRoot(document.getElementById('app'));

app.render(<App/>);