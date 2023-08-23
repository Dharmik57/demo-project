import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import 'codemirror/keymap/sublime';
// import 'codemirror/theme/material.css';
// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/addon/hint/show-hint';
import Autosuggest from 'react-autosuggest';
import { evaluate } from 'mathjs';
import './FormulaInput.css';

const FormulaInput = () => {
    const [formula, setFormula] = useState('');
    const [suggestions, setSuggestions] = useState([]);
  
    const formulaSuggestions = [
      'SUM',
      'SUBTRACT',
      'MULTIPLY',
      'DIVIDE',
      // Add more formula suggestions here
    ];
  
    const handleEditorChange = (editor, data, value) => {
      setFormula(value);
      updateSuggestions(value);
    };
  
    const updateSuggestions = (value) => {
      const matchedSuggestions = formulaSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    };
  
    const handleSuggestionsFetchRequested = ({ value }) => {
      updateSuggestions(value);
    };
  
    const handleSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    const handleSuggestionSelected = (event, { suggestionValue }) => {
      const updatedFormula = formula.replace(/(?:\r\n|\r|\n)/g, ' ') + suggestionValue + '()';
      setFormula(updatedFormula);
    };
  
    const renderSuggestion = (suggestion) => (
      <div className="suggestion-item">{suggestion}</div>
    );
  
    const inputProps = {
      value: formula,
      onChange: (_, { newValue }) => setFormula(newValue),
    };
  
    const handleDeleteTag = (tag) => {
      const updatedFormula = formula.replace(new RegExp(tag + '\\(\\)', 'g'), '');
      setFormula(updatedFormula);
    };
  
    const calculateFormula = () => {
      try {
        const result = evaluate(formula);
        return result.toString();
      } catch (error) {
        return 'Error';
      }
    };
  
    return (
      <div className="formula-input-container">
        <h2 className="title">Mathematical Formula Input</h2>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          onSuggestionSelected={handleSuggestionSelected}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className="tags-container">
          {formula.split(/\s+/).map((tag, index) => (
            <span key={index}>
              {tag}
              {tag.endsWith('()') && <button onClick={() => handleDeleteTag(tag)}> (x) </button>}
              {' '}
            </span>
          ))}
        </div>
        <div className="result">
          <h3>Result: {calculateFormula()}</h3>
        </div>
        <CodeMirror
          value={formula}
          onBeforeChange={handleEditorChange}
          options={{
            mode: 'text',
            theme: 'material',
            keyMap: 'sublime',
            lineNumbers: true,
            extraKeys: {
              // Add your custom key bindings here if needed
            },
            hintOptions: {
              // Disable the default hint functionality of Codemirror
              completeSingle: false,
            },
          }}
        />
      </div>
    );
  };

export default FormulaInput;
