import logo from "../images/logo-black.png";
import instagram from "../images/instagram.png";
import twitter from "../images/twitter.png";
import youtube from "../images/youtube.png";
import linkedin from "../images/linkedin.png";


export function Footer() {
    return (<footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="logo-box">
                        <img className="logo-black" src={logo} alt="company logo" />
                        <div className="company-name">Pulse.com</div>
                    </div>
                    <div className="email">
                        <p className="email-text">Залиште свій емейл для запитань:</p>
                        <input className="email-input" type="email" name="email" placeholder="Ваша електронна пошта" required/>
                        <button className="btn" type="submit">Надіслати</button>
                    </div>
                </div>
                <div className="footer-section">
                    <div className="footer-links">
                        <div className="column">
                            <a href="http://localhost:3000/home">Головна сторінка</a>
                            <a href="http://localhost:3000/home/filters">Усі події</a>
                            <a href="http://localhost:3000/create">Створити подію</a>
                        </div>
                        <div className="column">
                            <a href="http://localhost:3000/login">Увійти</a>
                            <a href="http://localhost:3000/register">Зареєструватись</a>
                        </div>
                    </div>
                    <ul id="socials-icons">
                        <li><img className="social-icon" src={instagram} alt="instagram" /></li>
                        <li><img className="social-icon" src={linkedin} alt="linkedin" /></li>
                        <li><img className="social-icon" src={twitter} alt="twitter" /></li>
                        <li><img className="social-icon" src={youtube} alt="youtube" /></li>
                    </ul>
                </div>
            </div>
            <p className="footer-text">&copy; 2023 Сервіс організації подій Pulse.com. Усі права захищені.</p>
        </footer>
    )

}

export default Footer;
