import React from 'react';
import './App.css';
// import GitHubButton from 'react-github-btn'
import ScrollContainer from "react-indiana-drag-scroll";
import LazyLoad from "react-lazy-load";
import mediumZoom from "medium-zoom";
// import LinkButton from "../link/LinkButton";
import ImageZoom from "../../containers/app/ImageZoom";
// import LinkTrace from "../link/LinkTrace";
// import {isPC} from "../../utils/navigatorUtils";
import {handleScroll} from "../../utils/gaHelper";

const pictures = [
    'https://i.ibb.co/8xbTrCN/momo-donate.jpg',
    'https://i.ibb.co/Fzbkvn6/vnpay-donate.jpg',
    'https://i.ibb.co/MMsHNJd/zalo-donate.jpg'
]

const PartMore = () => {

    return (
        <div className="Qr-titled-nobg">
            <div className="Qr-Centered title-margin">
                <div className="Qr-s-title">Giới thiệu về</div>
                <p className="Qr-s-subtitle">qr.nghiane.com</p>
                {/* <div className="Qr-s-subtitle Qr-rel">
                    {isPC() ? <div className="Qr-style-hint">Kéo ngang và trượt</div> : null}
                </div> */}
            </div>
            <div className="title-margin">
                <div className="Qr-article">
                    <div className="Qr-Centered">
                        {/* <p><GitHubButton href="https://github.com/vigstudio/qrbtf"
                            data-color-scheme="no-preference: light; light: light; dark: dark;"
                            data-icon="octicon-star" data-size="large" data-show-count="true"
                            aria-label="Star ciaochaos/qrbtf on GitHub">Star</GitHubButton></p> */}
                        {/* <h2>Các thiết kế Demo</h2> */}
                    </div>
                    <div className="Qr-Centered">
                        <p>
                            <h2>Trình tạo mã QR Code</h2>
                            Chúng tôi tạo ra ứng dụng này giúp cho các bạn dễ dàng hơn trong việc tạo các QR Code đẹp hơn và phong cách hơn. Mạng đậm tính cá nhân của các bạn hơn
                        </p>

                        <p>
                            <h2>Thông tin donate</h2>
                            <br />
                            Nếu bạn cảm thấy hài lòng về dịch vụ này. Bạn có thể Donate cho tôi để có động lực duy trì và phát triển dự án
                            <br />
                            <b>Bấm vào để phóng to ảnh </b>
                            <br />
                            <ScrollContainer
                                className="Qr-s Qr-s-gallery"
                                onStartScroll={(e) => handleScroll('gallery')}
                                hideScrollbars={false}
                                horizontal={true}
                                vertical={false}>
                                <div className="Qr-box">
                                    <Gallery contents={pictures} />
                                </div>
                            </ScrollContainer>

                        </p>

                        <p>
                            <h2>TPBank</h2>
                            <b>Số tài khoản: </b> 666 05 09 1991<br />
                            <b>Chủ tài khoản: </b> Phạm Viết Nghĩa
                        </p>
                        <p>
                            <h2>Momo</h2>
                            <b>Số tài khoản: </b> 0369 272718<br />
                            <b>Chủ tài khoản: </b> Phạm Viết Nghĩa
                        </p>
                        <p>
                            <h2>Zalo Pay</h2>
                            <b>Số tài khoản: </b> 0369 272718<br />
                            <b>Chủ tài khoản: </b> Phạm Viết Nghĩa
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="Qr-Centered btn-row">
                <div className="div-btn">
                    <LinkButton href={"https://www.yuque.com/qrbtf/docs/donate"} value={"打赏"} />
                    <LinkButton href={"https://github.com/ciaochaos/qrbtf"} value={"Github"} />
                </div>
                <div className="div-btn">
                    <LinkButton href={"https://qrbtf-com.mikecrm.com/J2wjEEq"} value={"反馈"} />
                    <LinkButton href={"https://mp.weixin.qq.com/s/GFEMCWQu3e2qhTuBabnHmQ"} value={"开发"} />
                </div>
            </div> */}
        </div>
    )
}

const Gallery = ({contents}) => {
    const zoom = mediumZoom();
    const zoomRef = React.useRef(zoom);

    return (
        contents.map((url, index) => (
            <LazyLoad key={'lazy_gallery_' + index} offsetVertical={200}>
                <ImageZoom key={'gallery_' + index} zoom={zoomRef.current} background={"rgba(0, 0, 0, 0.8)"} className="Qr-gallery-image" src={url} />
            </LazyLoad>
        )
        )
    );
}

export default PartMore;
