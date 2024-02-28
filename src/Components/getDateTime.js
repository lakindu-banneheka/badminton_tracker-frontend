export function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

export function getTime() {
    const currTime = new Date().toLocaleTimeString();
    return currTime;
}