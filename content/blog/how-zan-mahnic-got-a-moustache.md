---
title: How Žan Mahnič got a moustache (talk)
date: 2018-12-06
---

I gave this talk twice, once in [Belgrade](https://www.meetup.com/UnitedCloud-Meetups/events/255939928/) in November 2018 and once more in [Ljubljana](https://www.meetup.com/vue-slovenia/events/256626553/) about a month later. The narrative was built around a really strange bug we encountered on [Parlameter](https://parlameter.si/): portraits of two politicians were sometimes swapped, causing one of them to sport a moustache he lacked in real life (hence the cryptic title).

The debugging rabbit hole led us from this simple user-facing error all the way down to the fact that certain versions of Chrome use(d) an unstable QuickSort implementation when sorting arrays longer than 10 elements. It made for an entertaining war story I still love to tell over beers.

Slides are [here](/slides/Mato%20Žgajner%20-%20How%20Žan%20Mahnič%20got%20a%20mustache.pdf) and there's also a [recording](https://vimeo.com/305531085/cb7f0dd93d#t=30m0s) available.
