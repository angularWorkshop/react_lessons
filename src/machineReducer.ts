export type IdleState = { status: 'idle' };
export type LoadingState = { status: 'loading' };
export type SuccessState = { status: 'success'; data: string[] };
export type ErrorState = { status: 'error'; message: string };

export type AsyncState = IdleState | LoadingState | SuccessState | ErrorState;

export type ActionByStatus = {
  idle: { type: 'START' };
  loading:
    | { type: 'RESOLVE'; data: string[] }
    | { type: 'REJECT'; message: string }
    | { type: 'RESET' };
  success: { type: 'RESET' };
  error: { type: 'RESET' };
};

export type MachineAction = ActionByStatus[keyof ActionByStatus];

export const INITIAL_STATE: AsyncState = { status: 'idle' };

export function transition<S extends AsyncState>(
  state: S,
  action: ActionByStatus[S['status']],
): AsyncState {
  switch (state.status) {
    case 'idle':
      return { status: 'loading' };
    case 'loading':
      switch (action.type) {
        case 'RESOLVE':
          return { status: 'success', data: action.data };
        case 'REJECT':
          return { status: 'error', message: action.message };
        case 'RESET':
          return INITIAL_STATE;
      }
    case 'success':
      return INITIAL_STATE;
    case 'error':
      return INITIAL_STATE;
  }
}

export function machineReducer(state: AsyncState, action: MachineAction): AsyncState {
  switch (state.status) {
    case 'idle':
      return action.type === 'START' ? transition(state, action) : state;
    case 'loading':
      return action.type === 'START' ? state : transition(state, action);
    case 'success':
      return action.type === 'RESET' ? transition(state, action) : state;
    case 'error':
      return action.type === 'RESET' ? transition(state, action) : state;
    default:
      return state;
  }
}
