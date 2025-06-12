design a 3d letter visualization system in three.js. Requirements:
- Pregenerate the 7x7 bitmap for letters A-E. 
- It lets user choose two letters from A-E
- No lighting. Uniformly render the objects
- It renders a 7x7x7 3d cube grid, where voxels can appear
- When viewed in the front, the user sees the first letter
- When viewed from the side, the user sees the second letter
- Procedural compute which voxels should appear: 
  - Fill the facade of first letter in a plane, then extrude it all the way its orthogonal axis
  - Fill the facade of second letter in another plane, then extrude it all the way in its orthogonal axis
  - Only keep the voxels that are in the intersection of the two processes
- Orthographic camera 
- Allow user to orbit the camera freely

Write the program in a single html file. You can import * as THREE from "https://esm.sh/three"
