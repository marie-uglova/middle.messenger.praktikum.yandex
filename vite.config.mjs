import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        open: '/',
    },
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
});

/*import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    server: {
        port: 3000,
        open: 'src/index.html',
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'static/login.html'),
                register: resolve(__dirname, 'static/register.html'),
                chat-page: resolve(__dirname, 'static/chat-page.html'),
                profile-page: resolve(__dirname, 'static/profile-page.html'),
                profile_edit: resolve(__dirname, 'static/profile-page-edit.html'),
                profile_change_password: resolve(__dirname, 'static/profile-page-change-password.html'),
                404: resolve(__dirname, 'static/404.html'),
                500: resolve(__dirname, 'static/500.html'),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: 'src/partials',
            context: {
                name: '',
                label: '',
                id: '',
                type: '',
                placeholder: '',
                alert: '',
                messages: [
                    {
                        name: 'Андрей',
                        intro: 'Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!'
                    },
                    {
                        name: 'Ольга',
                        intro: '2Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!'
                    },
                    {
                        name: 'Вадим',
                        intro: '3Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!'
                    },
                    {
                        name: 'Константин',
                        intro: '4Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!'
                    },
                    {
                        name: 'Мария',
                        intro: '5Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!'
                    },
                ]
            }
        })
    ],
})*/
