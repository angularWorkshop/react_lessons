import type { ActionFunctionArgs } from 'react-router-dom';
import type { ActionResult } from '../types/feedback';

export async function feedbackAction({ request }: ActionFunctionArgs): Promise<ActionResult> {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const errors: Record<string, string> = {};
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || !email.includes('@')) errors.email = 'Please enter a valid email';
  if (!message || message.length < 10) errors.message = 'Message must be at least 10 characters';

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
