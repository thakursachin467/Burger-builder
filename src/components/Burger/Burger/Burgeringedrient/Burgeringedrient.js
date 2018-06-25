import React from 'react';

import Classes from './burgerIngedrient.css';

const burgerIngedrient = (props) => {
    let ingedrient= null;
    switch(props.type) {
        case("bread-bottom"):
            ingedrient=<div className={Classes.BreadBottom}></div>
    }
};

export default burgerIngedrient;