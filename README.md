# [Download a release to get started!](https://github.com/chadbailey59/covalent/releases)

## What is Covalent?

We use Google Hangouts for meetings at work A LOT. I got tired of losing my Hangouts tab amongst all my other browser tabs. I wanted to be able to command-tab back to my meeting, or float it over other windows.

I tried using Fluid.app, which is otherwise great, but the Hangouts WebKit plugin is super crashy. So Electron to the rescue!

## Why'd you call it that?

[Electron Hangouts](https://en.wikipedia.org/wiki/Covalent_bond).

## What cool things does it do right now?

* Gives you an always-on-top window if you want it
* Allows you to join by URL (File menu or Cmd-N)
* Quickly give you a small window (tiny mode)

## What cool things will it do soon?

* Give you a system-wide mute key
* Quickly create an ad-hoc hangout with a link already on your clipboard
* Manage windows better
* Have a cool icon (hopefully)

## Can I open Hangouts more quickly somehow?

Sure! Install [Browser Fairy](http://www.browserfairy.com) on your Mac. Then, create a rule to open Hangouts in Covalent:

![Browser Fairy Settings](https://www.evernote.com/l/AAHOH_V9vw5BYK85cihVKq01tz4-G2MgDDYB/image.png)

That way, if you open Hangouts links from [Fantastical](https://flexibits.com/fantastical), or [Alfred](https://www.alfredapp.com), or HipChat, or an email app, or any other not-browser app, you'll go right to Covalent.

I'm sure there are ways to do that on other platforms too.

## Can I hack on it?

Sure!

```
$ git clone https://github.com/chadbailey59/covalent
$ cd covalent
$ npm install
$ npm start
```

# Can I build my own version?

Be my guest.

```
$ npm install electron-packager -g
$ electron-packager . --platform=darwin --arch=x64 --extend-info extra.plist --overwrite --out builds
```

#### License [CC0 (Public Domain)](LICENSE.md)
