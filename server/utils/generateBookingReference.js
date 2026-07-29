/**
 * Generates a random booking reference.
 *
 * Example:
 * CQ-A8F29D
 */

export function generateBookingReference() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let reference = "CQ-";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    reference += characters[randomIndex];
  }

  return reference;
}
