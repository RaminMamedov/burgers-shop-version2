import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../customHooks/useAppDispatch";
import {filterActions} from "../redux/filterSlice/filterSlice";
import {selectSort} from "../redux/filterSlice/selectFilter";

type SelectedType = {
    name: string
    sortProperty: string
}

export const sortList: SelectedType[] = [
    {name: 'popularity (High to Low)', sortProperty: 'rating'},
    {name: 'popularity (Low to High)', sortProperty: '-rating'},
    {name: 'price (High to Low)', sortProperty: 'price'},
    {name: 'price (Low to High)', sortProperty: '-price'},
    {name: 'alphabet (Z - A)', sortProperty: 'title'},
    {name: 'alphabet (A - Z)', sortProperty: '-title'}
];

export const Sort = () => {
    const sort = useSelector(selectSort);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const onClickItem = (element: SelectedType) => {
        dispatch(filterActions.setSort(element))
        setOpen(!open)
    }

    const onBlurHandler = () => {
        setOpen(false);
    };

    return (
        <div className="sort" onBlur={onBlurHandler} tabIndex={0}>
            <div className="sort__label">
                <b>Sort by:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {open &&
                <div className="sort__popup">
                    <ul>
                        {sortList.map((el, index) => {
                            return(
                                <li key={index}
                                    onClick={() => onClickItem(el)}
                                    className={sort.sortProperty === el.sortProperty ? "active" : ''}
                                >
                                    {sortList[index].name}
                                </li>
                            )
                        })}
                    </ul>
            </div>
            }
        </div>
    );
};