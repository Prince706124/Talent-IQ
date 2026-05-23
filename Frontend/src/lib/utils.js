export const getDifficultyBadgeClass = (difficulty) => {
  const normalized = difficulty?.toLowerCase();
  switch (normalized) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};
