# Prototiip

**Have you ever been discouraged from starting a project because setting up the whole thing in *production mode* felt overwhelming ?**

This starter project aims at providing a quick solution for in-browser prototyping of your next project.

It's not supposed to be used further than the prototyping phase as you should then migrate your frontend to your chosen technology.

## Usage

Simply clone this repository and run:
```
yarn dev
```

The current setup provides the minimal files to demonstrate the functionality offered:
* Page templates / layouts / partials using **handlebars.js**
* Routing to your templates using **express**
* Live reloading of your files using **browsersync & parcel**

## View switching

The setup adds a "view switcher" in the form of a bar at the bottom of your browser.

This works by parsing the first lines of your templates looking for two types of comments:

### Page annotation
```hbs
{{! page: Home }}
<h1>Home</h1>
<a href="/about">About</a>
```
If found in your views, this annotation will add the current page as a link in the view switcher.

### Mode annotation
```hbs
{{! page: About }}
{{! mode: Alt mode %%% altMode }}
```
If found in your view, this annotation will add a "mode" for the current view. The goal of this feature is to enable some alternate way of displaying your views. (e.g. a form with errors displayed).

When a mode is active, you can test for it in your views with the if helper from handlerbars:
```hbs
{{! page: About }}
{{! mode: Alt mode %%% altMode }}
{{! mode: Alt mode 2 %%% altMode2 }}
<h1>about</h1>
{{#if altMode}}
  This will be displayed if mode "Alt mode" is active
{{/if}}
{{#if altMode2}}
  This will be displayed if mode "Alt mode 2" is active
{{/if}}
```

## :warning: Warnings
You have to name your default template "home.hbs" as it's hardcoded in the server code.