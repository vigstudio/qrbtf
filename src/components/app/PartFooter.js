import React from "react";
import '../Qrcode.css';
import LinkTrace from "../link/LinkTrace";

const currentYear = new Date().getFullYear();

const PartFooter = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered Qr-footer note-font">
            <div className="Qr-footer-part">
                <strong>Link:</strong>&emsp;
                <LinkTrace
                    href="https://nghiane.com"
                    rel="noopener noreferrer"
                    target="_blank">Nghĩa Nè
                </LinkTrace>
            </div>

            <div className="Gray">
                Copyright © {currentYear}。<br />
            </div>
        </div>
    </div>
)

export default PartFooter
