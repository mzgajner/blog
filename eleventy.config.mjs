import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";

export default async function(eleventyConfig) {
  // Set input, layout and data directories
  eleventyConfig.setInputDirectory('content');
  eleventyConfig.setLayoutsDirectory('../_includes');
  eleventyConfig.setDataDirectory('../_data');

  // Pass static files through
  eleventyConfig.addPassthroughCopy({ "_static": "." });

  // Generate two collections, one of blogposts and one of main nav items
  eleventyConfig.addCollection("blogposts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.data.date - a.data.date);
  });
  eleventyConfig.addCollection("navbar_items", function (collectionApi) {
    return collectionApi.getFilteredByTag('main-nav')
      .sort((a, b) => a.data.position - b.data.position);
  });

  // Enable footnote plugin for default markdown parser
  eleventyConfig.setLibrary("md", markdownIt().use(markdownItFootnote));
};
