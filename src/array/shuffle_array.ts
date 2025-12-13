export function shuffle_array(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  return array;
}


