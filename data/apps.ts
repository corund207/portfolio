// Projects running publicly under jonahchang.com, shown in the homepage hub.
// Descriptions come from each app's own site. Add an entry when a project
// gets its own subdomain (see Progects/jonahchang.com/README.md).
export type LiveApp = {
  name: string;
  kind: string;
  description: string;
  host: string;
};

export const liveApps: LiveApp[] = [
  {
    name: "VEX Vortex",
    kind: "Web app · VEX V5",
    description: "Robotics competition statistics: events, teams, skills, TrueSkill rankings, live tournament mode and match predictions.",
    host: "vexvortex.jonahchang.com",
  },
  {
    name: "Odyssey Simulator",
    kind: "Simulation · VEX V5",
    description: "Write autonomous routines, test them on a virtual VEX field, and copy the generated C++ back to the robot.",
    host: "odyssey.jonahchang.com",
  },
  {
    name: "PlaneSight",
    kind: "Live map",
    description: "Live aircraft positions from OpenSky, adsb.fi and adsb.lol on one map, with routes, weather, radar coverage and an airport board.",
    host: "planesight.jonahchang.com",
  },
  {
    name: "WareTrack",
    kind: "3D dashboard",
    description: "An interactive 3D operations dashboard for a simulated warehouse and logistics park.",
    host: "waretrack.jonahchang.com",
  },
  {
    name: "Reticly",
    kind: "Windows app",
    description: "A custom crosshair overlay for any game, including recoil crosshairs that follow the spray. Free and open source.",
    host: "reticly.jonahchang.com",
  },
];
