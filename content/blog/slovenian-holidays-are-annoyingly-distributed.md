---
title: Slovenian holidays are annoyingly distributed
date: 2024-11-01
---

It's common to hear criticism about Slovenia having too many public holidays[^1], although in reality we seem to be [super average on that front](https://en.wikipedia.org/wiki/List_of_countries_by_number_of_public_holidays). What's more interesting to me is how they're distributed.

The maximum possible amount of work-free days in a day is 13, but that number goes down quickly because we don't observe holidays on the next workday if they fall on a weekend, we just _lose_ them. To make matters worse, we have three two-day clusters[^2] that are aligned so they always fall on the same days[^3]. This causes the actual amount of work-free days to fluctuate wildly and you often hear people discussing whether it's going to be a _good year_ or a _bad year_ when they come back to work after Christmas.

I was wondering what the actual numbers are, so I threw together a [quick script](https://github.com/mzgajner/holidays) and the results are quite interesting. On average, we get **9.5775 days off each year**, but the value fluctuates between 13 (at best) and 6 (at worst) on a 6 year period. Leap years introduce some noise, but that's still roughly right. Here's a chart for the next 50 years:

![A line chart showing the count of work free days per year in Slovenia](/slovenian-holidays-chart.svg)

Now, my impulse was always that this is kind of annoying. If the humble and hardworking people of Slovenia ever elected me as their supreme leader, we would bring the total number of holidays down to 10 while simultaneously observing them on the next workday if they happened to fall on a weekend. That way everyone's life would be a bit more stable and predictable.

On the other hand, maybe I'm looking at this wrong. Maybe good years and bad years are like the seasons, you just need to grab a beer or make some cocoa and embrace them.

[^1]: Technically speaking, not all [public holidays](https://www.gov.si/en/topics/national-holidays/) are work-free days in Slovenia and vice versa. I'm using _holidays_ because that's what normal people call them.
[^2]: Christmas + Independence Day (Dec 25, Dec 26), New Year's Day (Jan 1, Jan 2) International Worker's Day (May 1, May 2)
[^3]: Unless it's a leap year, though that doesn't change much.
