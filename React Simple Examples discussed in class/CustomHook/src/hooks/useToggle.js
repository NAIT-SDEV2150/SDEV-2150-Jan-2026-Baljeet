import { useState } from "react";


export default function useToggle(initial = false) {// custom Hook
  const [value, setValue] = useState(initial);

  function toggle() {
    setValue(prev => !prev);
  }

  return [value, toggle];
}


// What this hook does
// Stores a boolean state
// Provides a function to toggle it
// Returns:
// value → current state
// toggle → function to switch true/false