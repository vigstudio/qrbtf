import React from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {getExactValue, getIdNum} from "../../utils/util";

const X = [Math.sqrt(3) / 2, 1 / 2];
const Y = [-Math.sqrt(3) / 2, 1 / 2];
const Z = [0, 0];

const matrixString = 'matrix(' + String(X[0]) + ', ' + String(X[1]) + ', ' + String(Y[0]) + ', ' + String(Y[1]) + ', ' + String(Z[0]) + ', ' + String(Z[1]) + ')'

function listPoints({qrcode, params, icon}) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let size = 1.001;
    let size2 = 1.001;
    let height = params[0];
    let height2 = params[1];
    let upColor = params[2];
    let leftColor = params[3];
    let rightColor = params[4];
    let id = 0;

    if (height <= 0) height = 1.0;
    if (height2 <= 0) height2 = 1.0;

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;
            else if (typeTable[x][y] === QRPointType.POS_OTHER || typeTable[x][y] === QRPointType.POS_CENTER) {
                pointList.push(<rect width={size2} height={size2} key={id++} fill={upColor} x={x + (1 - size2) / 2} y={y + (1 - size2) / 2} transform={matrixString} />);
                pointList.push(<rect width={height2} height={size2} key={id++} fill={leftColor} x={0} y={0} transform={matrixString + `translate(${String(x + (1 - size2) / 2 + size2)}, ${String(y + (1 - size2) / 2)}) skewY(45)`} />);
                pointList.push(<rect width={size2} height={height2} key={id++} fill={rightColor} x={0} y={0} transform={matrixString + `translate(${String(x + (1 - size2) / 2)}, ${String(y + size2 + (1 - size2) / 2)}) skewX(45)`} />);
            }
            else {
                pointList.push(<rect width={size} height={size} key={id++} fill={upColor} x={x + (1 - size) / 2} y={y + (1 - size) / 2} transform={matrixString} />);
                pointList.push(<rect width={height} height={size} key={id++} fill={leftColor} x={0} y={0} transform={matrixString + `translate(${String(x + (1 - size) / 2 + size)}, ${String(y + (1 - size) / 2)}) skewY(45) `} />);
                pointList.push(<rect width={size} height={height} key={id++} fill={rightColor} x={0} y={0} transform={matrixString + `translate(${String(x + (1 - size) / 2)}, ${String(y + size + (1 - size) / 2)}) skewX(45) `} />);
            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Chiều cao cột',
            default: 0.5,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Chiều cao xi lanh điểm neo',
            default: 0.5,
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Màu mặt trên',
            default: '#FF7F89'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Màu trái',
            default: '#FFD7D9'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Đúng màu',
            default: '#FFEBF3'
        },
    ];
}

let defaultDrawIcon = function ({qrcode, params, title, icon}) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconEnabled = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

        if (icon && iconEnabled) {

            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100 / iconSize * 1} fill="#FFF" transform={`translate(${String(iconXY)}, ${String(iconXY)}) scale(${String(iconSize / 100)}, ${String(iconSize / 100)})`} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={`translate(${String(iconXY)}, ${String(iconXY)}) scale(${String(iconSize / 100)}, ${String(iconSize / 100)})`} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs} overflow="visible" />
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <image overflow="visible" key={id++} xlinkHref={src} width={iconSize} x={iconXY} y={iconXY} />
                    </g>
                </g>
            );

        }
    }

    return pointList;
}

