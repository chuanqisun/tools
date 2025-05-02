Write a single HTML file showing 17 logos evolving following the game of life rules.
<requirements>
  <format>Single HTML file implement</format>
  <code>Vanilla JS, minimum CSS</code>
  <layout>Put the logos on one big canvas in a 5 X 5 grid. In this shape
* * * * *
*       *
*   *   *
*       *
* * * * *
The "padding" for the entire canvas should be 14 cells. The "gutter" between logos is adjustable by the user.</layout>
  <behavior>
    - **Controls:** Display controls in a header area above the canvas.
    - **Gapping Input:** Allow the user to adjust the "gapping" (gutter) between logos using a number input (default 14, range 0-40). Changing this value automatically stops the game and resets the grid with the new gapping.
    - **Speed Input:** Allow the user to adjust the simulation speed using a number input (default 100ms, range 20-1000ms).
    - **Step Button:** Advance the simulation by one step. Stops the game if playing.
    - **Play/Pause Button:** Toggle the automatic simulation playback.
    - **Reset Button:** Stop the game and reset the grid to the initial logo configuration using the current gapping value.
  </behavior>
  <canvas>
    Make sure all the logos share one canvas and so they can run into each other
    The canvas wraps around, essentially infinitely large
  </canvas>
  <interaction>
    - User can dynamically adjust the gapping between the logos using the input field. Changing the gapping value automatically stops the game and resets the grid.
    - User can adjust the simulation speed using the input field.
    - User can control the simulation flow with Step, Play, and Reset buttons.
    - Clicking "Reset" always resets the game to the initial state based on the *current* gapping value in the input field.
  </interaction>
  <style>Light theme. Only use white/black/grey colors</style>
  <responsive>Make sure the canvas takes full width and height (with some padding so it doesn't touch screen edge). If users add more gapping, the canvas grid just becomes denser without expanding in size.</responsive>
<requirements>

I have the following logos as bitmaps:

```js
const logos = [
  {
    groupName: "camera culture",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,1,1],
      [1,0,1,0,0,0,0],
      [1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "fluid interfaces",
    logo: [
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "affective computing",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "biomechatronics",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "changing places",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "civic media",
    logo: [
      [1,1,1,1,1,0,0],
      [0,0,0,0,1,0,0],
      [1,1,1,0,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,0,1],
    ],
  },
  {
    groupName: "design fiction",
    logo: [
      [1,0,0,1,0,0,0],
      [1,0,0,1,0,0,0],
      [1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "human dynamics",
    logo: [
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "lifelong kindergarten",
    logo: [
      [1,0,1,0,0,0,1],
      [1,0,1,0,0,1,1],
      [1,0,1,1,1,0,0],
      [1,0,1,0,0,1,1],
      [1,0,1,0,0,0,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "mit media lab",
    logo: [
      [1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [1,0,0,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,0,0,1],
    ],
  },
  {
    groupName: "macro connections",
    logo: [
      [0,0,1,1,1,1,1],
      [0,0,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [1,0,0,1,1,1,1],
      [1,0,0,1,0,0,0],
      [1,0,0,1,0,0,0],
      [1,0,0,1,1,1,1],
    ],
  },
  {
    groupName: "mediated matter",
    logo: [
      [1,1,1,1,1,0,0],
      [0,0,0,0,1,0,0],
      [1,1,1,0,1,1,1],
      [0,0,1,0,0,0,1],
      [0,0,1,1,1,0,1],
      [0,0,0,0,1,0,1],
      [0,0,0,0,1,0,1],
    ],
  },
  {
    groupName: "molecular machines",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
      [1,0,0,1,0,0,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
      [1,0,0,1,0,0,1],
    ],
  },
  {
    groupName: "object-based media",
    logo: [
      [1,1,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,1,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
    ],
  },
  {
    groupName: "opera of the future",
    logo: [
      [1,1,1,1,1,1,1],
      [0,0,0,0,1,0,1],
      [1,1,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,0,1],
    ],
  },
  {
    groupName: "personal robots",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,0,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,1,1,1,1],
    ],
  },
  {
    groupName: "playful systems",
    logo: [
      [1,1,1,0,1,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,1],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
];