
export default function getEnv(name: string) {
    const env = process.env[name];
    
    if (!env) {
        throw new Error(`${name} não está definido.`);
    }

    return env;
}