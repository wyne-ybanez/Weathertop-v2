# WeatherTop V2

WeatherTop is a web application where members can submit weather reports from their stations to
the website where their entries are recorded, capturing the reading from a specific time. Each
member can create any number of weather stations records. The web application utilises weather
analytics and conversions for each reading which is automatically calculated when a report is made.

To access the project: Whilst in the project directory, type in your terminal enter `npm run start`

Go to `http://localhost:4000` or whichever port your console is telling you to go to.

<strong>Test Account:</strong>

- User: `homer@simpson.com`
- Password: `secret`

## Disclaimer

WeatherTop is not maintained. API's will have changed their structures over time and may become subscription services to which I am not subscribed to. Despite this, the project was created to function properly with the versions of the API and dependecies as to when it was created originally.

## Project Goal

The goal of the project is to create a web app that incorporates the principles of CRUD and designed
according to the MVC pattern. The project will achieve this by allowing users to create accounts,
stations, weather reports and either edit or delete these as the user pleases. The web app provides
only a very specific function by recording weather reports and providing a date/time recording of
these reports. Thus, each recording will not be edited, however, user information can be edited by
the user.

## UX

### Strategy

The user would like to record weather reports on the web app. The application must portray that it
functions to serve this exact purpose from the get go. The application will be simple in design and
will have a logical, almost natural flow where a page will have necessary and useful links and forms
to help the user begin recording reports.

### Scope

Features planned:

- Website Title and purpose immediately communicated
- Navigation Menu
- stored JSON database to save data records and users profiles
- Login functionality
- Logout functionality
- CRUD functionality for records and profiles
- Registered user station creation and management
- Trend Graphs
- Map markers for each station owned by the user

### Structure

The following main pages will be implemented:

- Base Page - main.hbs

- Sign Up Page - signup.hbs

- Log In Page - login.hbs

- About page, explains the web app and its purpose - about.hbs

- Home page, displays what the app is about - index.hbs

  - Menu should the user have logged in - menu.html

- Dashboard, displays user records (Stations), allows users to add stations and delete stations - dashboard.html

  - Create station - addstation.html

- Station details - station.html

  - Displays a list of the readings relating to the station - listreadings.hbs
  - Create a report and record it in the station's readings list - addreading.hbs

- Account details Page - accounts.hbs
  - Edit account details page - editaccount.hbs

### Skeleton

- Start Page: <br>
  ![Start](public/images/weathertop-start.png)

- Register: <br>
  ![Register](public/images/weathertop-signup.png)

- Log In: <br>
  ![LogIn](public/images/weathertop-login.png)

- Profile: <br>
  ![Account](public/images/weathertop-account.png)

- Dashboard: <br>
  ![Dashboard](public/images/weathertop-dashboard.png)

- About: <br>
  ![About](public/images/weathertop-about.png)

- Station: <br>
  ![Station](public/images/weathertop-station.png)

### Surface

#### Frameworks

