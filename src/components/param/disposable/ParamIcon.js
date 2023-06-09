import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamIconSrcViewer from "../../../containers/param/disposable/ParamIconSrcViewer";

const IconParams = ({icon, onBlur, onKeyPress}) => {
    const {enabled, scale} = icon;
    return (<>
        {getExactValue(enabled, 0) === 1 && (
            <FrameworkParam paramName={"Tải icon liên"}>
                <ParamIconSrcViewer key={icon.enabled} icon={icon} onChange={onBlur} />
            </FrameworkParam>
        )}
        {getExactValue(enabled, 0) !== 0 && (
            <FrameworkParam paramName={"Tỷ lệ icon"}>
                <input
                    key={icon.enabled}
                    type="number"
                    className="Qr-input small-input"
                    defaultValue={scale}
                    onBlur={(e) => onBlur({...icon, scale: e.target.value})}
                    onKeyPress={(e) => onKeyPress(e, {...icon, scale: e.target.value})}
                />
            </FrameworkParam>
        )}
    </>);
}

const ParamIcon = ({icon, onBlur, onKeyPress}) => (
    <React.Fragment>
        <FrameworkParam paramName={"Icon giữa"}>
            <select
                className="Qr-select"
                defaultValue={icon.enabled}
                onChange={(e) => onBlur({...icon, enabled: e.target.value})}>
                <option value={0}>Không có</option>
                <option value={1}>Tùy chỉnh</option>
                <option value={2}>Momo</option>
                <option value={3}>Zalo Pay</option>
                <option value={4}>VNPay</option>
            </select>
        </FrameworkParam>
        <IconParams icon={icon} onBlur={onBlur} onKeyPress={onKeyPress} />
    </React.Fragment>
)

ParamIcon.propTypes = {
    icon: PropTypes.object.isRequired,
    onChange: PropTypes.func
}

export default ParamIcon;
