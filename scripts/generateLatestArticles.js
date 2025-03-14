const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const docsDir = path.join(__dirname, "../docs");
const outputPath = path.join(__dirname, "../static/latest-articles.json");

// Function to parse and format date in US format
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const parsedDate = new Date(dateStr);
  if (isNaN(parsedDate)) return null;
  
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // ✅ Converts to "Month Day, Year"
};

// Function to extract the first `# Title`
const extractTitleFromContent = (content) => {
  const match = content.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : null;
};

// Function to extract <CustomImage> src and alt attributes
const extractImageFromContent = (content) => {
  const match = content.match(/<CustomImage\s+[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']+)["'][^>]*>/);
  return match ? { src: match[1], alt: match[2] } : { src: null, alt: null };
};

// Recursive function to get all markdown files in the docs directory
const getAllMarkdownFiles = (dir) => {
    let files = [];
    fs.readdirSync(dir).forEach((file) => {
      if (file.startsWith("_")) return; // ✅ Skip files with an underscore prefix
  
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        files = files.concat(getAllMarkdownFiles(fullPath)); // Recursively add files from subdirectories
      } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
        files.push(fullPath);
      }
    });
    return files;
  };
  

// Function to clean and format links properly
const cleanPath = (filePath) => {
  let parts = filePath.replace(/\\/g, "/").split("/"); // Normalize paths & split into directories

  parts = parts.map((part, index) => {
    if (index < parts.length - 1) {
      // ✅ Directory: Remove numbers, encode spaces as `%20`
      return encodeURIComponent(part.replace(/^\d+-/, ""));
    } else {
      // ✅ File: Remove number, keep lowercase
      return part.replace(/^\d+-/, "").toLowerCase().replace(/\.mdx?$/, ""); // Remove number & extension
    }
  });

  return parts.join("/");
};

// Process all markdown files
const articles = getAllMarkdownFiles(docsDir)
  .map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const frontMatter = matter(content);
    const relativePath = path.relative(docsDir, filePath);

    const title = frontMatter.data.title || extractTitleFromContent(frontMatter.content) || path.basename(relativePath, path.extname(relativePath));
    const formattedDate = formatDate(frontMatter.data.date); // ✅ Convert date to "Month Day, Year"

    if (!formattedDate) return null; // ✅ Skip articles without a valid date

    // ✅ Generate the cleaned link for Docusaurus
    let docLink = `/docs/${cleanPath(relativePath)}`;

    // ✅ Remove 'index' if it's an index page
    if (docLink.endsWith("/index")) {
      docLink = docLink.replace("/index", "");
    }

    const { src, alt } = extractImageFromContent(frontMatter.content);

    console.log(`✅ File: ${relativePath}, Title: ${title}, Date: ${formattedDate}, Link: ${docLink}`);

    return { title, link: docLink, date: formattedDate, image: src, alt };
  })
  .filter((article) => article !== null) // Remove invalid articles
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest to oldest
  .slice(0, 100); // Keep only the latest 100

// Save to JSON
fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
console.log("✅ Latest articles list updated with formatted dates.");
