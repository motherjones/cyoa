# CYOA

A "Choose Your Own Adventure" plugin for interactive storytelling, from the apps team at Mother Jones.
* Uses jQuery for easy placement.
* Uses TableTop 
* Uses Google Spreadsheets <a href="https://docs.google.com/spreadsheet/pub?key=0AswaDV9q95oZdHRQUlVQcDBJRU44NFdzc3lIeElkQXc&output=html">like this one</a>
* Responsive, for displaying nicely on mobile screens.

## Demos
The internets loved our <a href="http://motherjones.com/mojo/2012/03/flow-chart-are-you-slut">first use</a> of this container (trigger warning: cute kittens within).

<a href="http://www.motherjones.com/politics/2012/05/citizens-united-amendment-flowchart">Here's an example</a> where the user walks through what it would take to overturn the landmark <em>Citizen United</em> campaign finance decision.

Mother Jones' reporters made <a href="http://www.motherjones.com/politics/2012/06/romney-immigration-position-changes">this story</a> all by themselves, with almost zero help from our interactives team: it's a little game showing Mitt Romney's stance on immigration over time.

A Texas Tribune reporter used this to make <a href="http://www.texastribune.org/library/data/interactive-should-texas-expand-medicaid/">this story</a> on Medicaid expansion. 

## Using CYOA To Tell Gripping Stories and/or Tales of Woe
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/motherjones/cyoa/master/dist/cyoa.min.js
[max]: https://raw.github.com/motherjones/cyoa/master/dist/cyoa.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/cyoa.min.js"></script>
<link href="../css/cyoa.css" rel="stylesheet" />
<script>
jQuery(function($) {
        $.cyoa({
            start : {  // default start page, if you want to call it something different, you have to set it in the options
                img: 'http://www.url/img.png',
                connects: [ 
                    { 'link' : 'page_2',
                      'html' : 'Some text here'
                    }, {
                      'link' : 'death_by_water',
                      'html' : 'The hanged man'
                    }, {
                      'link' : 'foobarbaz',
                      'html' : 'variables'
                    }
                ]
            },
            page_2 : {
                html: '<h1>Arbitrary html goes here !!! WhoooO!!!',
                connects: [
                    { 'link' : 'death_by_water',
                      'html' : 'I hate fortune tellers'
                    }
                ]
            },
            death_by_water : {
                img: 'http://wasteland.org/fear.jpg',
                select_img: 'http://placekitten.com/100/100' //optional
            }
        },
        {
            container: 'id of html element which holds the story',
            start_page : 'optional, the key of the story page you start on, defaults to "start"'
        }
); // makes a wasteland story
        });
</script>
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