- Main template frameworks used
  - Fomantic UI (https://fomantic-ui.com/)
  - Express
  - Handlebars

#### Colour Scheme

- Main Colors

  - White
  - Fomantic Blue
  - Fomantic Green

- Secondary Colors, used for icons
  - blueviolet
  - red
  - dodgerblue
  - forestgreen
  - orange

#### Fonts

- Montserrat is the main font-family for the website
- Sans-serif if the backup font-family for the website

## Features

### Simple Design:

The web app incorporates a simple design which is easy to understand and traverse as the user
explores the website.

The website is also responsive for mobile display.

Each page provides a menu, links and forms to relevant areas of the web app. The colors are simple
with white and blue being the main colors. The site maintains this theme on all pages only
diverging from this color scheme when going to the dashboard. This is meant to allow the user to
distinguish between differing station information, usually through icons. This portrays an
easy to understand, easy to use application.

### Efficiency:

The web app incorporates a utilities folder with the follow files: 'conversions' and 'station-analytics'.
This utilities folder is utilised in the web app for automatic calculations. The user's readings
will be converted to its relevant data as per the user's input. Hence, it is an efficient system
as the user will not need to do this from scratch.

### Convenience:

The web app also incorporates and runs its own database record. It is also deployed through Heroku. Hence, many users can access the site, create accounts and begin recording their own weather readings through their respective stations. This data is then recorded in a JSON file within the models directory and is identified according to the user's member_id.

## Testing

The web app has been tested by creating a test account and inputting a test station and test reading.
This data has been successfully saved and this is reflected on 'localhost:4000'
when viewing the site during development.

## Technologies used:

### Languages

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [Javascript](https://www.javascript.com/)

### IDE

- [Visual Studio Code](https://code.visualstudio.com/) - The IDE used to code the website.

### Frameworks, Libraries, CDN's, Resources etc.

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Fomantic UI](https://fomantic-ui.com/)

## Version Control

### Github & Sourcetree

1. Log into Github/Register for a Github account. Here is a link: https://github.com/
2. Log into Bitbucket/Register for a Bitbucket account: https://bitbucket.org/
3. Install Sourcetree: https://www.sourcetreeapp.com/
4. In the Sourcetree settings, select Authentication and add a Github account (if you already have
   a Github account set up, it might be simpler to use your personal access token).
5. Go to your github profile settings and click on "Developer settings" at the side menu.
6. Go to Personal Access Tokens, Press generate token.
7. The token can be set to unlimited (which is not recommended). Perhaps select 90 days. Give the
   token a name and press the Generate token button. You will then see the generated token and be able
   to copy it to the clipboard.
8. Back in Sourcetree, click 'Refresh Password'.
9. Here you will be pasting in the token generated on the Github site (in your clipboard hopefully).
   Press Ok.
10. Create a new repository on Github.
11. Back in Sourcetree, press the local button.
12. Create a repository with the local project folder on your device.
13. You can now 'stage' all the sources in the project by pressing the 'Stage All' button.
14. You can enter a commit message down below the Sourcetree app, which is your commit message.
15. Select master on the left, update the repository with the commit message.
16. In Sourcetree, select Repository-Repository Settings, Press add, and enter the remote name: 'origin', the URL path
    is the repository path we have created.
17. Back in the main Sourcetree window, press 'Push'. Thus, sending your files to the github remote
    repository.

### Forking the Repository

You can fork the repository through the following steps. Forking the repository means you will have a copy of the repository and any changes you make will not affect the original repository.

1. Log in to GitHub and locate the GitHub Repository. Here is a link for the [repository](...)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu. Looking towards the right of the page. Locate the button "Fork" then click
3. You should now have a copy of the original repository in your GitHub account

### Local Clone

This is used when you would like to make changes to the project code

1. Should you wish to use a different IDE like VSCode. You first log in to Github and locate the required repository. Here is the link for this [repository](...)
2. Open a new terminal on Git Bash
3. Type `git clone`, and then paste the URL you copied

```
$ git clone https://github.com/wyne-ybanez/weather-top
```

Here is a link that can explain this process further. [Click Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop)

## Deployment

The app is deployed on Heroku using this repository as the main branch: https://www.heroku.com/

## Bugs

- There is an error 500 bug that occurs when a new user updates their account details. This bug requires a future fix but for the moment, an error may occur when submitting account detail updates.

## References

### External Solutions:

- Formatting JS Date:

  - https://stackoverflow.com/questions/12945003/format-date-as-yyyy-mm-ddthhmmss-sssz

- Sorting Stations:
  - https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

### Content

Content for the About page was taken from these websites

- https://en.wikipedia.org/wiki/AccuWeather
- https://www.acurite.com/gdpr
- https://www.weatherstationadvisor.com/

### Media

- Images for start.html banner, login.html banner and signup.html banner derived from Google.

- Images:
  - Start Page image: https://365webresources.com/weather-icon-sets-shouldnt-miss/
  - Login Page image: https://www.decolore.net/weather-forecast-icon-sets/
  - Registration page image: https://metro.co.uk/2018/02/26/iphone-weather-symbols-mean-7343734/

## Future Implementations

- I would like to add a footer for the webapp.
- I would like to add toasts to the website to make it more user-friendly.
- Error 404, error 500 handlers

## Acknowledgements

- Thanks to the SETU lecturers and students on Slack for their guidance on this project.
