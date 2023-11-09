import React, { useState, useEffect, useRef, useCallback } from "react";

import styles from './AddressInput.module.scss';
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../customHooks/useAppDispatch";
import { addressActions } from "../../redux/addressSlice/addressSlice";
import { Suggestion } from "../../redux/addressSlice/addressType";
import { selectAddress } from "../../redux/addressSlice/selectAddress";
import { fetchSuggestions } from "../../redux/addressSlice/asyncActioncAddress";

type AddressInputProps = {
  className?: string;
};

const AddressInput: React.FC<AddressInputProps> = ({className}) => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const {suggestions} = useSelector(selectAddress);
  const addressInputContainerRef = useRef<HTMLDivElement>(null);

  const debouncedFetchSuggestions = useCallback(
    debounce((inputValue: string) => {
      dispatch(fetchSuggestions(inputValue));
    }, 250), []
  );

  useEffect(() => {
    if (input.length > 3) {
      debouncedFetchSuggestions(input);
    } else {
      dispatch(addressActions.clearSuggestions());
    }
  }, [input, debouncedFetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressInputContainerRef.current && !addressInputContainerRef.current.contains(event.target as Node)) {
        dispatch(addressActions.clearSuggestions());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);


  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setInput(suggestion.value);
    dispatch(addressActions.clearSuggestions());
  };

  return (
    <div className={styles.addressInputContainer} ref={addressInputContainerRef}>
      <input
        className={`${styles.input} ${className}`}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите адрес"
        maxLength={90}
        autoComplete="off"
        required
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
