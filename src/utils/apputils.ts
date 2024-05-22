export function generateUniqueId() {
  const randomStr = Math.random().toString();
  const timestamp = Date.now().toString(36);
  const uniqueId = randomStr + timestamp;
  return uniqueId;
}

// Example usage
const uniqueId = generateUniqueId();
console.log(uniqueId);
