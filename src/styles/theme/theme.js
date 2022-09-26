const theme = window.theme || {};

theme.changeTheme = function (type) {
    switch (type) {
        case 'black':
            document.documentElement.classList.add('black');
            break;
        case 'white':
            document.documentElement.classList.remove('black');
            break;
        default:
            document.documentElement.classList.remove('black');
            break;
    }
}

// 初始化判断皮肤
theme.detectSelectedTheme = function () {
    const type = localStorage.getItem('theme') || 'white';
    localStorage.setItem('theme', type);
    theme.changeTheme(type);
}

export default theme;
