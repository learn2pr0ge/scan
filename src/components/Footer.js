import React from 'react';

function Footer() {
    return (
        <>
            <footer>
                <div className="scan_logo_footer">
                    <img src="img/scan_logo_footer.png" alt="logo" width="100%" height="100%" alt="Company logo"/>
                </div>
                <div className="footer_text_cont">
                    г. Москва, Цветной б-р, 40<br/>
                    +7 495 771 21 11<br/>
                    info@skan.ru
                    <div className="footer_text_cont_copyright">
                        Copyright. 2022
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;