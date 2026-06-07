export const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
};

import { format } from "date-fns";

export const formatRecentDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, hh:mm a");
};
