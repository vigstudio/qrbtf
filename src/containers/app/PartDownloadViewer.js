import {connect} from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import {saveImg, saveSvg} from "../../utils/downloader";
import {getParamDetailedValue, outerHtml} from "../../utils/util";
import {handleDownloadImg, handleDownloadSvg} from "../../utils/gaHelper";


const mapStateToProps = (state, ownProps) => ({
    value: state.value,
    downloadCount: state.downloadData[state.value],
    onSvgDownload: () => {
        saveSvg(state.value, outerHtml(state.selectedIndex));
        handleDownloadSvg(state.value);
    },
    onImgDownload: (type) => {
        return new Promise(resolve => {
            saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500, type).then((res) => {
                handleDownloadImg(state.value, type);
                resolve(res)
            });
        });
    }
})

export default connect(mapStateToProps, null)(PartDownload)
