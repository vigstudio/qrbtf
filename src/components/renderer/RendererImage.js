import React from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {defaultImage} from "../../constant/References";

function listPoints({qrcode, params, icon}) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let type = params[1];
    let size = params[2] / 100 / 3;
    let opacity = params[3] / 100;
    let otherColorDark = params[4];
    let otherColorLight = params[5];
    let posType = params[6];
    let posColor = params[7];
    let id = 0;

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0

    pointList.push(<image key={id++} x="0" y="0" width={nCount} height={nCount} xlinkHref={params[0]} />);

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {

            if (typeTable[x][y] === QRPointType.ALIGN_CENTER || typeTable[x][y] === QRPointType.ALIGN_OTHER || typeTable[x][y] === QRPointType.TIMING) {
                if (qrcode.isDark(x, y)) {
                    if (type === 0)
                        pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColorDark} x={x + (1 - size) / 2} y={y + (1 - size) / 2} />)
                    else if (type === 1)
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColorDark} cx={x + 0.5} cy={y + 0.5} />)
                } else {
                    if (type === 0)
                        pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColorLight} x={x + (1 - size) / 2} y={y + (1 - size) / 2} />)
                    else if (type === 1)
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColorLight} cx={x + 0.5} cy={y + 0.5} />)
                }
            }
            else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (qrcode.isDark(x, y)) {
                    if (posType === 0) {
                        pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y} />);
                    } else if (posType === 1) {
                        pointList.push(<circle key={id++} fill="white" cx={x + 0.5} cy={y + 0.5} r={5} />)
                        pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                        pointList.push(<circle key={id++} fill="none" strokeWidth="1" stroke={posColor} cx={x + 0.5} cy={y + 0.5} r={3} />)
                    } else if (posType === 2) {
                        pointList.push(<circle key={id++} fill="white" cx={x + 0.5} cy={y + 0.5} r={5} />)
                        pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                        pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke={posColor} cx={x + 0.5} cy={y + 0.5} r={3} />)
                        for (let w = 0; w < vw.length; w++) {
                            pointList.push(<circle key={id++} fill={posColor} cx={x + vw[w] + 0.5} cy={y + 0.5} r={0.5} />)
                        }
                        for (let h = 0; h < vh.length; h++) {
                            pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + vh[h] + 0.5} r={0.5} />)
                        }
                    }
                }

            }
            else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (qrcode.isDark(x, y)) {
                    if (posType === 0) {
                        pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y} />);
                    }
                } else {
                    if (posType === 0) {
                        pointList.push(<rect width={1} height={1} key={id++} fill="white" x={x} y={y} />);
                    }
                }

            }
            else {
                if (qrcode.isDark(x, y)) {
                    if (type === 0)
                        pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColorDark} x={x + (1 - size) / 2} y={y + (1 - size) / 2} />)
                    else if (type === 1)
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColorDark} cx={x + 0.5} cy={y + 0.5} />)
                } else {
                    if (type === 0)
                        pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColorLight} x={x + (1 - size) / 2} y={y + (1 - size) / 2} />)
                    else if (type === 1)
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColorLight} cx={x + 0.5} cy={y + 0.5} />)
                }

            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.UPLOAD_BUTTON,
            key: 'Hình nền',
            default: defaultImage,
        },
        {
            type: ParamTypes.SELECTOR,
            key: 'Hình dạng điểm dữ liệu',
            default: 1,
            choices: [
                "Hình chữ nhật",
                "Dạng hình tròn",
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Kích thước điểm dữ liệu',
            default: 100
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Độ mờ điểm dữ liệu',
            default: 100,
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Điểm dữ liệu tối',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Điểm dữ liệu sáng',
            default: '#FFFFFF'
        },
        {
            type: ParamTypes.SELECTOR,
            key: 'Hình dạng điểm neo',
            default: 0,
            choices: [
                "Hình chữ nhật",
                "Dạng hình tròn",
                "hành tinh",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Màu điểm định vị',
            default: '#000000'
        },
    ];
}

const RendererImage = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
})


export default RendererImage

RendererImage.detail = (
    <div>QR Code với ảnh nền tùy chỉnh</div>
);
