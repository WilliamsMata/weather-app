export function getConsecutiveHours(hour: number): {
  format12: string[];
  format24: string[];
} {
  const consecutiveHours12 = [];
  const consecutiveHours24 = [];

  for (let i = 0; i < 6; i++) {
    const consecutiveHour = (hour + i * 3) % 24;

    const consecutiveHourFormat12 =
      consecutiveHour > 12 ? consecutiveHour - 12 : consecutiveHour;

    const suffix = consecutiveHour >= 12 ? "pm" : "am";

    consecutiveHours12.push(
      `${
        consecutiveHourFormat12 === 0 ? 12 : consecutiveHourFormat12
      }:00 ${suffix}`
    );
    consecutiveHours24.push(`${consecutiveHour}:00`);
  }

  return { format12: consecutiveHours12, format24: consecutiveHours24 };
}
