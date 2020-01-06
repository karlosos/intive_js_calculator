# Calculator

![https://i.imgur.com/MnvDPoe.gif](https://i.imgur.com/MnvDPoe.gif)

## Usage

Clone repository.
Open `index.html` in your browser.

## Requirements

- application works on Chrome 79 and Firefox 64
- adding, subtracting, multiplying, dividing
- floating point operations
- clearing memory and clearing entry
- equal button should return result of last operation

## Development

Install browser-sync (optionally):

```
npm install -g browser-sync
```

Starting browser-sync:

```
browser-sync start --server --files "*.html, css/*.css, src/*.js"
```

## Problems

- setting up testing environemnt - tried mocha in browser but without success
- not sure if equal button requirement is implemented correctly
