export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  if (hour < 22) return "Good Evening";

  return "Good Night";
};
