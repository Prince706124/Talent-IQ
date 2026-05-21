export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "badge-success";
    case "Medium":
      return "badge-warning";
    case "Hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};
