import { format, subDays, startOfDay } from "date-fns";

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

export const formatRecentDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, hh:mm a");
};

export const getSevenDaysAgo = () => {
  return startOfDay(subDays(new Date(), 7)).toISOString();
};

export const formatChartDate = (date) => {
  return format(new Date(date), "MMM dd");
};

export const getPastDate = (daysAgo) => {
  return subDays(new Date(), daysAgo);
};
