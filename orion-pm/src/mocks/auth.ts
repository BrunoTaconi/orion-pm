import { usersMock } from "./mock";

export const getCurrentUserMock = () => {
  return usersMock.find((u) => u.id === "user-1")!;
};