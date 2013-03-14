# Responsive "Choose Your Own Adventure" Interactive

A mobile-first resdesign of the "Choose Your Own Adventure" plugin for interactive storytelling <a href="https://github.com/motherjones/cyoa">originally developed</a> by the awesome apps team at <a href=""https://github.com/motherjones>Mother Jones</a>. 

I was in love with this plugin the <a href="http://motherjones.com/mojo/2012/03/flow-chart-are-you-slut">the first time I saw it used</a>; I think it's a really interesting and fun way to get readers involved in the decision making process. So I'm geeked to be contributing to its use on multiple devices.


## Demos
I helped a Texas Tribune reporter make <a href="http://www.texastribune.org/library/data/interactive-should-texas-expand-medicaid/">this story</a> on Medicaid expansion; we'd recently made our site responsive so it seemed like a good idea to revamp the plugin from mobile-first standpoint.  

You can see the result <a href="http://www.amandakrauss.com/cyoa_demos/cyoa_demo3.html">here</a> (resize your browser to really see it in action), or the revised MoJo demos <a href="http://www.amandakrauss.com/cyoa_demos/cyoa_demo.html">here</a> (kittehs!) and <a href="http://www.amandakrauss.com/cyoa_demos/cyoa_demo2.html">here</a> (gifs!). 

##How It Works
Inspired by Chris Coyier's <a href="https://github.com/woothemes/FlexSlider">Flexslider</a>, I decided to use an absolutely positioned paragraph over an image element, rather than a background image - which IMHO is not terribly inclined to be responsive. That's it. Two elements, in a box. You could generate more elements in the JS, if you wanted, and position them absolutely as well.

###NOTE
Because you're using images and not background images, and because they're now responsive, you need to make sure all of them are of a *minimum* height - the overflow:hidden on the viewport will hide oversized images but if an image is short, it will make the entire container short.

The decision-making controls (which turn into friendly menu-like buttons on mobile) were inspired by my tests with Zurb's responsive foundation as well as my previous work on reponsifying the Texas Tribune site. They're at the bottom because on mobile it won't ever make sense to have the answers before the questions.

## Using CYOA To Tell Gripping Stories and/or Tales of Woe

The <a href="https://github.com/motherjones/cyoa">original repo</a> has a lot of helpful documentation and demos. What follows is a summary thereof.

First you neeed to install and load cyoa.js and cyoa.css on your html page. You also need the following div in the HTML, so the plugin can build the show:

```html
<div class="cyoa_container"></div>
```
 
You call the function in the head like so:

```html
<script>
    jQuery(function($) {
        $.cyoa(
            'the key to your published google spreadsheet',
            { separator: '|' }
        );
    });
</script>
```
The hardest part (I think) is that you need a source to tell the CYOA function what text, images, and choice to use. CYOA expects JSON for this. You can either build it into the script (see <a href="https://github.com/risatrix/cyoa/blob/master/demo/cyoa_demo.html">demo 1</a>) or feed in a Google spreadsheet via tabletop.js (see this <a href="http://www.mikeball.us/blog/using-google-spreadsheets-and-tabletop-js-as-a-web-application-back-end">excellent tutorial and <a href="https://github.com/risatrix/cyoa/blob/master/demo/cyoa_demo2.html">demo 2</a>). 

When you make the function, you can also feed in your options; in addition to how you want to separate your info, you can choose how the controls appear the controls are 'left', 'right', 'centered', and 'split' like so:
```html
<script>s
    jQuery(function($) {
        $.cyoa(
            'the key to your published google spreadsheet',
            { separator: '|',
              control_position: 'centered'
        );
    });
</script>
```

And there you have it. Unless it doesn't work, in which case get ye to the console log!