let builtinDrawIcon = function ({qrcode, params, title, icon}) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconMode = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        if (src) { }

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

        const MomoIcon = (
            <g>
                <rect width="100" height="100" />
                <path fill="#a50064" d="M93.2 0H6.8C3 0 0 3 0 6.8v86.4C0 97 3 100 6.8 100h86.4c3.8 0 6.8-3 6.8-6.8V6.8C100 3 97 0 93.2 0z" />
                <path fill="#fff" fillRule="nonzero" d="M69.2 47a14.3 14.3 0 1 0 0-28.7 14.3 14.3 0 0 0 0 28.7zm0-20.5a6.1 6.1 0 1 1 0 12.2 6.1 6.1 0 0 1 0-12.2zm0 26.7a14.3 14.3 0 1 0 0 28.7 14.3 14.3 0 0 0 0-28.7zm0 20.4a6.1 6.1 0 1 1 0-12.2 6.1 6.1 0 0 1 0 12.2zM39.9 53.2c-2.4 0-4.6.8-6.4 2.1A10.7 10.7 0 0 0 16.2 64v18h8.3V63.8c0-1.4 1-2.5 2.4-2.5s2.5 1.1 2.5 2.5v18h8.2v-18c0-1.4 1-2.5 2.4-2.5s2.5 1.1 2.5 2.5v18h8.2v-18c0-5.9-4.8-10.7-10.8-10.7zm0-35a11 11 0 0 0-6.4 2.2A10.8 10.8 0 0 0 16.2 29v18h8.3V29c0-1.4 1-2.5 2.4-2.5s2.4 1 2.4 2.4v18h8.3V29c0-1.3 1-2.4 2.4-2.4s2.4 1 2.4 2.4v18h8.3V29c0-6-4.8-10.8-10.8-10.8z" />
            </g>
        )

        const ZaloPay = (
            <g>
                <rect width="100" height="100" />
                <path fill="#1167cb" fillRule="nonzero" d="M18.6 16.4 92 5.7A23.1 23.1 0 0 0 76.7 0H23.3A23.3 23.3 0 0 0 0 23.3v53.4c0 11.6 8.4 21.2 19.5 23L9.8 28.3c-.8-5.7 3.2-11 8.8-11.9z" />
                <path fill="#fff" fillRule="nonzero" d="M92 5.7 18.5 16.4c-5.6.9-9.6 6.2-8.8 12l9.7 71.3c1.2.2 2.5.4 3.8.4h53.4A23.3 23.3 0 0 0 100 76.7V23.3c0-7-3.1-13.3-8-17.6z" />
                <path fill="#b3b3b3" fillRule="nonzero" d="M92 5.7h-.3c5 4.5 8 11 8 17.6v53.3a23.2 23.2 0 0 1-23 23.2H23.2l-3.9-.3v.2c1.4.2 2.6.4 3.9.4h53.3a23.5 23.5 0 0 0 23.4-23.5V23.3a23 23 0 0 0-8-17.6z" />
                <path fill="#1167cb" fillRule="nonzero" d="M62.3 33.2c-.5-.5-1-.7-1.7-.7-1 0-1.8.5-2.2 1.4a5 5 0 0 0-4.1-1.7 7 7 0 0 0-5.3 2.4 8.4 8.4 0 0 0-2 5.8c0 2.3.6 4.3 2 5.8a6.7 6.7 0 0 0 5.3 2.4 5 5 0 0 0 4-1.7c.6 1 1.3 1.4 2.3 1.4.7 0 1.2-.3 1.7-.7.5-.4.6-1 .6-1.7V34.7c.1-.4-.2-1-.6-1.5zm-5 10c-.5.8-1.3 1.2-2.3 1.2a3 3 0 0 1-2.4-1.1 5 5 0 0 1-.9-2.8c0-1.1.3-2 1-2.8.5-.7 1.3-1 2.3-1 1 0 1.8.3 2.4 1 .5.8.9 1.7.9 2.8-.1 1-.4 2.1-1 2.8zm11 4.5c-.4.5-1 .8-1.7.8s-1.2-.3-1.7-.8c-.5-.4-.6-1-.6-1.7V26c0-.6.2-1.2.6-1.7.5-.5 1-.7 1.7-.7s1.3.2 1.8.7c.4.4.6 1 .6 1.7v20c0 .8-.2 1.3-.6 1.7zm15.8-13c-1.6-1.7-3.5-2.4-5.8-2.4s-4.3.8-5.9 2.4c-1.4 1.5-2.3 3.5-2.3 5.9s.8 4.2 2.3 5.9c1.5 1.5 3.5 2.3 5.9 2.3s4.2-.8 5.8-2.3a8.2 8.2 0 0 0 2.2-5.8c0-2.5-.6-4.5-2.2-6zm-3.4 8.6c-.5.7-1.3 1-2.3 1a3 3 0 0 1-2.4-1 5 5 0 0 1-.9-2.8c0-1.1.3-2 .9-2.8.6-.7 1.4-1 2.4-1s1.8.3 2.3 1c.6.8 1 1.7 1 2.8-.1 1-.4 2.1-1 2.8z" />
                <path fill="#1167cb" fillRule="nonzero" d="M44.3 32.8c1.6-2.1 2.5-3.6 2.5-4.3 0-1.8-1-2.7-3.2-2.7H32c-.9 0-1.6.2-2 .7a2.1 2.1 0 0 0 0 3.3c.4.4 1.1.6 2 .6h8l-10.2 13c-.7 1-1 1.7-1 2.4 0 1.9 1.2 2.8 3.8 2.8h11.9c1.9 0 2.8-.8 2.8-2.4 0-1.6-.9-2.3-2.8-2.3h-8.7l8.5-11z" />
                <g fill="#39b54a" fillRule="nonzero">
                    <path d="M38.6 61.2h-3v6.1h3c1 0 1.7-.2 2.2-.9a3 3 0 0 0 .8-2.1 3 3 0 0 0-.8-2.2c-.5-.7-1.2-1-2.2-1zm14.9 5.7c-1 0-1.7.3-2.2 1a4 4 0 0 0-.8 2.5c0 1 .2 1.9.8 2.6.5.7 1.3 1 2.2 1 .9 0 1.6-.4 2.1-1a4 4 0 0 0 .9-2.6 4 4 0 0 0-.9-2.6c-.5-.6-1.2-1-2.1-1z" />
                    <path d="M74.4 52.3h-43a2.6 2.6 0 0 0-2.7 2.7v25.2c0 1.4 1.2 2.6 2.7 2.6h33.9c-.4-.4-.6-.7-.6-1.2l.3-1.2 1.7-3.5-4.5-11.1-.2-1c0-.5.2-1 .6-1.2.4-.4.9-.5 1.3-.5 1 0 1.7.4 2 1.4l2.7 7.6 3-7.6c.3-.9 1-1.4 2-1.4.4 0 .9.1 1.2.5.4.4.7.7.7 1.2l-.2 1-6.6 15.9c-.2.5-.3.8-.6 1h6.3c1.4 0 2.6-1 2.6-2.5V55c0-1.6-1.2-2.7-2.6-2.7zM44 69.3a7.2 7.2 0 0 1-5 1.8h-3.3v4.7c0 .7-.2 1.2-.7 1.6-.3.4-.9.7-1.5.7s-1.2-.2-1.6-.7c-.3-.3-.6-1-.6-1.6V59.4c0-1.5.7-2.3 2.3-2.3h5.2c2.2 0 3.9.7 5.3 2 1.4 1.2 2.1 3 2.1 5 0 2.2-.7 3.9-2.2 5.1zm16.8 6.4a2 2 0 0 1-.6 1.5 2 2 0 0 1-1.5.7c-1 0-1.7-.5-2.1-1.4a4.7 4.7 0 0 1-3.9 1.6c-1.8 0-3.5-.7-4.8-2.1-1.2-1.5-2-3.3-2-5.5s.7-3.9 2-5.4c1.3-1.5 3-2.2 4.8-2.2a5 5 0 0 1 3.9 1.7c.4-1 1-1.4 2-1.4.7 0 1.2.2 1.6.6.5.5.6 1 .6 1.6v10.3z" />
                </g>
            </g>
        )

        const VNPay = (
            <g>
                <rect width="100" height="100" />
                <path fill="#005baa" fillRule="nonzero" d="m55.82 26.99-9.76 9.75-1.68 1.7-2.26 2.26-.35.34-.99 1-.35.34-3.34 3.33-.35.34a15.18 15.18 0 0 1-5.07 3.31c-1.38.54-2.83.86-4.3.94-.9.08-1.8.08-2.7 0a14.61 14.61 0 0 1-7.7-3.28l-.42-.41-13-13.13-.26-.26A4.9 4.9 0 0 1 2 29.5v-.85a4.87 4.87 0 0 1 1.25-2.17l.23-.23 14-13.82 8.38-8.37a4.99 4.99 0 0 1 6.8-.23L55.82 27z" />
                <path fill="#ed1c24" fillRule="nonzero" d="M30.63 58.1a7.5 7.5 0 0 1-3.26-.74l-2.67-2.65-.66-.64-.1-.12-1.24-1.24-6.18-6.26.41.42a14.44 14.44 0 0 0 7.72 3.3c.9.08 1.8.08 2.7 0a14.68 14.68 0 0 0 6.1-1.76c1.2-.68 2.3-1.51 3.27-2.48l.36-.34 3.33-3.34.36-.34.98-1 .36-.34 2.26-2.26 1.68-1.69 2.32-2.14.35-.35 14.36-14.26 5.87-6.54.33-.31a4.63 4.63 0 0 1 6.54 0l3.24 3.25h.11a5.28 5.28 0 0 0-3.95 1.52l-10.97 10.7-.11.11-19.05 18.98-7.05 6.89-.43.44c-.95.93-2.06 1.71-3.26 2.28a8.3 8.3 0 0 1-3.37.86l-.35.05z" />
                <path fill="#ed1c24" fillRule="nonzero" d="m96.65 40.34-.35.36-15.53 15.75-16.35 16.57c-.51.51-1.07.99-1.65 1.42l-.23.15a15.03 15.03 0 0 1-19.1-1.34l-.43-.24-10.69-10.7-2.65-2.66-.35-.37c.43.08.85.11 1.28.11h.37a10.04 10.04 0 0 0 3.9-1.02c1.3-.64 2.51-1.5 3.56-2.53l.48-.53 6.06-5.95 20.88-20.5.1-.13 10.24-9.91a4.06 4.06 0 0 1 5.04-.45l2.39 2.4 13.01 13.04a4.62 4.62 0 0 1 .02 6.54z" />
                <path fill="#009edb" fillRule="nonzero" d="M46.34 23.1a1 1 0 0 1-1.36 0 15.82 15.82 0 0 0-22.44 22.3l4.75 4.78c0 .03-1.88.06-2.75-.02l-3.37-3.37A17.71 17.71 0 0 1 46.3 21.83c.32.34.34.9.03 1.27zm7.37 6.06-1.34 1.32-2.34-2.35a.95.95 0 0 1 1.34-1.34l2.34 2.37z" />
                <path fill="#009edb" fillRule="nonzero" d="M33.44 48.4s-1.17.6-1.78.82l-6.48-6.48a12.1 12.1 0 0 1-1.38-15.4.96.96 0 0 1 1.32-.24c.43.29.54.89.23 1.32a10.23 10.23 0 0 0 1.17 13l6.92 6.97zm16.28-15.3-1.3 1.3-7.36-7.44a10.25 10.25 0 0 0-10.52-2.48.96.96 0 0 1-1.27-.46.96.96 0 0 1 .47-1.26 12.06 12.06 0 0 1 12.55 2.94l7.43 7.4z" />
                <path fill="#009edb" fillRule="nonzero" d="m45.7 36.96-1.33 1.34-7.33-7.37a4.64 4.64 0 0 0-6.5 6.54l4.75 4.8a.95.95 0 0 1-1.34 1.34l-4.84-4.8a6.55 6.55 0 0 1 9.29-9.2l7.3 7.35z" />
                <path fill="#009edb" fillRule="nonzero" d="m41.75 40.9-1.3 1.3-7.36-7.33a.95.95 0 0 1 1.34-1.34l7.32 7.37z" />
                <path fill="#ed1b23" fillRule="nonzero" d="M81 80.22a4.7 4.7 0 0 1 3.14-.8c.93.08 1.81.54 2.42 1.24a4.36 4.36 0 0 1-.43 5.91c.6.58 1.18 1.18 1.93 1.54.36.18.75.3 1.14.35a4.4 4.4 0 0 1-1.03.6c-.57.19-1.21.21-1.77-.01-.88-.34-1.59-.97-2.3-1.57-.1-.1-.26-.04-.38-.04a3.57 3.57 0 0 1-2.91-.87 4.23 4.23 0 0 1-1.36-2.85 3.8 3.8 0 0 1 1.55-3.5zm1.85.4c-.46.13-.8.52-.96.95-.2.5-.26 1.07-.25 1.61 0 .48.08.96.25 1.4.15.5.4.97.77 1.33.48.44 1.24.52 1.8.2.4-.22.6-.66.72-1.08a5.22 5.22 0 0 0-.49-3.7 1.7 1.7 0 0 0-1.84-.7zM5 79.5h5.06l4.23 11.65 3.58-9.56a.96.96 0 0 0-.02-.71 18.8 18.8 0 0 0-.7-1.35h3.77c-.19.7-.45 1.38-.69 2.07-1.66 4.64-3.34 9.29-5.02 13.93a8.12 8.12 0 0 1-3.96-1.82 4.97 4.97 0 0 1-1.23-1.83l-.9-2.22-3.61-9.15a7.78 7.78 0 0 0-.5-1zm16.47 0h4.93l7.98 9.84v-7.6c0-.27.02-.58-.13-.82-.3-.48-.63-.94-.96-1.4h4.75l-1.14 1.44a.7.7 0 0 0-.14.47v14.16a9.35 9.35 0 0 1-2.87-.76c-.8-.39-1.5-.99-2.07-1.68l-6.66-8.19v8.32c0 .19.05.36.17.5l1.13 1.41h-4.74c.25-.4.52-.78.79-1.15.16-.24.3-.51.3-.8v-7.18c-.02-1.5 0-2.99-.02-4.47-.41-.71-.88-1.38-1.32-2.09z" />
                <path fill="#ed1b23" fillRule="nonzero" d="M87.78 79.58h3.8a2.5 2.5 0 0 1 1.52.42 2 2 0 0 1 .77 1.9c-.08.42-.28.83-.6 1.12-.23.2-.49.36-.75.5l1.5 2.54c.28.44.6.86.99 1.2-.72.05-1.44.15-2.15.11a.98.98 0 0 1-.78-.37c-.23-.3-.38-.66-.57-.98l-1.07-2v2.11c0 .28.03.59.19.84.08.16.22.26.35.37-1.07.01-2.14.01-3.21 0 .12-.11.26-.21.35-.36.13-.24.17-.52.17-.79v-4.73c-.01-.44.03-.89-.08-1.31-.07-.26-.26-.42-.43-.57zm2.66 1.11v2.69c.3-.06.6-.18.82-.39.52-.49.6-1.37.16-1.94-.23-.29-.62-.37-.98-.36z" />
                <path fill="#005aaa" fillRule="nonzero" d="M38.9 79.59c.8-.03 1.59 0 2.37-.01h4.85c1.01.02 2.06.15 2.95.66.64.36 1.24.86 1.59 1.52.44.85.6 1.84.47 2.79a3.9 3.9 0 0 1-1.18 2.42 6.3 6.3 0 0 1-3.1 1.44l-1.3.12c-.38.05-.75-.06-1.14-.07a3.7 3.7 0 0 0 1.85-1.53 4.5 4.5 0 0 0 .45-2.74 2.77 2.77 0 0 0-.8-1.78 2.53 2.53 0 0 0-1.65-.54v10.7c.05.8.24 1.64.8 2.24.1.12.26.2.31.35h-6.46c.2-.17.4-.32.55-.52.39-.52.5-1.2.5-1.82V82.16a4.6 4.6 0 0 0-.18-1.52 2.84 2.84 0 0 0-.88-1.05zm14.94 0c1.96-.02 3.92 0 5.88-.01l4.6 12.2c.3.78.56 1.59 1.07 2.26.26.34.56.65.88.94.06.05.1.11.12.2h-7.3v-.1c.4-.23.84-.58.95-1.07.11-.56-.1-1.12-.27-1.64l-.64-1.91h-4.77l-.56 1.57a8.5 8.5 0 0 0-.47 1.73c-.02.45.3.83.61 1.11.1.1.24.16.28.3h-4.95c.03-.1.12-.18.2-.25.4-.37.75-.8.99-1.3.3-.67.52-1.36.76-2.05 1.04-2.98 2.1-5.95 3.15-8.93.2-.55.4-1.13.38-1.73-.04-.58-.48-1-.91-1.32zm2.81 3.92-1.6 4.72h3.3c-.58-1.57-1.14-3.15-1.7-4.72zm6.23-3.91c1.95-.02 3.9 0 5.85-.01l3.55 5.64 2-2.85c.23-.32.4-.69.5-1.07.1-.35.13-.75-.07-1.07-.16-.3-.45-.47-.7-.64 1.84-.02 3.69 0 5.54-.01L73.65 88c-.04.05-.07.12-.06.18v2.7c0 .73-.02 1.46.07 2.18.1.6.26 1.22.7 1.67.1.15.3.24.36.42h-6.67c.03-.1.14-.15.23-.22.38-.25.6-.67.72-1.1.15-.6.1-1.22.11-1.82v-3.94c-1.4-2.1-2.82-4.19-4.23-6.28a12.8 12.8 0 0 0-1.1-1.47c-.26-.28-.6-.49-.9-.72z" />
            </g>
        )

        function builtinIcon() {
            if (iconMode === 2) {
                return MomoIcon
            } else if (iconMode === 3) {
                return ZaloPay
            } else if (iconMode === 4) {
                return VNPay
            }
        }

        if (icon && iconMode) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100 / iconSize * 1} fill="#FFF" transform={`translate(${String(iconXY)}, ${String(iconXY)}) scale(${String(iconSize / 100)}, ${String(iconSize / 100)})`} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={`translate(${String(iconXY)}, ${String(iconXY)})  scale(${String(iconSize / 100)}, ${String(iconSize / 100)})`} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs} overflow="visible" />
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <g transform={`translate(${String(iconXY)}, ${String(iconXY)})  scale(${String(iconSize / 100)}, ${String(iconSize / 100)})`} >
                            {builtinIcon()}
                        </g>
                    </g>
                </g>
            );
        }
    }

    return pointList;
}

function drawIcon({qrcode, icon, params}) {
    const iconMode = getExactValue(icon.enabled, 0);
    if (iconMode === 1) {

        // Custom
        // default
        return defaultDrawIcon({qrcode, icon, params});

    } else {

        return builtinDrawIcon({qrcode, icon, params});
    }
}

function viewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount) + ' ' + String(-nCount / 2) + ' ' + String(nCount * 2) + ' ' + String(nCount * 2);
}

const Renderer25D = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
    getViewBox: viewBox,
    drawIcon: drawIcon
})

export default Renderer25D

Renderer25D.detail = (
    <div>Phong cách 2.5D. Có thể hơi khó nhận ra</div>
);
