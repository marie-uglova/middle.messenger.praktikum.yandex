declare module '*?raw' { const content: string; export default content;}
declare var process : {
    env: {
        PORT: number;
        NODE_ENV: string
    }
}
