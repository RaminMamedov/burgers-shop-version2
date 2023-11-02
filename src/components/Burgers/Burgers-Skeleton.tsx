import React from "react"
import ContentLoader from "react-content-loader"

export const BurgersSkeleton = () => (
    <ContentLoader
        className='burger-block'
        speed={2}
        width={280}
        height={340}
        viewBox="0 0 280 340"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="4" y="6" rx="0" ry="0" width="244" height="151" />
        <rect x="47" y="178" rx="0" ry="0" width="161" height="21" />
        <rect x="3" y="217" rx="0" ry="0" width="246" height="42" />
        <rect x="4" y="297" rx="0" ry="0" width="63" height="25" />
        <rect x="160" y="294" rx="0" ry="0" width="75" height="27" />
    </ContentLoader>
)