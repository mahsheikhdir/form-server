const shouldLog = false;

export const Logger = (log) => {
    if(shouldLog){
        console.log(log);
    }
}