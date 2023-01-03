import {useButton} from '@react-aria/button'
import React from 'react'

export default function Button(props) {
    let ref = React.useRef();
    let {buttonProps} = useButton({
        ...props,
        elementType: 'button'
    }, ref);
    return (
        <button {...buttonProps} ref={ref}>
            {props.children}
        </button>
    );
};
