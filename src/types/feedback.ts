export interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export interface ActionErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ActionResult {
  errors?: ActionErrors;
  success?: boolean;
}
