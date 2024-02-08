/**
 * Just some shortcuts to ease importing various rendering related things from
 * the codebase:
 */
export { NodeProgram } from "./node";
export type { NodeProgramType } from "./node";
export { EdgeProgram } from "./edge";
export type { EdgeProgramType } from "./edge";
export type { ProgramInfo } from "./program";

// Canvas helpers
export type { EdgeLabelDrawingFunction } from "./edge-labels";
export { drawStraightEdgeLabel } from "./edge-labels";
export type { NodeLabelDrawingFunction } from "./node-labels";
export { drawDiscNodeLabel } from "./node-labels";
export type { NodeHoverDrawingFunction } from "./node-hover";
export { drawDiscNodeHover } from "./node-hover";

// Built-in node programs
export { default as NodeCircleProgram } from "./programs/node-circle";
export { default as NodePointProgram } from "./programs/node-point";

// Built-in edge programs
export { default as EdgeArrowProgram } from "./programs/edge-arrow";
export { default as EdgeArrowHeadProgram } from "./programs/edge-arrow-head";
export { default as EdgeClampedProgram } from "./programs/edge-clamped";
export { default as EdgeLineProgram } from "./programs/edge-line";
export { default as EdgeRectangleProgram } from "./programs/edge-rectangle";
export { default as EdgeTriangleProgram } from "./programs/edge-triangle";
