# Topic 11.2: React Hook Form + Zod

Completed solution for the EduTec React course exercise.

## Goal

Rebuild the signup flow with React Hook Form and schema-first validation.

## Requirements

- use `react-hook-form` for field registration and submit handling
- define the form contract through a single Zod schema
- infer the form value type through `z.infer`
- render schema-driven validation errors in the UI

## Solution highlights

- one schema should define validation and TypeScript inference together
- `zodResolver` should connect the schema to React Hook Form
- the submit payload should stay typed all the way to the success state

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
