// Conceptual system summaries, not measurements or implementation claims.
export const irisViews = [
  { name: "Mechanics", title: "From motor to joint.", description: "The proposed joint transmission uses cycloidal reduction. Gear ratio, backlash, and output torque are still to be characterized.", nodes: ["Stepper motor", "Eccentric", "Cycloidal disc", "Output pins", "Joint"], note: "V9 mechanical design · Performance not yet measured" },
  { name: "Controls", title: "From target to motion.", description: "The planned control stack connects joint targets to trajectory planning and motor commands. Physical testing will determine the limits.", nodes: ["Joint targets", "Trajectory", "Motor control", "Physical arm"], note: "Phase 2 · Planned control architecture" },
  { name: "Perception", title: "From image to action.", description: "Camera-based object identification is planned for autonomous sorting. Detection performance and the sorting sequence are not yet documented.", nodes: ["Camera", "Object identification", "Sorting target", "Arm motion"], note: "Phase 2 · Planned perception pipeline" },
];
export const projectPreviews: Record<string, { label: string; nodes: string[]; caption: string }> = {
  iris: { label: "Mechanical / controls / vision", nodes: ["Mechanics", "Controls", "Perception"], caption: "V9 assembly render pending" },
  odyssey: { label: "Localization → motion", nodes: ["Sensors", "Pose (x, y, θ)", "Controller", "Robot"], caption: "Autonomous navigation demo pending" },
  vortex: { label: "Event data → application", nodes: ["RobotEvents", "Processing", "PostgreSQL", "Application"], caption: "Dashboard screenshots pending" },
  maribotics: { label: "Perception system", nodes: ["Camera", "Detection", "Range / bearing", "Autonomy"], caption: "Camera and field-testing media pending" },
};
