# SDSA Checkin Kiosk

A simple standalone signin app for SDSA business meetings

## Dev Setup

- Install docker

- `bin/setup`

To run a local dev server,

- `bin/dev-server  # reachable at http://localhost:18080`

To build index.html and app.js

- `bin/build  # (outputs to dist/)`

## Usage

- Open index.html in any modern web browser.  Make sure app.js is in the same directory.

- Click settings, and import a CSV of current users exported from Nation Builder.  Optionally, you may filter the users by last name (so that you can have one machine to sign in A-M, another for N-Z)

- Then, check users in on the signin tab