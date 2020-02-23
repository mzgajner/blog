This blogpost is based on a short talk I gave at the [first Slovenia CSS user group meetup](http://www.meetup.com/slovenia-CSS-user-group/events/220405959/) in February 2015 and originally written for the [Origammi company blog](http://www.origammi.co/en/blog/sass). It's a collection of random techniques that can be used with the latest version of Sass to make styling cleaner and lighter.

### Placeholder selectors vs. mixins
While writing Sass code, placeholder selectors and mixins appear to be quite similar. You declare them, include a bit of styling and then either include the mixin or extend the placeholder selector when styling an element. The end result is that the styling from the mixin/placeholder selector will be applied to the element in question.

What may not be so obvious in this process is the fact that the produced CSS is actually different in both cases.

If we take the following Sass code ...

```sass
=foo
  color: red
.foo-1
  +foo
.foo-2
  +foo

%bar
  color: red
.bar-1
  @extend %bar
.bar-2
  @extend %bar
```

... the produced CSS will look like this:

```css
.foo-1 {
  color: red; }
.foo-2 {
  color: red; }

.bar-1, .bar-2 {
  color: green; }
```
As you can see, it is much better to use placeholder selectors when we are just trying to reuse a chunk of styling, as the selectors will be smartly combined instead of the properties being duplicated.

### Placeholder selectors in mixins
The first example might be a bit contrived, since mixins are usually used with parameters, which placeholder selectors don't support. Let's have a look at an example of a button mixin:

```sass
=button($background-color, $font-color)
  color: $font-color
  background-color: $background-color
  border-radius: 5px
  line-height: 10px

.button-brown
  +button(saddlebrown, white)

.button-green
  +button(aquamarine, black)
```

This produces the following CSS:

```css
.button-brown {
  color: white;
  background-color: saddlebrown;
  border-radius: 5px;
  line-height: 10px; }

.button-green {
  color: black;
  background-color: aquamarine;
  border-radius: 5px;
  line-height: 10px; }
```

While this is good enough, it can still be optimised further. We can extract any properties that don't depend on parameters to a placeholder selector and have the mixin extend it:

```sass
%button-common
  border-radius: 5px
  line-height: 10px

=button($background-color, $font-color)
  @extend %button-common
  color: $font-color
  background-color: $background-color

.button-brown
  +button(saddlebrown, white)

.button-green
  +button(aquamarine, black)
```

This way, only the properties we pass as parameters are (unavoidably) duplicated, while the common ones are applied in a cleaner way:

```css
.button-brown, .button-green {
  border-radius: 5px;
  line-height: 10px; }

.button-brown {
  color: white;
  background-color: saddlebrown; }

.button-green {
  color: black;
  background-color: aquamarine; }
```

### Many uses of the parent selector
A very useful feature in Sass is the `&` symbol, which allows us to access the parent selector in a nested context. If you use Sass, there's a good chance you're already using it for simpler purposes such as the following ...

```sass
.foo
  &.bar
    background: blue

  &:hover
    background: red

  &:after
    content: ''
```

... which produces:

```css
.foo.bar {
  background: blue; }

.foo:hover {
  background: red; }

.foo:after {
  content: ""; }
```

But there are many less known uses for it and they can all be extremely useful if you like to keep as much styling nested under the same selector as possible.

#### Referencing an external parent class
If you want to apply some styles to the current selector when it appears in some specific external context, e.g. when there is a specific body class applied, you can do the following:

```sass
.foo
  .body-class &
    background: pink
```

```css
.body-class .foo {
  background: pink; }
```

#### Adding an element selector
You can't specify an additional element selector (e.g. `h1&`) in the context of `.foo` to get a combination such as `h1.foo`, but it's still doable with just a tiny bit more code.

```sass
.foo
  @at-root #{selector-unify(&, h1)}
    background: orange
```

```css
h1.foo {
  background: orange; }
```

#### Adjacent sibling tricks
The [adjacent sibling selector trick](https://css-tricks.com/almanac/selectors/a/adjacent-sibling/) is useful in cases where you want to apply some styling to all sibling elements except the first one. It's an alternative to applying it to all elements and then overriding it for the first one and it's really easy to do with the `&` parent selector.

```sass
.foo
  & + &
    margin-left: 20px
```

```css
.foo + .foo {
  margin-left: 20px; }
```

#### OOCSS
If you want to break your styling down into a bunch of reusable classes that can be applied in combinations (kind of what [Bootstrap](http://getbootstrap.com/) and similar frameworks do with their components), you can do this in a very clean way and keep all classes for one component nested under the same selector.

```sass
.button
  font-size: 10px
  line-height: 20px

  &-warning
    background: red
    color: white

  &-success
    background: green
    color: black
```

```css
.button {
  font-size: 10px;
  line-height: 20px; }

.button-warning {
  background: red;
  color: white; }

.button-success {
  background: green;
  color: black; }
```

### @content directive
Since version 3.2, Sass supports the extremely useful @content directive (I briefly mentioned it in an [older post](/blog/mobile-first-on-ie8-without-polyfills)), which allows you to specify properties under a mixin call and use the mixin to write a nesting context. The following example demonstrates how this can be used to apply IE6-specific styling using a hack or apply media queries transparently.

```sass
=ie6-only
  * html &
    @content
.foo
  +ie6-only
    background-image: url(/logo.gif)

=desktop
  @media only screen and (min-width: 769px)
    @content
.foo
  background: blue
  +desktop
    background: red
```

```css
* html .foo {
  background-image: url(/logo.gif); }

.foo {
  background: blue; }
@media only screen and (min-width: 769px) {
  .foo {
    background: red; } }
```

### JSONizing Sass maps
Sass maps are often used to extract configuration values (font sizes, colours, breakpoints etc.) from the actual styling. Sometimes these configuration values are also required in your JavaScript code. An example of this might be when you define breakpoint sizes in Sass and want to do some media query based scripting.

For these occasions, you can use Sass to generate JSON objects and store them in the `content` property (it can also be `font-size` or anything else that allows random strings) of a hidden pseudoelement. You can then access those elements with JS, get the value from the property, parse the JSON and voila - your configuration is accessible in JavaScript.

```sass
$breakpoints: ('mobile' : '(max-width: 768px)', 'desktop': '(min-width: 769px)')

$breakpoint-json: null

@each $name, $value in $breakpoints
  $breakpoint-json: append($breakpoint-json,
    "\"#{$name}\":\"#{map-get($breakpoints, $name)}\"", comma)

$breakpoint-json: "{#{$breakpoint-json}}"

body::before
  content: $breakpoint-json
  display: none
```
```css
body::before {
  content: '{"mobile":"(max-width: 768px)", "desktop":"(min-width: 769px)"}';
  display: none; }
```

### Summary
These are just a few examples of what can be done with different features of Sass, you can find a bunch of similar tricks and use cases on [The Sass Way](http://thesassway.com/) blog. If you're only using Sass for the nesting, you're missing out on a lot of cool stuff, so check out the examples and start using it in real projects - it's really worth it.
