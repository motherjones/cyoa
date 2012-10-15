# MJ CYOA

A "Choose Your Own Adventure" plugin for interactive storytelling, from the apps team at Mother Jones.

## See it in action!
The internets loved our <a href="http://motherjones.com/mojo/2012/03/flow-chart-are-you-slut">first implementation</a> of this container (trigger warning: cute kittens within).

<a href="http://www.motherjones.com/politics/2012/05/citizens-united-amendment-flowchart">Here's an implementation</a> where the user walks through what it would take to overturn the landmark <em>Citizen United</em> campaign finance decision.

Mother Jones' reporters made <a href="http://www.motherjones.com/politics/2012/06/romney-immigration-position-changes">this implementation</a> all by themselves, with almost zero help from our interactives team: it's a little game showing Mitt Romney's stance on immigration over time.

## Getting Started
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

Alternately, connect to google spreadsheet.

```html
    jQuery(function($) {
        $.cyoa(
            'the key to your published google spreadsheet',
            { separator: '|' }
        );
    });
```

Column headers for your google spreadsheet must be 
slug,    text,    connects to, connects text,   title,   background image,
The connects to should be a | separated list of slugs which you want the page to connect to.
The connets text should be a | separated list of what you want the connectors to read.
If you like, you can designate a different character as the separator.
Note that the order of the connects to and connects text must match.

## Release History
This is the first release!

## License
Copyright (c) 2012 Ben Breedlove  
Licensed under the MIT, GPL licenses.

## Contributing (this is all totally optional)
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt` to install the latest version. _You may need to run `sudo npm install -g grunt`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.

### Installing PhantomJS

In order for the qunit task to work properly, [PhantomJS](http://www.phantomjs.org/) must be installed and in the system PATH (if you can run "phantomjs" at the command line, this task should work).

Unfortunately, PhantomJS cannot be installed automatically via npm or grunt, so you need to install it yourself. There are a number of ways to install PhantomJS.

* [PhantomJS and Mac OS X](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
* [PhantomJS Installation](http://code.google.com/p/phantomjs/wiki/Installation) (PhantomJS wiki)

Note that the `phantomjs` executable needs to be in the system `PATH` for grunt to see it.

* [How to set the path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
* [Where does $PATH get set in OS X 10.6 Snow Leopard?](http://superuser.com/questions/69130/where-does-path-get-set-in-os-x-10-6-snow-leopard)
* [How do I change the PATH variable in Linux](https://www.google.com/search?q=How+do+I+change+the+PATH+variable+in+Linux)
