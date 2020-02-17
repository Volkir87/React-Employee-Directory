import React, { useState } from 'react';

function Record({record}) {
    return(
        <tr>
            <td>{record.name}</td>
            <td>{record.img}</td>
            <td>{record.email}</td>
            <td>{record.userId}</td>
            <td>{record.date}</td>
        </tr>
    )
}

export default Record;