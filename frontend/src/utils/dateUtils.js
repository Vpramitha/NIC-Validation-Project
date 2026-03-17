// utils/dateUtils.js
export const getDateRange = (duration, customRange) => {
  const today = new Date();
  let fromDate, toDate;

  if (duration === "last7days") {
    toDate = today;
    fromDate = new Date();
    fromDate.setDate(today.getDate() - 6);
  } else if (duration === "last30days") {
    toDate = today;
    fromDate = new Date();
    fromDate.setDate(today.getDate() - 29);
  } else if (duration === "thisMonth") {
    fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    toDate = today;
  } else if (duration === "custom") {
    fromDate = customRange[0];
    toDate = customRange[1];
  }

  const formatDate = (d) => d.toISOString().split("T")[0];

  return {
    fromDate: fromDate ? formatDate(fromDate) : null,
    toDate: toDate ? formatDate(toDate) : null,
  };
};