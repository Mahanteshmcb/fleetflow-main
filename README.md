# FleetLane — Vehicle / Fleet Management System (Frontend Prototype)

A frontend-only, production-quality UI prototype for a fleet/vehicle management SaaS product, built with React + TypeScript + Vite + Tailwind CSS.

No backend, no database, no real auth — everything runs on local React state with realistic mock data.

## Tech stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- dnd-kit (tyre drag & drop)
- Recharts (charts)
- Framer Motion (animations)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Login with any valid-looking email + a password of 6+ characters, e.g.:
- Email: admin@FleetLane.com
- Password: password123

Or just click "Continue with Google" (UI-only, no real OAuth).

## Build

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  components/
    layout/       AppShell, Sidebar, Topbar
    common/        Button, Badge, Card, Drawer, Modal, Toast, Input, Select, EmptyState
    dashboard/     StatCard, VehicleHealthTable
    vehicles/      VehicleTable, AddVehicleDrawer, MyVehiclesDrawer, VehicleInformation, ComplianceCards
    tyres/         TruckVisualization, TruckChassis, Tyre, TyrePosition, TyreDrawer, TyreSwapDialog, RotationModeBanner
    charts/        MaintenanceCostChart
  pages/            One file per route (Login, Dashboard, Vehicles, VehicleDetails, Maintenance, ...)
  data/             Mock data modules (vehicles, tyres, maintenance, inventory, workshops, mechanics, documents, notifications)
  types/            Shared TypeScript types (vehicle, tyre, maintenance)
  context/          AppStateContext — the single source of truth for all app state
  hooks/            useToast
  utils/            cn (classnames helper), validators
```

## Core interaction: the 16-tyre truck

The most important part of this prototype is `src/components/tyres/TruckVisualization.tsx` together with
`src/context/AppStateContext.tsx`.

Key architectural rule: **tyre identity is decoupled from tyre position.**

- `TyreLayout` is a `Record<positionId, tyreId>` map — it says which tyre currently sits in which slot.
- Each `Tyre` object keeps its own `id` (e.g. `T01`) forever; only its `positionId` / `positionName` / `axle` / `side` fields change when it's moved.
- Dragging a tyre (via dnd-kit) onto an empty slot moves it immediately. Dragging onto an occupied slot opens a swap confirmation modal.
- Every move/swap stores an undo snapshot, surfaced via the toast's "Undo" action.
- "Rotate Tyres" mode works on a temporary draft layout (`rotationDraftLayout`) that only gets committed to the real layout on "Save Rotation".

## What's mocked / not implemented (by design)

No backend, database, real authentication, OAuth, SMS/WhatsApp/email, push notifications, GPS/live tracking,
real file uploads, AI/ML, or payments. All of these are represented as UI-only interactions per the prototype brief.

## Next steps for further development

- Split `App.tsx` route tree with React.lazy / code-splitting (the production bundle currently warns about chunk size).
- Wire `data/*.ts` modules to a real API layer when a backend exists — the `context/AppStateContext.tsx` is designed
  so that swapping mock arrays for fetched data should not require touching component code.
- Add persistence (e.g. localStorage) if you want state to survive a refresh — currently everything resets on reload
  by design, per the "frontend only, no backend" brief.
- Add automated tests (Vitest + React Testing Library) around the tyre drag/drop/swap/undo/rotation logic in
  `AppStateContext.tsx`, since that's the highest-value, highest-risk logic in the app.
