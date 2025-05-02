Build a GitHub markdown preview tool
- User can paste markdown, and download the GitHub-styled HTML file **or** the raw markdown file
- The tool renders an HTML preview, styled like GitHub
- The app should have a simple header + two column layout using CSS grid
- Header contains two download buttons: one for HTML, one for Markdown
- Two column layout: markdown input on the left, preview on the right
- Vanilla JS, no framework
- The app itself is minimally styled
- Light theme
- Use https://github.com/sindresorhus/github-markdown-css project to mimic the style. Sample code here:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css">
<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
<article class="markdown-body">
	<h1>Unicorns</h1>
	<p>All the things</p>
</article>