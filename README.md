# [Download a release to get started!](https://github.com/chadbailey59/covalent/releases)

## What is Covalent?

We use Google Meet for meetings at work A LOT. I got tired of losing my meeting tab amongst all my other browser tabs. I wanted to be able to command-tab back to my meeting, or float it over other windows.

I tried using Fluid.app, which is otherwise great, but the Hangouts WebKit plugin is super crashy, and Meet simply doesn't work in WebKit. Thanks, Google! Electron to the rescue!

## Why'd you call it that?

[Electron Hangouts](https://en.wikipedia.org/wiki/Covalent_bond).

## What cool things does it do right now?

* Keeps your window always on top if you want it
* Shrinks the window to tiny size and back
* **Auto-Float**: when you switch away from your meeting, the window goes into tiny mode in the corner of your screen, then switches back to big when you come back. It's like a Slack call.
* Joins meetings by URL (File menu or Cmd-N)

## What cool things will it do soon?

* Give you a system-wide mute key
* Quickly create an ad-hoc hangout with a link already on your clipboard
* Have a cool icon (hopefully)

## How do I use it?

* [Download a release from this page](https://github.com/chadbailey59/covalent/releases)
* Open the app
* Sign in to your Google account
* Call people from that page or join meetings on your calendar
* To open a hangout from a URL, click **File ➞ Join Hangout from Url…**


## Can I open Hangouts more quickly somehow?

I'm glad you asked. Install [Browser Fairy](http://www.browserfairy.com) on your Mac. Then, create a rule to open Meet in Covalent:

![Browser Fairy Settings](https://www.evernote.com/l/AAHOH_V9vw5BYK85cihVKq01tz4-G2MgDDYB/image.png)

That way, if you open Hangouts links from [Fantastical](https://flexibits.com/fantastical), or [Alfred](https://www.alfredapp.com), or Slack, or an email app, or any other not-browser app, you'll go right to Covalent.

I'm sure there are ways to do that on other platforms too.

## Can I change some settings?

There's no UI for it, but after you first launch the app there's a file at `~/Library/Application Support/Covalent/electron-settings/settings.json` that contains some things you can tweak. Here's a running list:

* `homepage` controls the page that opens when the app launches or creates a new window.

## Can I hack on it?

Sure!

```
$ git clone https://github.com/chadbailey59/covalent
$ cd covalent
$ npm install
$ electron-forge start
```

# Can I build my own version?

Be my guest.

```
$ npm install -g electron-forge
$ cd covalent
$ electron-forge package
```

#### License [CC0 (Public Domain)](LICENSE.md)
