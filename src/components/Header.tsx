import blessLogo from '../assets/bless_logo.png'

export const Header = () => {
    return (
    <header className="header">
        <img className="header__logo" src={blessLogo} alt="An amazing logo of spiritual proportions" />
    </header>)
}