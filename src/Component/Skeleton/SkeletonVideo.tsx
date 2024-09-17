import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const SkeletonVideo = () => {
    return (
        <div style={{ width: '100%', margin: '1rem 0' }}>
            <SkeletonTheme baseColor="pink" color='#343a40' highlightColor='pink'>
                <Skeleton height={180} />
                <div>
                    <Skeleton
                        style={{ margin: '0.5rem' }}
                        circle
                        height={40}
                        width={40}
                    />
                    <Skeleton height={40} width='75%' />
                </div>
            </SkeletonTheme>
        </div>
    )
}

