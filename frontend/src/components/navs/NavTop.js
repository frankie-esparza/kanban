import { memo } from 'react';

function NavTop({ board }) {
    return (
        <>
            <h1>{board.text}</h1>
            {/* <Form
                formType='ADD'
                itemType='task'
            /> */}
        </>
    );
}

export default memo(NavTop);
