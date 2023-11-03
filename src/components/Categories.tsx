import React, {memo} from 'react';

type CategoriesType = {
    categoryId: number
    onChangeCategory: (activeCategory: number) => void
}

export const Categories: React.FC<CategoriesType> = memo(({categoryId, onChangeCategory}) => {
    const categories = ['All', 'Grilled', 'Chicken', 'Beef', 'Fish', 'Vegan'];
    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => {
                    return(
                        <li key={index}
                            onClick={() => onChangeCategory(index)}
                            className={categoryId === index ? "active" : ''}
                        >
                            {value}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
});