# Topic 16.2: Compound Form

Completed solution for the EduTec React course exercise.

## Goal

Build a typed compound form API with `Form.Field`, `Form.Error`, and `Form.Submit`.

## Requirements

- connect field ids and errors through context
- disable submit while the form is invalid
- keep a typed subcomponent API on `Form`
- make all tests pass

## Solution highlights

- form parts share metadata through internal context instead of manual prop wiring
- the field and error stay linked through generated ids
- submit state reacts to form validity without prop drilling

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
