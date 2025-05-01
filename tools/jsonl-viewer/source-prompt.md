<goal>implement a JSONL viewer.</goal>

<requirements>
- Implement with vanilla JS. Very minimum styling. Use as much browser default styling as possible.
- Use `https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker` to access local file.
- The "Open JSONL File" button must always be visible in a header row at the top of the app (do not use modal or hide the main UI).
- Use a master-detail layout with a CSS grid:
  - Row 1: header (auto height)
  - Row 2: left panel (350px) and right panel (1fr)
  - The left panel is a virtualized, paginated list of JSONL lines.
  - The right panel displays the formatted JSON for the selected line.
- The left panel list must be optimized for performance, using paginated loading:
  - You can assume the file is stable.
  - Use a virtualized list.
- Virtualization strategy:
  - You can first scan the entire file to get the number of lines, and where each line begins and ends in terms of byte offset. Do NOT persist the file in memory.
  - Render the skeleton of items based on number of lines. Make sure each item is fixed height. In the DOM, use attribute to save the byte offset of the item.
  - As user scrolls up/down, use intersection observer to determine which items should be loaded into and cleared from the skeleton.