It can prove difficult to follow all the best practices and modern approaches while also staying backwards compatible. IE8 support is still a common project requirement nowadays and if you implement a responsive design mobile first, you will either have to use [a polyfill for media queries](//github.com/scottjehl/Respond) or convince your customer that serving the mobile version to IE8 users is OK. While both of those are valid solutions, there's also a third way.

The technique is relatively simple, it requires the use of Sass and responsive mixins. This enables us to automatically generate stylesheets without media queries, which we then conditionally load on IE8.

### Step 1 - Use mixins for responsive styling
Since Sass 3.2, we can use mixins that allow us to include styling for specific breakpoints right next to our general styling.

*Definition:*

```sass
=respond-to($point)
    @if $point == "desktop"
        @media (min-width: 1200px)
            @content
```

*Use:*

```sass
.some-class
    font-size: 16px
    +respond-to("desktop")
        font-size: 14px
```

You can learn a bit more about the technique from [this article](http://thesassway.com/intermediate/responsive-web-design-in-sass-using-media-queries-in-sass-32#variables-in-queries-using-content). it's very useful by itself, but in our case it's just a prerequisite.

### Step 2 - Generate separate stylesheet for IE8
For this step, the mixin we created above will require a bit of modification. We'll set a Sass variable to indicate whether we are generating an IE stylesheet or not. Inside the mixin we'll check this variable to decide if we should wrap the styling for a specific breakpoint in a media query (modern browsers) or just include it directly (IE8).

```sass
$ie: true

=respond-to($point)
    @if $point == "desktop" and $ie == true
        @content
    @else if $point == "desktop"
        @media (min-width: 1200px)
            @content
```
To automate the process of separate stylesheet generation, define your styling and mixins in a [partial file](http://sass-lang.com/guide#topic-4) (e.g. `_style.sass`), then create two other files (e.g. `main.sass` and `ie.sass`) in which you set the `$ie` variable and import that partial.

*main.sass:*

```sass
$ie: false
@import style
```

*ie.sass:*

```sass
$ie: true
@import style
```

Now run whatever you use for Sass compilation to build the two stylesheets.

### Step 3 - Conditionally include your stylesheets
All that's left now is to make sure IE8 loads the CSS we prepared for it and all other browsers load the regular one. We achieve this by including the stylesheets inside conditional comments.

```html
<!--[if !IE]> --><link rel="stylesheet" href="main.css"><!-- <![endif]-->
<!--[if gte IE 9]><link rel="stylesheet" href="main.css"><![endif]-->
<!--[if lte IE 8]><link rel="stylesheet" href="ie.css"><![endif]-->
```

And that's it. Check out the [demo](//github.com/mzgajner/ie8-separate-css-technique) I put up on Github for more information.

Kudos to [Beni](//github.com/benib) who demonstrated this technique to me.

EDIT: The good people of [r/webdev](//reddit.com/r/webdev/) informed me that an even more advanced implementation of this technique is available as part of [Breakpoint](//github.com/Team-Sass/breakpoint).
