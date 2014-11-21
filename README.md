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

## How it works

*MoJo users:* Before you get started, follow [these instructions](https://github.com/motherjones/story-tools#starting-a-new-project).

In your web page:

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

Column headers for your google spreadsheet must be 
slug,    text,    connects to, connects text,   title,   background image,
The connects to should be a | separated list of slugs which you want the page to connect to.
The connects text should be a | separated list of what you want the connectors to read.
If you like, you can designate a different character as the separator.
Note that the order of the connects to and connects text must match.

Wow. That's a bit to take in, isn't it. Why not look at <a href="https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html">an example of a spreadsheet that feeds a cyoa</a>.

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


##Hey! This thing is responsive now!
Yup. Huge thanks to our lovely friends over at the Texas Tribune.

###How It Works
Inspired by Chris Coyier's <a href="https://github.com/woothemes/FlexSlider">Flexslider</a>, it uses an absolutely positioned paragraph over an image element, rather than a background image. That's it. Two elements, in a box. You could generate more elements in the JS, if you wanted, and position them absolutely as well.

###NOTE
Because you're using images and not background images, and because they're now responsive, you need to make sure all of them are of a *minimum* height - the overflow:hidden on the viewport will hide oversized images but if an image is short, it will make the entire container short.

## Release History
This is the first release!

## License
Copyright (c) 2012 MotherJones
Licensed under the MIT, GPL licenses.
