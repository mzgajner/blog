export default async function(eleventyConfig) {
  // Set input, layout and data directories
  eleventyConfig.setInputDirectory('content');
  eleventyConfig.setLayoutsDirectory('../_includes');
  eleventyConfig.setDataDirectory('../_data');

  // Pass static files through
  eleventyConfig.addPassthroughCopy({ "_static": "." });

  eleventyConfig.addCollection("blogposts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.data.date - a.data.date);
  });
};
