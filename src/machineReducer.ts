export type IdleState = { status: 'idle' };
export type LoadingState = { status: 'loading' };
export type SuccessState = { status: 'success'; data: string[] };
export type ErrorState = { status: 'error'; message: string };

export type AsyncState = IdleState | LoadingState | SuccessState | ErrorState;

export type MachineAction =
  | { type: 'START' }
  | { type: 'RESOLVE'; data: string[] }
  | { type: 'REJECT'; message: string }
  | { type: 'RESET' };

export const INITIAL_STATE: AsyncState = { status: 'idle' };

export function machineReducer(state: AsyncState, action: MachineAction): AsyncState {
  switch (action.type) {
    case 'START':
      return { status: 'loading' };
    case 'RESOLVE':
      return { status: 'success', data: action.data };
    case 'REJECT':
      return { status: 'error', message: action.message };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}
