let userName = '';

function generateGreeting() {
  const date = new Date();
  const hour = date.getHours();
  let greeting = '';

  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  document.getElementById('greeting').innerText = `${greeting}, ${userName}!`;
}

function generateJoke() {
  fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => {
      let joke = '';

      if (data.type === 'twopart') {
        joke = `${data.setup} ${data.delivery}`;
      } else {
        joke = data.joke;
      }

      document.getElementById('joke').innerText = joke;
    });
}

function init() {
  chrome.storage.sync.get(['name'], (result) => {
    if (result.name) {
      userName = result.name;
    } else {
      userName = prompt('What is your name?');
      chrome.storage.sync.set({ name: userName });
    }

    generateGreeting();
    generateJoke();
  });
}

init();
