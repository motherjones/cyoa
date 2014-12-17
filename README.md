# CYOA

A "Choose Your Own Adventure" plugin for interactive storytelling, from the apps team at Mother Jones, that uses Google Spreadsheets to drive a simple and fluid story telling experience.

<p align="center">
  <img width="50%" src="https://github.com/motherjones/cyoa/blob/master/img/Screen%20Shot%202014-11-21%20at%2010.25.16%20AM.png" alt="screenshot"/>
</p>

## Examples in the wild

[Is Your Vote in Danger? Take the Test](http://www.motherjones.com/politics/2012/10/flowchart-can-i-vote)

[Are You a Slut?](http://www.motherjones.com/mojo/2012/03/flow-chart-are-you-slut)

[What's Mitt Romney's Stance on Immigration?](http://www.motherjones.com/politics/2012/06/romney-immigration-position-changes)

[Interactive Quiz: Should Texas Expand Medicaid?](http://www.texastribune.org/library/data/interactive-should-texas-expand-medicaid/)

[Want to Ditch Citizen's United? A DIY Guide](http://www.motherjones.com/politics/2012/05/citizens-united-amendment-flowchart)

[Think You Can Beat the Immigration Maze?](http://www.motherjones.com/politics/2013/02/back-line-green-card-immigration-reform-quiz)

## How it works

*MoJo users:* Before you get started, follow [these instructions](https://github.com/motherjones/story-tools#starting-a-new-project).

What this tool does is allows you to take a simple spreadsheet set up, populate with questions, answers, images and sourcing, and then let readers navigate their way through a story. Here's how you do it: 

## Set up your Google Spreadsheet

The setup is pretty straightforward. Here's what it will look like: 

<p align="center">
  <img width="50%" src="https://github.com/motherjones/cyoa/blob/master/img/Screen%20Shot%202014-11-21%20at%2011.43.58%20AM.png" alt="screenshot"/>
</p>

You can make a copy of [this template](https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html) and move the copy into the relevant beat folder in the Mother Jones Google Drive. Rename the spreadsheet as you see fit. Change the owner of the spreadsheet to MoJo Data in `Share > Advanced`.

In order for the slider to be able to read your spreadsheet, you'll need to make your new spreadsheet public. Go to `File` and click on `Publish to the web,` then click on `Start publishing`. 

A URL will appear. It will look something like this: 

```
https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html
```

Copy that link. This is your spreadsheet ID or url, which you will use to connect your spreadsheet to the slider. The part of that URL you'll really need is between the key= and the &.

## Modify your project files

*MoJo users:* By now you should have a local clone of this project repo on your machine. If you don't, go back and follow [these instructions](https://github.com/motherjones/story-tools#starting-a-new-project).

**In your copy of index.html (required):**

You're going to need to drop your key into line 12 of the index.html file (see below the line that starts "var cyoa = ...")

```html
<!DOCTYPE html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link href="css/style.css" rel="stylesheet" />
        <script src="js/jquery.js"></script>
        <script src="js/tabletop.js"></script>
        <script src="js/script.js"></script>      
        <script type="text/javascript">
            jQuery(document).ready(function() {
                    // this pulls from the spreadsheet that can be found at https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html
                var cyoa = jQuery.Cyoa('0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc',
                     { separator : ',',
                    control_location: 'bottom'
                    } 
                );
            });
        </script>
    </head>
    <body>
        <div class="cyoa_wrapper">
        <div style="clear:both" id="cyoa_container"></div>
    </div>
    </body>
</html>
```

Alternately, you can use tabletop to connect to google spreadsheet and automatically write the JSON needed to power the CYOA.

```html
<script src="jquery.js"></script>
<script src="dist/cyoa.min.js"></script>
<script src="tabletop.js"></script>
<script>
    jQuery(function($) {
        $.cyoa(
            'the key to your published google spreadsheet',
            { separator: '|' }
        );
    });
</script>
```
So long as you've set up 

Column headers for your google spreadsheet must be 
slug,    text,    connects to, connects text,   title,   background image,
The connects to should be a pipe-separated ( this is the  "|" under the delete key) list of slugs which you want the page to connect to. The connects text should also be a pipe-separated separated list of what you want the connectors to read.
If you like, you can designate a different character as the separator. Note that the order of the connects to and connects text must match.

Wow. That's a bit to take in, isn't it. Here's [our original Google Spreadsheet](https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html) again so you can remind yourself what we're talking about here.

When you make the function, you can also feed in your options; in addition to how you want to separate your info, you can choose how the controls appear the controls are 'left', 'right', 'centered', and 'split' like so:
```html
<script>
    jQuery(function($) {
        $.cyoa(
            'the key to your published google spreadsheet',
            { separator: '|',
              control_position: 'centered'
        );
    });
</script>
```

Hoping to sneak around Google's arbitrary rate limits? CYOA now supports a `tabletop_proxy` setting, which gets pased on to the Tabletop.init() call.

### NOTE
Because you're using images and not background images, and because they're now responsive, you need to make sure all of them are of a *minimum* height - the overflow:hidden on the viewport will hide oversized images but if an image is short, it will make the entire container short.

## Questions?

Hit us up by email, or Twitter: [@jaeahjlee](https://twitter.com/jaeahjlee) or [@tasneemraja](https://twitter.com/tasneemraja)

## License
Copyright (c) 2012 Mother Jones
