import React, {useCallback, useEffect} from 'react';
import './App.css';
import '../Qrcode.css';
import PartFooter from "./PartFooter";
import PartHeader from "./PartHeader";
import PartMore from "./PartMore";
import PartParams from "./PartParams";
import PartDownloadViewer from "../../containers/app/PartDownloadViewer";
import PartStylesViewer from "../../containers/app/PartStylesViewer";
import {connect} from 'react-redux';
// import ReactGA from 'react-ga';
import {setScrollbarWidthProp} from "../../utils/util"

// ReactGA.initialize('UA-165845289-1');

// ReactGA.addTrackers(
//     [
//         {
//             trackingId: 'UA-165845289-1',
//             gaOptions: {
//                 name: 'trackerUA',
//             }
//         },
//         {
//             trackingId: 'G-3NKS6ZG27V',
//             gaOptions: {name: 'trackerG'}
//         }
//     ],
//     {alwaysSendToDefaultTracker: false}
// );

function App({dispatch}) {

    setScrollbarWidthProp()

    useEffect(() => {
    })

    return (
        <div className="App">
            <header className="App-header">
                <div className="Layout">
                    <div className="Qr-outer">
                        <PartHeader />
                        <PartStylesViewer />
                        <PartParams />
                        <PartDownloadViewer />
                        <PartMore />
                        <PartFooter />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default connect()(App);
