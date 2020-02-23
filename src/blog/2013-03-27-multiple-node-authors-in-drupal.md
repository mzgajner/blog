While working on the current website of [Radio Študent](//www.radiostudent.si), I wanted a node to have multiple authors, because many of the published articles were collaborations of multiple writers. I presumed Drupal would support this out of the box, since it seems like a relatively common situation, but it didn't. So here's how you can do it manually.

### Step 1 - Content type modifications

1. Add a *user reference field* allowing multiple values to the content type in question. [References module](//drupal.org/project/references) is required for this.
2. Inform editors this field should be used to enter all additional authors besides themselves when publishing articles.
3. Edit node template or use [Display Suite](http://drupal.org/project/ds) to customize node display and include your newly created field next to the primary author.

### Step 2 - Profile page modifications
Having references to all authors on the node is cool, but we also need to show all nodes of a single author on his profile page, whether he's the main author or just entered among additional authors in our new field.

1. Create a page view using [Views](https://drupal.org/project/views) and call it *All nodes by user* or something similar.
2. Set the URL of the view to */user/%* so that it will override default user profiles.
3. Install [this patch](//drupal.org/node/357082) for Views to allow passing of values from contextual filters to regular filters.
4. Filter nodes that have user ID from URL in Author field **or** in Additional authors field you created earlier.

I admit it's not the cleanest thing ever, especially with the patch requiring manual reapplication whenever Views are updated, but it seems to work well.

I was given a possible [alternative solution](//stackoverflow.com/questions/11207011/authors-nodes-page-with-views#comment14745045_11207011) when I posted this problem on Stack Overflow. It sounds even more promising, though I didn't use it at the time, because I had issues with [Rules](//drupal.org/project/rules) (ongoing problem since my childhood).
