import React, {useCallback, useRef, useState} from 'react';
import styles from '../Search/Search.module.scss';
import clear from '../../assets/img/clear.svg';
import debounce from 'lodash.debounce';
import {filterActions} from "../../redux/filterSlice/filterSlice";
import search from '../../assets/img/search.svg';
import {useAppDispatch} from "../../customHooks/useAppDispatch";


export const Search = () => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    const onClickClear = () => {
        dispatch(filterActions.setSearchValue(''));
        setValue('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const updateSearchValue = useCallback(debounce((string: string) => {
        dispatch(filterActions.setSearchValue(string));
    }, 250), []);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        updateSearchValue(event.currentTarget.value);
    };

    return (
        <div className={styles.root}>
            <img src={search} className={styles.icon} alt={'search'}/>
            <input ref={inputRef}
                   value={value}
                   onChange={onChangeInput}
                   className={styles.input} placeholder={'Search...'}
            />
            {value &&
                <img src={clear}
                     alt={'clear'}
                     className={styles.clear}
                     onClick={onClickClear}
                />
            }
        </div>
    );
};