import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

const FormulaInput2 = () => {
  return (
    <div className="react-codemirror2">
      <CodeMirror
        value={`Account Balance: Office Supplies [+131] + Contractors COGS [+1200]`}
        options={{
          mode: 'text', // Set mode to text
          theme: 'material', // Set theme to material
          lineNumbers: true, // Show line numbers
        }}
      />
    </div>
  );
};

export default FormulaInput2;
