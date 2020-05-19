# Getting Started

## Clone the repo and cd into it
`git clone git@bitbucket.org:nxtdtc/objective.git`
`cd objective``

### If it is the first time running this app
`npm install`

## Start Docker Stack
See ReadME for [nxt-localdev](https://bitbucket.org/nxtdtc/nxt-localdev/src/master/)

## Start
`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Styles and Linters

# Styleguide
Styleguide and coding standards can be found in [Confluence](https://sanalytics.atlassian.net/wiki/spaces/TECHNOLOGY/pages/151355397/Coding+Standards+and+Guidelines).

# Linters
There is a pre-commit hook that will fail a commit if any staged files contain eslint errors. For additional information, see [lint-staged](https://www.npmjs.com/package/lint-staged) documentation.

If in an emergecy the pre-commit hook needs to be bypassed, commit in the command line with the no verify flag:<br>
`git commit -m <commit-message> --no-verify`.
