import { TyreSlot } from "../types/tyre";

// 16 fixed physical positions on the truck. Positions never change —
// only which tyre ID currently occupies a position changes (see tyres.ts).
// Layout: 4 axle groups x 4 positions (left-outer, left-inner, right-inner, right-outer)
export const TYRE_SLOTS: TyreSlot[] = [
  { positionId: "front-left", positionName: "Front Left", axle: 1, side: "left", type: "Steer", x: 30, y: 232 },
  { positionId: "front-left-inner", positionName: "Front Left Inner", axle: 1, side: "left", type: "Steer", x: 95, y: 232 },
  { positionId: "front-right-inner", positionName: "Front Right Inner", axle: 1, side: "right", type: "Steer", x: 225, y: 232 },
  { positionId: "front-right", positionName: "Front Right", axle: 1, side: "right", type: "Steer", x: 290, y: 232 },

  { positionId: "axle-2-left-outer", positionName: "Axle 2 Left Outer", axle: 2, side: "left", type: "Drive", x: 30, y: 400 },
  { positionId: "axle-2-left-inner", positionName: "Axle 2 Left Inner", axle: 2, side: "left", type: "Drive", x: 95, y: 400 },
  { positionId: "axle-2-right-inner", positionName: "Axle 2 Right Inner", axle: 2, side: "right", type: "Drive", x: 225, y: 400 },
  { positionId: "axle-2-right-outer", positionName: "Axle 2 Right Outer", axle: 2, side: "right", type: "Drive", x: 290, y: 400 },

  { positionId: "axle-3-left-outer", positionName: "Axle 3 Left Outer", axle: 3, side: "left", type: "Drive", x: 30, y: 540 },
  { positionId: "axle-3-left-inner", positionName: "Axle 3 Left Inner", axle: 3, side: "left", type: "Drive", x: 95, y: 540 },
  { positionId: "axle-3-right-inner", positionName: "Axle 3 Right Inner", axle: 3, side: "right", type: "Drive", x: 225, y: 540 },
  { positionId: "axle-3-right-outer", positionName: "Axle 3 Right Outer", axle: 3, side: "right", type: "Drive", x: 290, y: 540 },

  { positionId: "axle-4-left-outer", positionName: "Axle 4 Left Outer", axle: 4, side: "left", type: "Trailer", x: 30, y: 680 },
  { positionId: "axle-4-left-inner", positionName: "Axle 4 Left Inner", axle: 4, side: "left", type: "Trailer", x: 95, y: 680 },
  { positionId: "axle-4-right-inner", positionName: "Axle 4 Right Inner", axle: 4, side: "right", type: "Trailer", x: 225, y: 680 },
  { positionId: "axle-4-right-outer", positionName: "Axle 4 Right Outer", axle: 4, side: "right", type: "Trailer", x: 290, y: 680 },
];
