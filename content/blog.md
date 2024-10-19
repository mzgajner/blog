---
title: "Blog"
tags: main-nav
position: 20
---

This isn't a particularly well structured collection of posts, nor are they
masterfully written. It's more of an attempt to document personal solutions to
problems I wasn't able to easily overcome purely by reading documentation and
StackOverflow. That and my talks from random meetups.

<ul>
  {%- for post in collections.blogposts -%}
    <li>
      <span class="tag is-family-monospace">{{ post.data.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
</ul>
