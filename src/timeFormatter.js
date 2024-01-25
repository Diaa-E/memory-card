export default function formatTime(seconds, minutes)
{
    return `${minutes < 10? "0" + minutes : minutes}:${seconds < 10? "0" + seconds : seconds}`
}