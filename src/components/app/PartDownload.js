import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/navigatorUtils";

// const CountComponent = ({value}) => {
//     if (isNaN(value)) return null;
//     if (value >= 10000) value = (value / 10000).toFixed(1) + " components";
//     return <sup className="Gray">{value}</sup>
// }

const WxMessage = () => {
    if (isWeiXin()) {
        return (
            <div className="note-font" id="wx-message-inner">
                Máy của bạn không hỗ trợ tải xuống SVG，<br />
                Vui lòng tải xuống JPG để lưu mã QR code của bạn.
            </div>
        )
    }
    return null;
}

const ImgBox = ({imgData}) => {
    if (imgData.length > 0) {
        return (
            <div id="dl-image">
                <div id="dl-image-inner">
                    <img id="dl-image-inner-jpg" src={imgData} alt="Nhấn và giữ để lưu mã QR" />
                </div>
            </div>
        )
    }
    return null
}

const PartDownload = ({value, downloadCount, onSvgDownload, onImgDownload}) => {
    const [imgData, setImgData] = useState('');

    return (
        <div className="Qr-titled">
            <div className="Qr-Centered title-margin">
                <div className="Qr-s-title">Downloads</div>
                <p className="Qr-s-subtitle">
                    <span>Tải xuống mã QR — {value}</span>
                    {/* <CountComponent value={downloadCount} /> */}
                </p>
            </div>
            <div className="Qr-Centered">
                <div className="btn-row">
                    <div className="div-btn img-dl-btn">
                        <button className="dl-btn" onClick={() => {onImgDownload("jpg").then(res => setImgData(res));}}>JPG</button>
                        <button className="dl-btn" onClick={() => {onImgDownload("png").then(res => setImgData(res));}}>PNG</button>
                        <button className="dl-btn" onClick={onSvgDownload}>SVG</button>
                    </div>
                </div>
                <div id="wx-message">
                    <WxMessage />
                </div>
                <div>
                    <ImgBox imgData={imgData} />
                </div>
            </div>
        </div>
    );
}

PartDownload.propTypes = {
    value: PropTypes.string.isRequired,
    downloadCount: PropTypes.number,
    onSvgDownload: PropTypes.func.isRequired,
    onImgDownload: PropTypes.func.isRequired,
}

export default PartDownload;
