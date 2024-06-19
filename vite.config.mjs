import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    server: {
        port: 3000,
        open: 'static/login.html',
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'static/login.html'),
                register: resolve(__dirname, 'static/register.html'),
                chat: resolve(__dirname, 'static/chat.html'),
                profile: resolve(__dirname, 'static/profile.html'),
                profile_edit: resolve(__dirname, 'static/profile-edit.html'),
                profile_change_password: resolve(__dirname, 'static/profile-change-password.html'),
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
                messages: ['Андрей', 'Ольга', 'Вадим', 'Андрей', 'Константин', 'Мария', 'Геннадий', 'Тамара', 'Илья', 'Иван', 'Виктор', 'Карина', 'Евгений']
            }
        })
    ],
})
