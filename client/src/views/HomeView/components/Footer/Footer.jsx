import s from './Footer.module.css'
import { FaLinkedin, FaGithubSquare, FaFacebookSquare, FaInstagram} from 'react-icons/fa';

export default function Footer(){
    return(
        <div className={s.container}>
            <div className={s.copy}>
                <h1> © Dingeo 2021</h1>
            </div>
        </div>
    )
}


