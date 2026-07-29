/**
 * Generates appointment time slots.
 *
 * Default schedule:
 * 08:00 AM to 05:00 PM
 *
 * Each appointment lasts 30 minutes.
 */

export function generateTimeSlots() {
  const slots = [];

  let hour = 8;
  let minute = 0;

  while (hour < 17) {
    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");

    slots.push(`${formattedHour}:${formattedMinute}`);

    minute += 30;

    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return slots;
}
