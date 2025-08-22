import { api } from "./api";
export interface FeedbackMetadata {
  [key: string]: string | number | boolean | undefined | null;
}

export const sendFeedback = async (
  message: string,
  metadata: FeedbackMetadata = {}
) => {
  return (await api.post("/feedback", { message, metadata })).data;
};
