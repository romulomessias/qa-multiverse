import React, { useState } from 'react';
import { toDegree } from '../../utils/Math';

const useGradientBorderEffect = (primaryColor: string, secondaryColor: string) => {
    const [angle, setAngle] = useState(90);
    const elementRef = React.createRef<HTMLElement>();

    const onMouseMove: React.MouseEventHandler<HTMLElement> = (event) => {
        if (!elementRef.current) { return; }

        const {
            clientX: x = 0,
            clientY: y = 0,
        } = event;
        const {
            offsetTop = 0,
            offsetLeft = 0,
            offsetWidth = 0,
            offsetHeight = 0,
        } = elementRef.current;
        const centerX = (offsetWidth) / 2;
        const centerY = (offsetHeight) / 2;
        const deltaX = (x - offsetLeft) - centerX;
        const deltaY = (y - offsetTop) - centerY;

        setAngle(toDegree(Math.atan2(deltaY, deltaX)));
    };

    return {
        onMouseMove,
        elementRef,
        background: `linear-gradient(${angle}deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    };
};

export default useGradientBorderEffect;
