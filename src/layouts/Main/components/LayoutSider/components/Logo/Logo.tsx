const Logo = (props: any) => {
    return (
        <div class={'logo'}>
            <img class={'logo-img'} src={!props.collapsed ? props.maxLogo : props.minLogo}/>
        </div>
    );
};
export default Logo;
