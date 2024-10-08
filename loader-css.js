import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
    const nextResult = await next(specifier, context);

    if (!specifier.endsWith('.scss')) return nextResult;

    return {
        format: 'scss',
        shortCircuit: true,
        url: nextResult.url,
    };
}

export async function load(url, context, next) {
    if (context.format !== 'scss') return next(url, context);

    //const rawSource = '' + await fs.readFile(fileURLToPath(url));

    return {
        format: 'module',
        shortCircuit: true,
        source: '',
    };
}
