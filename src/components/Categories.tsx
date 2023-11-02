import React from 'react';

type PropsType = {
    categoryId: number
    onChangeCategory: (activeCategory: number) => void
}

export const Categories = (props: PropsType) => {
    const categories = ['All', 'Grilled', 'Chicken', 'Beef', 'Fish', 'Vegan'];
    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => {
                    return(
                        <li key={index}
                            onClick={() => props.onChangeCategory(index)}
                            className={props.categoryId === index ? "active" : ''}
                        >
                            {value}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};