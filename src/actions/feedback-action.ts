import type { ActionFunctionArgs } from 'react-router-dom';
import type { ActionResult } from '../types/feedback';

// TODO: Implement the feedbackAction function:
// 1. Extract formData from request
// 2. Get name, email, message from formData
// 3. Validate each field and collect errors
// 4. If errors exist, return { errors }
// 5. Otherwise simulate a delay and return { success: true }
export async function feedbackAction({ request }: ActionFunctionArgs): Promise<ActionResult> {
  void request;
  return {};
}
