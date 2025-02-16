"use client";

import { useState } from "react";

export default function ResomePage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Resome</h1>
      <p>
        Resome is a resume builder that allows you to create a resume in a
        matter of minutes.
      </p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
