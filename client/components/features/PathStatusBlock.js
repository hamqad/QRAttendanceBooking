// Used by pathCheck to block students and lecturers

import React from "react";


function PathStatusBlock(props) {
    // Obtain status of user
    var status = props.status;

    var cleanChildren = [];

    // Map across all children: 
    React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) {
          console.log(child);
        }
        if (child.props) {
            // Found valid child
            let key = child.props.access;
            // If status matches access required then add to return
            if (!key || status[key])
                cleanChildren.push(child);
        }
    })


    return <>{cleanChildren}</>;
}



export default PathStatusBlock